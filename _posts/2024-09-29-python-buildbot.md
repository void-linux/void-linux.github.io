---
title: Goodbye, Python 2! Hello, New Buildbot!
layout: post
---

At long last, Void is saying goodbye to Python 2. Python ended support for
Python 2 in 2020, but Void still had over 200 packages that depended on it.
Since then, Void contributors have
[updated, patched, or removed](https://github.com/void-linux/void-packages/issues/38229)
these packages. For the moment, Python 2 will remain in the repositories as
`python2` (along with `python2-setuptools` and `python2-pip`). `python` is
now a metapackage that will soon point to `python3`.

One of the biggest blockers for this project was some of Void's own infrastructure:
our buildbot, which builds all packages for delivery to users. For a long time,
we were stuck on buildbot 0.8.12 (released on 21 April **2015** and using Python 2),
because it was complex to get working, had many moving parts, and was fairly fragile.
To update it to a modern version would require significant time and effort.

Now, we move into the future: we've upgraded our buildbot to version 4.0, and
it is now being managed via our orchestration system, Nomad, to improve
reliability, observability, and reproducibility in deployment. Check out the 2023
*Infrastructure Week* [series of blog posts](/news/2023/07/infra-week-day-1.html)
for more info about how and why Void uses Nomad.

Visit the new buildbot dashboard at [build.voidlinux.org](https://build.voidlinux.org)
and watch your packages build!
