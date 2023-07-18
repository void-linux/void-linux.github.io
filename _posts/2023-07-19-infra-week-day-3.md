---
title: "Infrastructure Week - Day 3: Are We Down?"
layout: post
---

# Are We Down?

So far we've looked at a relatively sizable fleet of machines
scattered across a number of different providers, technologies, and
management styles.  We've then looked at the myriad of services that
were running on top of the fleet and the tools used to deploy and
maintain those services.  At its heart, Void is a large distributed
system with many parts working in concert to provide the set of
features that end users and maintainers engage with.

Like any machine, Void's infrastructure has wear items, parts that
require replacement, and components that break unexpectedly.  When
this happens we need to identify the problem, determine the cause,
formulate a plan to return to service, and execute a set of workflows
to either permanently resolve the issue, or temporarily bypass a
problem to buy time while we work on a more permanent fix.

Lets go through the different systems and services that allow us to
work out what's gone wrong, or what's still going right.  We can
broadly divide these systems into two kinds of monitoring solutions.
In the first category we have logs.  Logs are easy to understand
conceptually because they exist all around us on every system.
Metrics are a bit more abstract, and usually measure specific
quantifiable qualities of a system or service.  Void makes use of both
Logs and Metrics to determine how the fleet is operating.

## Metrics

Metrics quantify some part of a system.  You can think of metrics as a
wall of gauges and charts that measure how a system works, similarly
to the dashboard of a car that provides information about the speed of
the vehicle, the rotational speed of the engine, and the coolant
temperature and fuel levels.  In Void's case, metrics refers to
quantities like available disk space, number of requests per minute to
a webserver, time spent processing a mirror sync and other similar
items.

We collect these metrics to a central point on a dedicated machine
using Prometheus, which is a widely adopted metrics monitoring system.
Prometheus "scrapes" all our various sources of metrics by downloading
data from them over HTTP, parsing it, and adding it to a time-series
database.  From this database we can then query for how a metric has
changed over time in addition to whatever its current value is.  This
is on the surface not that interesting, but it turns out to be
extremely useful since it allows checking how a value has changed over
time.  Humans turn out to be really good at pattern recognition, but
machines are still better and we can have Prometheus predict
trend lines, compute rates and compare them, and line up a bunch of
different metrics onto the same graph so we can compare what different
values were reading at the same time.

The metrics that Prometheus fetches come from programs that are
collectively referred to as exporters.  These exporters export the
status information of the system they integrate with.  Lets look at
the individual exporters that Void uses and some examples of the
metrics they provide.

### Node Exporter

Perhaps the most widely deployed exporter, the `node_exporter`
provides information about nodes.  In this case a node is a server
somewhere, and the exporter provides a lot of general information
about how the server is performing.  Since it is a generic exporter,
we get many many metrics out of it, not all of which apply to the Void
fleet.

Some of the metrics that are exported include the status of the disk,
memory, cpu and network, as well as more specialized information such
as the number of context switches and various kernel level values from
`/proc`.

### SSL Exporter

The SSL Exporter provides information about the various TLS
certificates in use across the fleet.  It does this by probing the
remote services to retrieve the certificate and then extract values
from it.  Having these values allows us to alert on certificates that
are expiring soon and have failed to renew, as well as to ensure that
the target sites are reachable at all.

### Compiler Cache Exporter

Void's build farm makes use of `ccache` to speed up rebuilds when a
build needs to be stopped and restarted.  This is rarely useful
because software has already had a test build by the time it makes it
to our systems.  However for large packages such as chromium, Firefox,
and boost where a failure can occur due to an out of space condition
or memory exhaustion.  Having the compiler cache statistics allows us
to determine if we're efficiently using the cache.

### Repository Exporter

The repository exporter is custom software that runs in two different
configurations for Void.  In the first configuration it checks our
internal sync workflows and repository status.  The metrics that are
reported include the last time a given repository was updated, how
long it took to copy from its origin builder to the shadow mirror, and
whether or not the repository is currently staging changes or if the
data is fully consistent.  This status information allows maintainers
to quickly and easily check whether a long running build has fully
flushed through the system and the repositories are in steady state.
It also provides a convenient way for us to catch problems with stuck
rsync jobs where the rsync service may have become hung mid-copy.

In the second deployment the repo exporter looks not at Void's repos,
but all of the mirrors.  The information gathered in this case is
whether the remote repo is still synchronizing with the current
repodata or not, and how far behind the origin the remote repo is.
The exporter can also work out how long a given mirror takes to sync
if the remote mirror has configured timer files in their sync
workflow, which can help us to alert a mirror sponsor to an issue at
their end.

