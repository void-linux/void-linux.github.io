---
title: Changes to Repository Sync
layout: post
---

Void is a complex system, and over time we make changes to reduce this
complexity, or shift it to easier to manage components.  Recently
through the fantastic work of one of our maintainers `classabbyamp`
our repository sync system has been dramatically improved.

Previously our system was based on a series of host managed rsyncs
running on either snooze or cron based timers.  These syncs would push
files to a central location to be signed and then distributed.  This
central location is sometimes referred to as the "shadow repo" since
its not directly available to end users to synchronize from, and we
don't usually allow anyone outside Void to have access to it.

As you might have noticed from the [Fastly
Overview](/news/2023/02/1-new-repo-fastly.html) the packages take a
long path from builders to repos.  What is not obvious from the graph
shown is that the shadow repo previously lived on the musl builder,
meaning that packages would get built there, copied to the glibc
builder, then copied back to the musl builder and finally copied to a
mirror.  So many copies!  To streamline this process, the shadow
mirror is now just the glibc server, since that's where the packages
have to wind up for architectural reasons anyway.  This means we were
able to cut out 2 rsyncs and reclaim a large amount of space on the
musl builder, making the entire process less fragile and more
streamlined.

But just removing rsyncs isn't all that was done.  To improve the time
it takes for packages to make it to users, we've also switched the
builders from using a time based sync to using lsyncd to take more
active management of the synchronization process.  In addition to
moving to a more sustainable sync process, the entire process was
moved up into our Nomad managed environment.  Nomad allows us to more
easily update services, monitor them for long term trends, and to make
it clearer where services are deployed.

In addition to fork-lifting the sync processes, we also forklifted
void-updates, xlocate, xq-api (package search), and the generation of
the docs-site into Nomad.  These changes represent some of the very
last services that were not part of our modernized container
orchestrated infrastructure.

Visually, this is what the difference looks like.  Here's before:

![Prior sync architecture](/assets/img/sync_before.png)

And here's what the sync looks like now, note that there aren't any
cycles for syncs now:

![Current sync architecture](/assets/img/sync_after.png)

*If you run a downstream mirror we need your help!*  If your mirror
has existed for long enough, its possible that you were still
synchronizing from alpha.de.repo.voidlinux.org, which has been a dead
servername for several years now.  Since moving around sync traffic is
key to our ability to keep the lights on, we've provisioned a new
dedicated DNS record for mirrors to talk to.  The new
`repo-sync.voidlinux.org` is the preferred origin point for all sync
traffic and using it means that we can transparently move the sync
origin during maintenance rather than causing an rsync hang on your
sync job.  Please check where you're mirroring from and update
accordingly.
