---
title: Infrastructure Week - Day 2: What Do We Do With Our Infrastructure?
layout: post
---

## What Does Void Do With the Infrastructure?

Yesterday we looked at what kinds of infrastructure Void has, how its
managed, and what makes each kind unique and differently suited.
Today we'll look at what runs on the infrastructure, and what it does.
We'll then finally look at how we make sure it keeps running in the
event of an error or disruption.

## Two Kinds of Services

Void runs, broadly speaking, two different categories of services.  In
the first category, we have the tooling that supports maintainers and
makes it easier or in some cases possible to work on Void.  These are
services that most users are unaware of, and in general don't interact
with.  In the second category of services are systems that general end
users of Void interact with and are more likely to know about or
recognize.

## Public Services

We'll first talk about public services that are broadly available to
both maintainers and general consumers of Void Linux.  These are
almost, but not entirely, web based services that are accessed via a
browser.  See how many of these services you recognize.

### Void's Website

Void's website (the one you are reading right now) is a GitHub pages
Jekyll site.  This content is checked into `git` rendered by a worker
process in the GitHub network, and then published to a CDN where you
can read it.  Additionally the Jekyll software produces feeds suitable
for consumption in an RSS reader.  The website is probably our
simplest service and the easiest to copy on your own since it requires
no special infrastructure, just a GitHub account to setup.

### Void Mirrors