## Logs

Logs in Void's infrastructure are conceptually not unlike the files on
disk in `/var/log` on a Void system.  We have two primary systems that
store and retrieve logs within our fleet.

### Build Logs

The build system produces copious amounts of log output that we need
to retain effectively forever to be able to look back on if a problem
occurs in a more recent version of a package and we want to know if
the problem has always been present.  Because of this, we use
buildbot's built in log storage to store a large volume of logs on
disk with locality to the build servers.  These build logs aren't
searchable, nor are they structured.  Its just the output of the build
workflow and xbps-src's status messages written to disk.

### Service Logs

Service logs are a bit more interesting, since these are logs that
come from the broad collection of tasks that run on Nomad and may be
themselves entirely ephemeral.  The sync processes are a good example
of this workflow where the process only exists as long as the copy
runs, and then the task goes away, but we still need a way to
determine if any faults occurred.  To achieve this result, we stream
the logs to Loki.

Loki is a complex distributed log processing system which we run in
all-in-one mode to reduce its operational overhead.  The practical
benefit of Loki is that it handles the full text searching and label
indexing of our structure log data.  Structured logs simply refers to
the idea that the logs are more than just raw text, but have some
organizational hierarchy such as tags, JSON data, or a similar kind of
metadata that enables fast and efficient cataloging of text data.

## Using this Data

Just collecting metrics and logs is one thing, actually using it to
draw meaningful conclusions about the fleet and what its doing is
another.  We want to be able to visualize the data, but we also don't
want to have to constantly be watching graphs to determine when
something is wrong.  We use different systems to access the data
depending on whether a human or a machine is going to watch it.

For human access, we make use of Grafana to display nice graphs and
dashboards.  You can actually view all our public dashboards at
<https://grafana.voidlinux.org> where you can see the mirror status,
the builder status, and various other at-a-glance views of our
systems.  We use grafana to quickly explore the data and query logs
when diagnosing a fault because its extremely optimized for this use
case.  We also are able to edit dashboards on the fly to produce new
views of data which can help explain or visualize a fault.

For machines, we need some other way to observe the data.  This kind
of workflow, where we want the machine to observe the data and raise
an alarm or alert if something is wrong is actually built in to
Prometheus.  We just load a collection of alerting rules which tell
Prometheus what to look for in the pile of data at its disposal.

These rules look for things like predictions that the amount of free
disk space will reach zero within 4 hours, the system load being too
high for too long, or a machine thrashing too many context switches.
Since these rules use the same query language that humans use to
interactively explore the data, it allows for one-off graphs to
quickly become alerts if we decide an issue that is intermittent is
something we should keep an eye on long term.  These alerts then raise
conditions that a human needs to validate and potentially respond to,
but that isn't something Prometheus does.

Fortunately for managing alerts, we can simply deploy the Prometheus
Alertmanager, and this is what we do.  This dedicated software takes
care of receiving, deduplicating and grouping, and then forwarding
alerts to other systems to actually do the summoning of a human to do
something about the alert.  In larger organizations, an alertmanager
configuration would also route different alerts to different teams of
people.  Since Void is a relatively small organization, we just need
the general pool of people who can do something to be made aware.
There are lots of ways to do this, but the easiest is to just send the
alerts to IRC.

This involves an IRC bot, and fortunately Google already had one
publicly available we could run.  The alertrelay bot connects to IRC
on one end and alertmanager on the other and passes alerts to an IRC
channel where all the maintainers are.  We can't acknowledge the
alerts from IRC, but most of the time we're just generally keeping an
eye on things and making sure no part of the fleet crashes in a way
that automatic recovery doesn't work.


## Monitoring for Void - Altogether

Between metrics and logs we can paint a complete picture of what's
going on anywhere in the fleet and the status of key systems.  Whether
its a performance question or an outage in progress, the tools at our
disposal allow us to introspect systems without having to log in
directly to any particular system.

---

This has been day three of Void's infrastructure week.  Check back
tomorrow to learn about what we do when things go wrong, and how we
recover from failure scenarios.  This post was authored by `maldridge`
who runs most of the day to day operations of the Void fleet.  Feel
free to ask questions on [GitHub
Discussions](https://github.com/void-linux/void-packages/discussions/45123)
or in [IRC](https://web.libera.chat/?nick=Guest?#voidlinux).
