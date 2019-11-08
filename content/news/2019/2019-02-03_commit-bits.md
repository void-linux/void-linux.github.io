+++
title="The Life of a Pull Request & Where Commit Bits Come From"
date=2019-02-03
+++

Sometimes people will join into `#voidlinux` and ask why changes are
taking so long to get merged.  This is an interesting question, and it
boils down into a few parts.  In this article we'll take a look at the
life of a pull request and how it gets from idea to package.

For any package to exist, someone first has to want it.  This want is
often expressed as someone in IRC saying "I want to use Void, but I
need package `foo`" and someone looks at it and decides they will
package and maintain `foo`.  Sometimes this want will manifest as an
issue filled to the void-packages repository on GitHub, and sometimes
it manifests as a "blind" PR showing up for a new package.  This last
one is what we'll follow as it's where things get interesting.

## A Call to Action

When a PR is created, this triggers GitHub to notify people according
to its settings.  For some members of the project this will trigger an
email, for some people this will trigger other automation via API, and
up until very recently, the `#xbps` channel on freenode was NOTICE'd
(this last one is gone as GitHub has removed this functionality with
no clear replacement path).

This notification will hopefully grab the eye of at least one
reviewer, who will then open the link to view the PR on GitHub, or
will otherwise begin reviewing by their preferred means.  Many of our
reviewers prefer to pull the PR locally and view it in their editor of
choice, or build it locally on more powerful boxes than Travis CI
provides.

## Changes Requested

This is usually the slow part of getting something accepted to
void-packages.  This is the part that involves going back and forth on
what changes need to be made or what improvements are requested and
often involves discussion of potential changes to package policy.

For folks in IRC this often will be a rapid fire exchange of comments
in channel or query, and often ends with something like this:

```
15:30 <bobertlo> i'm making the suggested changes [...]
15:31 <maldridge> bobertlo: ping me when you're ready for review+merge
```

At this point the ball is back in the author's court, and the
committer is waiting for changes to be made.  At this point it's also
considered that a committer is tenuously "assigned" to a PR.

In a good flow, the next thing that happens is another message from
the author:

```
15:53 <bobertlo> maldridge: i pushed those changes
```

## The Reviewer Follows Up

When a reviewer is "assigned" to the PR, it doesn't really mean that
they own it, but there is some expectation that they will follow the
work through to merge unless they explicitly state otherwise.
Sometimes this looks like a comment on a PR, and other times it looks
like a poke in IRC to see if the author is still working on the
changes.

At the end of this phase, the reviewer will either approve or dismiss
the PR.  Usually dismissing a PR is only done if the package is
completely unworkable and the author and reviewer have come to an
agreement that it won't be accepted for some concrete reason, but
other reasons exist.

## Merged

When a package is accepted the reviewer will merge it, and then our
automated build infrastructure will kick into action.  A webhook from
GitHub will signal to our infrastructure that a new change is to be
built, and the systems will pull down the changes via git.  After it
has been ascertained what needs to be rebuilt, the change is
dispatched to our builders to begin compiling the new or updated
package.

After compilation, the built package is copied back to the build
master and is signed, then indexed into the repository for interested
users to download.  Past this point is a complicated web of rsync that
is beyond the scope of this article.

# Why does it take so long?

First of all, it doesn't.  When you compare Void's process to other
distributions, the process of getting a package included can be as
short as an hour from initial request to installable globally.

The slightly longer answer is that there are bottlenecks.  One of the
easiest to understand is that there are only so many servers we can
build on, and the time it takes to compile packages (especially large
ones) has to be taken into account.

The single largest bottleneck though is reviewer loading.  In the
process that's described above, reviewers are loosely connected to
PRs, and follow them through.  While our reviewers are very fast in
many cases, they are still human and can only hold so many things at
once.

So if the reviewers are the bottleneck, the question logically
follows: where do reviewers come from and how do they get their
special powers?

## Special Powers

Within the Void vernacular, people who can merge changes are referred
to generally as people with a commit bit.  For those who are curious,
this term comes from privileged users on a BSD system often having a
"wheel bit".  At the time of this writing, there are 13 people with a
commit bit.  These people can merge to almost any repository in the
organization, but there are a few exceptions.  Having a commit bit can
also come with other powers, like the ability to op up in IRC, but
such additional powers are not automatic, and are beyond the scope of
this article.

So how does one get these special powers?

The astute Void follower may already know this answer, as has been
documented for some time now on
[InfraDocs](https://infradocs.voidlinux.org).

The full documentation can be found in the [onboarding
documentation](https://infradocs.voidlinux.org/org/onboarding.html).
But to save the effort of going to that page, we'll briefly recap it
here.

First a person has to be noticed within the project as a good fit for
having the ability to merge changes on their own.  Usually this means
that they've been an active contributor continuously for some time and
have a history of submitting high quality work.

After an existing committer thinks they've found a good candidate,
they'll propose the membership change to the project owners in
private.  This allows the project owners time to discuss the proposal
with the proposer and exchange information without needing to talk
publicly.  Sometimes there are circumstances that a proposer might not
be aware of that may affect if they wish to continue suggesting
someone, and this initial conversation gives a time to discuss that.

After this discussion has happened a final decision is made to either
accept or reject the proposal.  In the event it has been accepted, the
candidate is informed and has the final choice to accept.

## I've Got a Bit, Now What?

Just getting the powers though isn't enough. People who hold a commit
bit have to justify that they have them.  This means means either
reviewing changes, commenting on PRs, or otherwise advancing the state
of the Void.  In the past when people have left the project either by
explicitly stating they've left, or by just not being a part of it for
a while, we revoke powers.  This helps us keep Void reasonably secure
by knowing exactly who all has the ability to push changes to our
repositories.

Of course if any of these people were to come back, they'd be welcome
to once again demonstrate their skill and again earn the special
powers as they did before.  Just having had the power at one point is
not sufficient cause to be handed it again.

---

In summary the life of a PR is part of a much larger process of
getting and maintaining a pool of contributors and qualified
reviewers.  This process is quite involved, and this post only just
scratches the surface.  Interested persons are always encouraged to
reach out to us in `#voidlinux` on freenode.  The author of this post
can always be contacted in `#voidlinux` as `maldridge`.
