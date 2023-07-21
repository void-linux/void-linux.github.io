---
title: "Infrastructure Week - Day 4: Downtime Both Planned and Not"
layout: post
---

# Downtime Both Planned and Not

Yesterday we looked at what Void does to monitor the various services
and systems that provide all our services, and how we can be alerted
when issues occur.  When we're alerted, this means that whatever's
gone wrong needs to be handled by a human, but not always.  Sometimes
an alert can trip if we have systems down for planned maintenance
activities.  During these windows, we intentionally take down services
in order to repair, replace, or upgrade components so that we don't
have unexpected breakage later.

## Planned Downtime

When possible, we always prefer for services to go down during a
planned maintenance window.  This allows for services to come down
cleanly and for people involved to have planned for the time
investment to effect changes to the system.  We take planned downtime
when its not possible to make a change to a system with it up, or when
it would be unsafe to do so.  Examples of planned downtime include
kernel upgrades, major version changes of container runtimes, and
major package upgrades.

When we plan for an interruption, the relevant people will agree on a
date usually at least a week in the future and will talk about what
the impacts will be.  Based on these conversations the team will then
decide whether or not to post a blog post or notification to social
media that an interruption is coming.  Most of the changes we do don't
warrant this, but some changes will interrupt services in either an
unintuitive way or for an extended period of time.  Usually just
rebooting a mirror server doesn't warrant a notification, but
suspending the sync to one for a few days would.

## Unplanned Downtime

Unplanned downtime is usually much more exciting because it is by
definition unexpected.  These events happen when something breaks.  By
and large the most common way that things break for Void is running
out of space on disk.  This happens because while disk drives are
cheap, getting a drive that can survive years powered on with high
read/write load is still not a straightforward ask.  Especially not a
straightforward problem if you want high performance throughput with
low latency.  The build servers need large volumes of scratch space
while building certain packages due to the need to maintain large
caches or lots of object files prior to linking.  These large elastic
use cases mean that we can have hundreds of gigabytes of free space
and then over the course of a single build run out of space.

When this happens, we have to log on to a box and look at where we can
reclaim some space and possibly dispatch builds back through the
system one architecture at a time to ensure they use low enough space
requirements to complete.  We also have to make sure that when we
clean space, we're not cleaning files that will be immediately
redownloaded.  One of the easiest places to claim space back from,
after all, is the cache of downloaded files.  The primary point of
complication in this workflow can be getting a build to restart.
Sometimes we have builds that get submitted in specific orders and
when a crash occurs in the middle we may need to re-queue the builds
to ensure dependencies get built in the right order.

Sometimes downtime occurs due to network partitions.  Void runs in
many datacenters around the globe, and incidents ranging from street
repaving to literal ship anchors can disrupt the fiber optic cables
connecting our various network sites together.  When this happens, we
can often arrive upon a state where people can see both sides of the
split, but our machines can't see each other anymore.  Sometimes we're
able to fix this by manually reloading routes or cycling tunnels
between machines, but often times its easier for us to just drain
services from an affected location and wait out the issue using our
remaining capacity elsewhere.

## Lessening the Effects of Downtime

As was alluded to with network partitions, we take a lot of steps to
mitigate downtime and the effects of unplanned incidents.  A large
part of this effort goes into making as much content as possible
static so that it can be served from minimal infrastructure, usually
nothing more than an nginx instance.  This is how the docs,
infrastructure docs, main website, and a number of services like
xlocate work.  There's a batch task that runs to refresh the
information, it gets copied to multiple servers, and then as long as
at least one of those servers remains up the service remains up.

Mirrors of course are highly available by being byte-for-byte copies
of each other.  Since the mirrors are static files, they're easy to
make available redundantly.  We also configure all mirrors to be able
to serve under any name, so during an extended outage, the DNS entry
for a given name can be changed and the traffic serviced by another
mirror.  This allows us to present the illusion that the mirrors don't
go down when we perform longer maintenance at the cost of some
complexity in the DNS layer.  The mirrors don't just host static
content though.  We also serve the <https://man.voidlinux.org> site
from the mirrors which involves a CGI executable and a collection of
static man pages to be available.  The nginx frontends on each mirror
are configured to first seek out their local services, but if those
are unavailable they will reach across Void's private network to find an
instance of the service that is up.

This private network is a mesh of wireguard tunnels that span all our
different machines and different providers.  You can think of it like
a multi-cloud VPC which enables us to ignore a lot of the complexity
that would otherwise manifest when operating in a multi-cloud design
pattern.  The private network also allows us to use distributed service
instances while still fronting them through relatively few points.
This improves security because very few people and places need access
to the certificates for voidlinux.org, as opposed to the certificates
having to be present on every machine.

For services that are containerized, we have an additional set of
tricks available that can let us lessen the effects of a downed
server.  As long as the task in question doesn't require access to
specific disks or data that are not available elsewhere, Nomad can
reschedule the task to some other machine and update its entry in our
internal service catalog so that other services know where to find it.
This allows us to move things like our IRC bots and some parts of our
mirror control infrastructure around when hosts are unavailable,
rather than those services having to be unavailable for the duration
of a host level outage.  If we know that the downtime is coming in
advance, we can actually instruct Nomad to smoothly remove services
from the specific machine in question and relocate those services
somewhere else.  When the relocation is handled as a specific event
rather than as the result of a machine going away, the service
interruption is measured in seconds.

## Design Choices and Trade-offs

Of course there is no free lunch, and these choices come with
trade-offs.  Some of the design choices we've made have to do with the
difference in effort required to test a service locally and debug it
remotely.  Containers help a lot with this process since its possible
to run the exact same image with the exact same code in it as what is
running in the production instance.  This also lets us insulate Void's
infrastructure from any possible breakage caused by a bad update,
since each service is encapsulated and resistant to bad updates.  We
simply review each service's behavior as they are updated individually
and this results in a clean migration path from one version to another
without any question of if it will work or not.  If we do discover a
problem, the infrastructure is checked into git and the old versions
of the containers are retained, so we can easily roll back.

We leverage the containers to make the workflows easier to debug in
the general case, but of course the complexity doesn't go away.  Its
important to understand that container orchestrators don't remove
complexity, quite to the contrary they increase it.  What they do is
shift and concentrate the complexity from one group of people
(application developers) to another (infrastructure teams).  This
shift allows for fewer people to need to have to care about the
specifics of running applications or deploying servers, since they
truly can say "well it works on my machine" and be reasonably
confident that the same container will work when deployed on the
fleet.

The last major trade-off that we make when deciding where to run
something is thinking about how hard it will be to move later if we
decide we're unhappy with the provider.  Void is actually currently in
the process of migrating our email server from one host to another at
the time of writing due to IP reputation issues at our previous
hosting provider.  In order to make it easier to perform the
migration, we deployed the mail server originally as a container via
Nomad, which means that standing up the new mail server is as easy as
moving the DNS entries and telling Nomad that the old mail server
should be drained of workload.

Our infrastructure only works as well as the software running on it,
but we do spend a lot of time making sure that the experience of
developing and deploying that software is as easy as possible.

---

This has been day four of Void's infrastructure week.  Tomorrow we'll
wrap up the series with a look at how we make distributed
infrastructure work for our distributed team.  This post was authored
by `maldridge` who runs most of the day to day operations of the Void
fleet.  Feel free to ask questions on [GitHub
Discussions](https://github.com/void-linux/void-packages/discussions/45140)
or in [IRC](https://web.libera.chat/?nick=Guest?#voidlinux).
