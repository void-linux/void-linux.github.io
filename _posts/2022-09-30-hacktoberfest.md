---
title: Hacktoberfest 2022
layout: post
---

Are you ready for Hacktoberfest 2022?  Void Linux is!  We're excited
to be participating for our 6th year.  Contributions that help to
address our out-of-date packages queue are especially welcome.  This
is a great way to dip your feet into the world of Linux distro package
management and what happens behind the scenes to provide a wide
selection of packages and make sure your system remains up to date.

Updating packages is very easy.  You can select a package from the
list of [out of date
packages](http://repo-default.voidlinux.org/void-updates/void-updates.txt)
and update it using the tools in the [void-packages
repo](https://github.com/void-linux/void-packages).  The
[manual](https://github.com/void-linux/void-packages/blob/master/Manual.md)
might be of assistance when you are updating packages.

As a general rule, we recommend that newcomers to the Void Linux
project steer clear of "structural" packages unless you have specific
domain knowledge that qualifies you to work on high-risk packages.
When selecting a package to update, prefer packages registered to
`orphan@voidlinux.org`.  These packages are otherwise unmaintained,
and your contribution will have a bigger impact.  You can update
packages that have a maintainer assigned, but understand that
conflicting changes between a maintainer and contributor will be
resolved at the discretion of Void staff.

Here are some useful tips when updating packages:

  * While we're not completely opposed to PRs that add new packages,
    you're much more likely to get your PR approved and merged if it's
    a well written update.
  * Don't PR broken code. Our maintainers are much less likely to give
    a second look to a PR that didn't build when it was submitted.
  * While it's possible to run xbps-src from an alien distro, this
    isn't really supported.  If you're a seasoned Linux user and want
    to try Void, now is the time!
  * The update list is sometimes wrong. We'd love to get patches that
    improve its reliability by [ignoring beta
    versions](https://github.com/void-linux/void-packages/blob/master/Manual.md#checking-for-new-upstream-releases)
    or adding checks to packages that are not correctly detected as
    out of date.
  * If you have expertise in C, GNU Autotools, or other build systems,
    taking a look at projects that we've marked as incompatible
    with cross compilation and fixing the upstream issue can be
    an amazing contribution that impacts more than just Void.

Want to contribute but don't know how to code?  No sweat!  We have a
documentation project that's managed in git and can help you learn how
to use the tools of the trade without needing to simultaneously learn
how to manage our package build system.  Docs contributions should be
in the style of the manual, so make sure you [understand the
manual](https://docs.voidlinux.org/about/about-this-handbook.html) and
feel free to open an issue or ask on IRC before starting on a larger
contribution to make sure your change can be accepted.

We look forward to working with the amazing world of open source
developers this month to improve Void and continue our high standards
for quality and reliability.  To ensure your PR has the best chance at
being accepted, feel free to reach out for help as explained in the
manual.  Together, we can make this a high-impact Hacktoberfest.
