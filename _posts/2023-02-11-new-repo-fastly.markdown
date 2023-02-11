---
title: "New Repo: Fastly CDN"
layout: post
---

In our last post we showed you how to quickly change your mirror using
[xmirror](https://man.voidlinux.org/xmirror.1).  In this post we'll
give you a reason to use it, and talk a little more about how mirrors
work and how packages get from our servers, to your computer.

Before we can mirror packages, we first need to build some.  Void uses
a worker-based build architecture where a central controller
dispatches build tasks to individual servers that own the builds for
specific architectures.  At the time of writing, Void makes use of
discrete builders for aarch64 targets, assorted musl targets, and
assorted glibc targets.  The breakdown is as follows:

  * a-fsn-de
    * x86_64
    * i686
    * armv6l
    * armv7l
  * b-fsn-de
    * aarch64
    * aarch64-musl
  * a-hel-fi
    * x86_64-musl
    * armv6l-musl
    * armv7l-musl

Each build server drives, via automation, a standard git checkout of
the [void-packages repo](https://github.com/void-linux/void-packages).
This in turn results in built binary packages ready for installation
in the path `/hostdir/binpkgs` on each of the build machines.  To
actually be useful, however, the packages need to be aggregated and
then signed, then copied out to servers near to end users such that
packages are quick to download and install whenever required.

Packages are aggregated via nomad managed rsync tasks to a-fsn-de.
Since a-fsn-de already hosts several architectures, its packages don't
need to be moved.  You might recognize the target directories from the
repo URL structure.  The packages originating on a-hel-fi are copied
to `/hostdir/binpkgs/musl` and the packages from b-fsn-de are copied
to `/hostdir/binpkgs/aarch64`.  Once the packages are all in one
place, they can be signed.  This is also handled by a nomad managed
batch task.

Once signed, a complete, ready to distribute package collection exists
on a-fsn-de, however this isn't where any mirror synchronizes from,
nor is it where end users obtain packages from.  The first real
"mirror" in the chain with the full contents, including live images,
docs, and other mirror contents is on a-hel-fi and is sometimes
referred to by the Void team as the "Shadow Repo".  When we make large
builds that we know in advance will cause issues for end users, we
disconnect all downstream repos from the shadow repo and this allows
us to run large builds without impacting user's ability to install or
update already extant packages.

Tier 1 (Void Operated) mirrors synchronize directly from the Shadow
Repo, again via nomad managed batch tasks.  All downstream mirrors
synchronize from one or more tier 1 mirrors, with one notable
exception which we'll come back to.  These mirrors are operated by
universities, companies, and individuals who desire to have a copy of
the Void repository closer to them.  This allows for faster installs,
faster updates, and in many cases more efficient bandwidth usage where
a mirror is able to be co-located with multiple Void users.

By and large, these mirrors synchronize using rsync on cron timers.
Some synchronize very frequently, as frequently as every 15 minutes.
Some synchronize more slowly, only once a day.  And some mirrors often
appear broken and don't appear to have synced at all.  How can we
possibly know this?  Well we drop a file into the root of the mirror
at the Shadow level with a timestamp.  By watching the value in this
file, we can tell how old the contents of any downstream repo are.
All this information is exposed in our [mirror
dashboard](https://grafana.s.voidlinux.org/d/cLraC-XMk/mirrors-status).
The "Origin" referenced in that dashboard is a slight misnomer, its
actually showing the time behind `now`.

Having multiple mirrors is great, but ensuring that a mirror nearby to
a user who wants to update, and make sure they've configured and are
using it is a bit harder.  What we really want is a proxy that will
always find the nearest mirror and fetch packages from that location
for a user.  Long-time users of Void may remember `auto.voidlinux.org`
which was an early attempt at this.  Due to limitations in XBPS
itself, and limitations in the way that we are able to introspect
mirrors, this service was eventually retracted.  What we actually want
is a network of servers everywhere well connected to networks that
users are on, and then with a good connection back to at least one of
the Void operated mirrors.  This, as you might have guessed, is a CDN.

As mentioned in the [Fast
Forward](/news/2023/01/fastly-fast-forward.html) post, Void has
generously been sponsored by Fastly, which has allowed us to provision
a new repository URL that leverage's Fastly's global network to
provide what should be the generally optimal mirror regardless of
where in the world any particular end user exists.  The Fastly mirror
does not sync, nor does it have a concept of file storage that we
manage as the project.  It is for all intents and purposes an
extremely large high-speed cache, and when you request a package from
Fastly, the package will either be returned from one of Fastly's
servers, or it will be streamed to you via the Fastly network while
being simultaneously fetched from one of Void's backend servers.  The
very first download of a package may be slower than if you downloaded
it from Void directly, but all subsequent fetches will be extremely
fast.  Since the package distribution follows a sort of curve of
popularity ranging from the common packages that make up desktop
environments, the base system, and popular software suites down to
less commonly installed packages and rarely updated libraries, the
cache will usually be hot for the most commonly installed packages!

So to recap, packages are built on servers, copied to a central
server, signed, copied to a shadow mirror, copied to a tier 1 mirror,
possibly copied to downstream mirrors, and then installed on end
systems.  Here's a graphic:

<img src="/assets/img/mirrors.svg" alt="diagram of the package flow" style="max-height: 80vh" />

We hope you've enjoyed this look into what it takes to get packages
from us to you, but more importantly, we're pleased to announce now
the general availability of <https://repo-fastly.voidlinux.org/> which
should be the generally fastest mirror for most users.  This mirror is
available now in `xmirror` under the *World* region.
