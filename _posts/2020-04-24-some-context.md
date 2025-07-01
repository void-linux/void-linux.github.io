---
title: Some Context for Recent Events
layout: post
---

### Notice

This article is being actively edited and amended for both grammar and
to answer new questions as they come up.

  * 12:05 PST - Feedback from IRC for English, clarification of the
    timeline of xtraeme's resignation and subsequent ban.

  * 12:17 PST - Correct innaccuracies in the musl section.  My
    understanding of the bug was incorrect (@the-maldridge).
    
  * 2020-04-27 - Correct xtraeme's pronouns, spelling/grammar cleanup

---

First a disclaimer.  This is written from my point of view
(@the-maldridge), and while it may contain views and opinions of the
project, you should assume these are my views.  This is posted here
and in the official name-space of Void Linux as questions have asked
that demand answers.  I hope that in this post I can provide some
answers.

To answer the immediate question of the day, Juan RP (xtraeme) has
chosen to leave the Void Linux project.

There will be no noticeable disruption to users, and the project will
continue as before.  We appreciate your support of Void and continuing
to advance the state of the void.  To any maintainer or contributor
that was on the receiving end of one of xtraeme's recent posts, I
would like to extend the my apologies for this and those of the
project.  Void is a project we intend all to be involved in, and that
means treating others with respect.

I'd now like to answer a few questions that came to my mind as this
situation developed.  I'm on the West coast of the US, so I woke up to
a lot of this already in progress, but I also have a lot more
historical context than what is easily find-able.  Keep in mind that
out of respect for Juan's privacy, I am deliberately not revealing
some information they chose to reveal to project maintainers.  They
may have left a sour taste with me, but they still have a right to
privacy like anyone else, and if they wish to share details of their
personal life, that is their decision and theirs alone.

## How will the project survive without xtraeme?

Short: Like we have before.