Void's mirrors are simple nginx webservers that host static copies of
all our software.  This also includes some other sites that include
content that we host ourselves, such as the [docs
site](https://docs.voidlinux.org) and the dedicated [infrastructure
docs site](https://infradocs.voidlinux.org).  We host these from our
own system since they both use mdbook, which is not as straightforward
to use with a hosting service like GitHub Pages.  We also run these
sites this way so that they are broadly copied in the event of a
failure in any of our systems.  Did you know you can go to `/docs` on
any mirror to read the Void handbook?

### Popcorn

Popcorn is a package statistics service that provides information
about the popularity of packages as provided by systems that have
opted in to have their package information reported.  Though we are
evaluating ways to replace the data provide by Popcorn, it still
provides good real-world data on package installs.  You can learn more
about Popcorn [in the
handbook](https://docs.voidlinux.org/contributing/index.html#usage-statistics).

### Source Site

The Sources Site (<https://sources.voidlinux.org>) provides a copy of
all the sources as our build servers consumed them.  This provides a
way for us to quickly and easily make sure that we have the same
source to troubleshoot a bad build with when finding the fault may
require more than just the build error logs.

### xq-api

Some functionality on our website requires the ability to query the
Void repository data.  This is accomplished by fronting the repository
data by a service called `xq-api` which provides query functionality
on top of the repodata files.  The data is refreshed frequently, so
new packages quickly show up in the website search results as well as
making sure that packages that are no longer available in our repos
are removed promptly.

### Old Wiki Snapshot

At one time prior to the introduction of our docs site, Void
maintained a MediaWiki instance.  While MediaWiki is extremely
powerful software and is a great choice for hosting a wiki, Void found
that our wiki was being slowly filled with hyper-specific guides, lots
of abandoned pages, and lower quality versions of pages that exist on
the [Arch Linux Wiki](https://wiki.archlinux.org/).  While we ported
over a large number of pages to the docs that remained generally
applicable, we also felt it was important to archive the entire wiki
as it appeared before releasing the resources powering it.  This was
accomplished using a wiki crawler which could convert the wiki itself
into an archive format that we now serve with kiwix server.  You can
find that old content at <https://wiki.voidlinux.org> should it
interest you.

### Online Man Pages

Void makes available a copy of all the contents of our man page
database online so users can easily search for commands even when not
on a Void enabled system, such as during install time when internet
access may not be available yet from a Void device.  This service
involves a task which routinely extracts the man pages from all
packages using a program that is specific to XBPS, and then the files
are arranged on disk to be served by the `mdocml` man page server,
which is a program we obtain from OpenBSD.  You can browse our online
manuals at <https://man.voidlinux.org>.

## Services that help Maintainers

Not all services are meant for public consumption.  A number of Void's
services are meant to help maintainers be more productive, produce
build artifacts, or generally make our workflows easier to accomplish.

### Build Pipeline

The build pipeline was discussed in detail in [another
post](/news/2023/02/1-new-repo-fastly.html), but we'll recap that post
here.  In general there are a handful of powerful servers that we run
automated compiler tasks on that run `xbps-src` whenever the contents
of `void-packages` is updated.  Once the packages are built, they are
collected to a central point, signed cryptographically to attest that
they are in fact packages produced by Void, and then they are copied
out to mirrors around the world for users to download.

The build pipeline is the single largest collection of moving parts
within our infrastructure, and is usually the component that breaks
the most often as it has many exciting failure modes.  Some of the
author's favorites include running out of disk, stuck connection poll
loops, and rsync just wandering off instead of synchronizing packages.

### Email

Void maintainers have access to email on the voidlinux.org domain.  To
provide this service, Void runs an email server.  We make use of
[maddy](https://maddy.email) which provides a convenient all in one
mail server.  It works well at our scale, and doesn't require a
significant amount of maintainer time to make work.  Though most of us
access the mail using a combination of desktop and CLI clients, we
also run a copy of the [Alps](https://git.sr.ht/~migadu/alps) web
frontend which allows quick and easy access to mail when away from
normal console services.

### DevSpace

Sometimes when preparing a fix or updating a package, a maintainer
will want to share this new built artifact with others to gather
feedback or see if the fix works.  To enable this quickly and easily,
we have a dedicated webserver and SFTP share box for these files.  You
can see things we're currently working on or haven't yet cleaned up at
<https://devspace.voidlinux.org/> where the files are organized by
maintainer.

Sometimes end users will be asked to fetch a build from devspace when
filing an issue ticket to verify that a particular fix works, or that
a given problem continues to exist when rebuilding a package or disk
image from clean sources.

### void-robot and void-fleet

Void's team communicates primarily via IRC.  In order to allow our
infrastructure to communicate with us, we have a pair of IRC bots that
inform us of status changes.  The more chatty of the bots,
`void-robot` tells us when PRs change status or when references change
on Void's many git repos.  This allows us to know when changes are
going out, and its not uncommon for a maintainer to just ping someone
else with a single `^` to gesture at a push or reference the bot has
printed to the channel.

The second bot speaks on behalf of our monitoring infrastructure and
notifies us when things break or when they're resolved.  We'll take a
deeper look at monitoring in a future post and look more at what this
bot does then.

### Nomad, Consul & Vault

Many of Void's more modern services run on top of containers managed
by Hashicorp Nomad.  These services retrieve secrets from Hashicorp
Vault, and can locate each other using Hashicorp Consul.  The use of
these tools allows us to largely abstract out what provider any given
software is running on and where it resides in the world.  This also
makes it much easier when we need to replace a host or take one down
for maintenance without interrupting access to user facing services.

The use of well understood tools like the Hashistack also makes it
much easier for us to subdivide systems and check components locally.

### NetAuth

With all these services, it would be inconvenient for maintainers to
need to maintain separate usernames and passwords for everything.  In
order to avoid this, we use Single Sign On concepts where all services
that support it reach out to a centralized secure authentication
service.  You can read more about NetAuth at <https://netauth.org>.


## How Does All This Get Run?

For some of Void's older services, notably the build farm itself, our
services are configured, provisioned, and maintained using Ansible
just like the underlying OS configuration.  This works well, but has
some drawbacks in being difficult to test, difficult to change in an
idempotent way, and difficult to explain to others since its firmly
the realm of infrastructure engineering.  Trying to explain to someone
how a hundred lines of yaml gets converted into a working webserver
requires detours through a number of other assorted technologies.

Void's newer services run uniformly as containers and are managed by
Nomad.  This enables us to dynamically move workloads around, have
machines self-heal and update in coordination with the fleet, and to
provide a lens into our infrastructure for people to see.  You can
explore all our running containers in a limited read-only context by
looking at the [nomad dashboard](https://nomad.voidlinux.org).  Before
you go trying to open a security notice though, we're aware that
buttons that shouldn't be visible look like they're clickable.  Rest
assured that the anonymous policy that provides the view access can't
actually stop jobs or drain nodes (we've reported this UI bug a few
times already).

What Nomad does under the hood is actually really clever.  It assesses
what we want to run, and what resources we have available to run it.
It then applies any constraints we've set on the services themselves.
These constraints encode information like requiring locality to a
particular disk in the fleet, or requiring that two copies of a
service reside on different hosts.  This then gets converted into a
plan of what services will run where, and the workload of applications
is distributed to all machines in the fleet.  If a server fails to
check in periodically, the workload on it is considered "lost" and can
be restarted elsewhere if allowed.  When we need to move between
providers or update hardware, Nomad provides a way for us to quickly
and easily work out how much of a machine we're actually consuming as
well as actually performing the movement of the services from one
location to another.

While Nomad is very clever and makes a lot of things much easier, we
do still have a number of services that run directly on the Void
system installed to the machines.  For services that run on top of the
metal directly we almost always use runit to supervise the tasks and
restart them when they crash.  This works well, but does tightly
couple the service to the machine on which it is installed, and
requires coordination with Ansible to make sure that restarts happen
when they are supposed to during maintenance activities.  For services
that run in containers, we can simply set the restart policy on the
container and allow the runtime to supervise the services as well as
any cascading restarts that need to happen, such as when certificates
are renewed or rotated.

In general, all our services have at least one layer of service
supervision in the form of Void's runit-based init system, and in many
cases more application specific level supervision occurs, often with
status checks to validate and check assumptions made about the
readiness of a service.

---

This has been day two of Void's infrastructure week.  Check back
tomorrow to learn about how we know that the services we run are up,
and how we verify that once they're up, they're behaving as expected..
This post was authored by `maldridge` who runs most of the day to day
operations of the Void fleet.  Feel free to ask questions on [GitHub
Discussions](https://github.com/void-linux/void-packages/discussions/45099)
or in [IRC](https://web.libera.chat/?nick=Guest?#voidlinux).
