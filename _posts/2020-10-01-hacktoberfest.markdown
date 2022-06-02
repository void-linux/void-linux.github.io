---
title: Hacktoberfest and Void Linux
layout: post
---

*Update:* Unfortunately due to recent changes that significantly
increase the effort required from Void, we can no longer promise that
your changes will count towards the 4 PRs required for Hacktoberfest.

Many maintainers use `git am` in a script to apply patches and batch
them into build units that the buildbot can work on at a time.  This
precludes the application of labels unless the maintainer separately
opens a browser, logs into GitHub, and interacts with the PR there.
While the `git am` method should technically work, we've noticed in
the past that GitHub occasionally applies the wrong status to PRs
using this method (ignores magic closing words).  We aren't currently
aware why this works intermittently and we can't guarantee that a
specific PR will satisfy the new requirements for Hacktoberfest.

It's unfortunate that the rules were changed mid-run, as under the
previous rules we could process contributions without disruptive
alterations to our review process, and we could accept many first time
contributors' work to low-risk packages.  You are of course still
welcome to send your patches and they will be reviewed at the
avaiability of the Void team.

---

It's the first day of October, the air is crisp in parts of the
northern hemisphere, and it's time for
[Hacktoberfest](https://hacktoberfest.digitalocean.com/) again.  This
year is shaping up to be bigger than previous years, and as Void has
participated since the start we'd like to provide some helpful tips
and tricks for sending your first Pull Requests (PRs) to Void.

This year Void is accepting patches for two main areas, patches from
unknown contributors beyond these areas have a high likelihood of
being dismissed, so please color within the lines.

The first area is for non-code contributions.  We maintain all of our
documentation using a tool called
[mdBook](https://github.com/rust-lang/mdBook).  This has the net
effect that all of our documentation is written as version controlled
markdown files.  If you regularly use Void and have been looking for a
place to get involved, this is a good point to jump in.  We aren't
trying to recreate the [ArchWiki](https://wiki.archlinux.org/) though,
so make sure you understand the scope and purpose of the docs repo
before sending your documentation.

For technical contributions, we are accepting updates of existing
packages.  While new packages may count as well, we have had many
problems in the past with people adding packages and then abandoning
them, so expect to meet significant resistance if you are a new
contributor trying to add a package to the repo.  Updating packages is
very easy.  You can select a package from the list of [out of date
packages](http://repo-default.voidlinux.org/void-updates/void-updates.txt)
and update it using the tools in the [void-packages
repo](https://github.com/void-linux/void-packages).  The
[manual](https://github.com/void-linux/void-packages/blob/master/Manual.md)
might be of assistance when you are updating packages.

As a general rule, we would prefer Hacktoberfest contributors that do
not have a previous track record with the Void Linux project steer
clear of "structural" packages unless you have specific domain
knowledge that qualifies you to work on high-risk packages.  When
selecting a package to update, select a package registered to
`orphan@voidlinux.org` when possible.  These packages are otherwise
unmaintained, and your contribution will have a bigger impact.  You
can update packages that are owned by existing developers, but
understand that conflicts between a maintainer and contributor will be
resolved at the discretion of Void staff.

Here are some useful tips when updating packages:

  * Don't PR broken code, our maintainers are much less likely to give
    a second look to a PR that didn't build when it was submitted.
  * While it's possible to run xbps-src from an alien distro, this
    isn't really supported.  If you're a seasonsed Linux user and want
    to try Void, now is the time!
  * The docs use [versioned
    markdown](https://github.com/bobertlo/vmd), available in the
    vmdfmt package.  You can run this locally to format your files.
  * The update list is sometimes wrong, we'd love to get patches that
    improve its reliability by ignoring beta versions or adding checks
    to packages that are not detected as out of date correctly.
  * If you have expertise in C, GNU Autotools, or other build systems,
    taking a look at projects that we've marked as not
    cross-compilation compatible and fixing the upstream issue can be
    an amazing contribution that impacts more than just Void.

We look forward to working with the amazing world of open source
developers this month to improve Void and continue our high standards
for quality and reliability.  To ensure your PR has the best chance at
being accepted, feel free to reach out for help as explained in the
manual.  Together this will be a high impact Hacktoberfest.