Long: This is not the first time xtraeme has left Void.  I wrote about
this on my personal site back in 2018, and you can read that full
[article](https://michaelwashere.net/post/2018-11-28-enobdfl/) over
there.  Running a project like Void means ensuring that there is no
single point of failure.  We have a healthy pool of developers, and
short of perhaps some folks wanting to take some time off to recover
from the events of the day, I fully expect the project will continue
as it has.

## The thread on GitHub mentioned xtraeme has broken things in the past?

Being rolling release and not breaking things involves a lot of
coordination.  Some of this coordination is baked into the software.
For example, you can't update your system while large rebuilds are in
progress because that would install incompatible versions of some
libraries (we're working on improving the user experience around this
though).

Some of the recent changes that come to mind in no particular order:

  * Pushing a musl update with no coordination.  For context around
    the change, see [this link](http://musl.libc.org/time64.html).

    This is something we're planning a lot of work around because
    updating the C library will involve recompiling almost everything
    on musl against it.  Normally there's ABI compatibility, but for
    reasons far beyond the scope of this article, musl is different.
    There is an ongoing dialog in #musl on freenode with some Alpine
    devs as well trying to determine the best way to do this upgrade.

    Updated: The original version referenced 1.2 of musl.  This was
    incorrect as the interactions that caused this problem are not
    unique to this version.

  * Pushing a glibc update with no coordination.  We saw the trouble
    that befell Arch when they did a glibc update that temporarily
    broke bash.  We'd hoped to avoid this same fate, but while
    discussing the change, the package was merged without discussion.

  * General problems related to single points of failure.  Though
    this is not an issue now, there was a time where xtraeme was the
    single point of failure.  Through their personal inaction we lost
    the voidlinux.eu domain.  We had a lot of trouble getting the
    project back into a stable state, but through a significant amount
    of effort, we recovered.  Though newer maintainers probably don't
    notice this, there are a lot of older developers and users who
    remember when xtraeme was all that Void was.  The project has
    grown significantly since then, and this is a change I'm not sure
    xtraeme ever fully adjusted to.

## I feel like you're not telling a lot of stuff, where can I get that context?

For better or for worse, a lot of discussions happen behind closed
doors.  We don't feel it is our place as Void Linux to air the dirty
laundry of maintainers and contributors.  What goes on in your
personal life outside of Void is not our concern, and we have no right
to tell others your secrets.  That being said, all factors are
considered when evaluating granting or removing a commit bit.  Note
that according to [InfraDocs](https://infradocs.voidlinux.org) almost
all of the initial discussion of onboarding and offboarding
maintainers happens on private forums.  These discussions are pretty
mundane, usually along the lines of "have they broken anything?" or
"wow, this person does a lot of work really fast".  The discussions
around xtraeme unfortunately have been of the form "their conduct
towards others really isn't great, but I'm not comfortable approaching
them."

## Does Void profit from xtraeme's work?

While Void and its users *benefit* from the work of all developers,
including xtraeme, no profit is derived from this work.

Void is an Open Source project, it always has been and will continue
to be one.  You are free to use the code within the confines of the
license.  Since Void is permissively licensed, you are welcome to use
it commercially as well, though please be a good citizen of the FOSS
community and upstream your patches when practical.

Should xtraeme wish to change the license of their copy of XBPS, we
will evaluate the situation.

Void does not accept donations.  We appreciate the efforts of those
that reach out from time to time wishing to support the project
financially, but our expenses are minimal.  If you want to contribute,
you can help by updating packages, reviewing issues, or generally
being a part of the community.  If an individual maintainer chooses to
solicit or accept a donation for their work, this is done separately
from the project.  International tax law is a complicated beast, and
as a project we're not comfortable accepting donations until we have
the infrastructure in place to show where the money goes, and provide
you with appropriate documentation.

## Did xtraeme resign, or were they banned?

Timing is everything.  The ticket which expressed xtraeme's desire to
resign was opened first, then over the next hour they lashed out at
several project members.  The resignation was processed per their
wishes, and per their conduct torwards others, a ban was applied at
the organization level.

## I want to talk to someone about this.

Sure, we live in interesting times, and talking to others is a great
way to cope with unexpected change.  Feel free to chat on Void's
official IRC channel `#voidlinux` on freenode.  You can also find us
at `r/voidlinux` on Reddit.  We also maintain a mailing list which you
can find on the website.

# What happens now?

Remember these are my words (@the-maldridge) not necessarily those of
the project.

This is a really uncomfortable place to be in.  None of us want to
start a Twitter war, and at the end of the day, Void is about working
on software we all believe in.

Void will continue.  We do appreciate the work that xtraeme did to get
us here, projects like Void need someone to have an idea and run with
it, then convince others to join you.  xtraeme was that early person
with an idea, there's no denying this.  It's sad that this
collaboration had to end this way.  I would be lying if I said this
was a surprise to me, but I truly did not in my wildest imagination
expect it to play out like this.

### Enough of Politics, Diplomacy, and speaking as a project, what do YOU think about all this?

The last 8 months since xtraeme showed up again have been a roller
coaster.  It's been a stressful time and I've come very close to
leaving the project several times.  I'm one of a handful of people who
directly maintain the day to day infrastructure that builds and serves
Void, and that made me the receiving end of more than one rant.  I'm
going to take a step back and think about if I want to continue this
project or work on one of my own more.  When I started working on Void
I was in college and employed by a university that was running Void
internally (sadly, they no longer do).  I had a lot more free time
then, and Void was a lot less stressful to work on.

xtraeme is a talented C developer; there is no denying this, and I
respect their work on XBPS.  It is certainly not without bugs, but
no one's code is.  I am personally upset that this is how this had to
end.  I expected at some point xtraeme would part ways with the
project, as their goals and those of the project have diverged.  I am
upset that they felt the need to take out their frustration on
contributors and maintainers, and that is why the decision was made to
ban them from the organization.
