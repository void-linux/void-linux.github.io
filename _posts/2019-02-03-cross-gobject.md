---
layout: post
title: "Cross compilation support for gobject typelibs"
comments: true
---

Thanks to the work of [maxice8](https://maxice8.github.io/) we're pleased to
announce cross compiling support for gobject-introspection and packages that
depend on this tool. This is a big step forward to support more packages
through cross compiling and stay future proof for glib development.

maxice8 put together a comprehensive [post about his
work](https://maxice8.github.io/8-cross-the-gir/). This article will be
higher level overview of our work in this field.

### What are gobject and typelibs?

gobject is an abstract description of types defined in glib. Glib is used on a
wide range of application and libraries, most notably [gtk](https://gtk.org).
Glib itself is written in C but it's possible to provide dynamic language
bindings to other languages such as [python](https://python.org).

This mechanism is not builtin into glib, but instead is provided by the
gobject-introspection tool. This tool scans both the source and the binary blob
of a library and creates a metadata file that is used to provide type information
for other language bindings. For a deeper dive into gobject-introspection please
consider the [docs at readthedocs.io](https://gi.readthedocs.io/en/latest/)

### The problem

When it comes to Void, we have high demands on portability of applications. Our
armv6l, armv7l and aarch64 platforms a completely and exclusively cross
compiled, meaning they are built on an x86_64 host. This leads to an
interesting problem with gobject-introspection which by design needs to run on
the same platform as the produced binaries are targeted.

Unfortunately, as already stated this has been a design decision of this
software and we can't do anything to change this constraint itself.

Furthermore, during the last few years the Gnome community drifted towards
extensively using gobject-introspection in their products. This led to the
breakage of more and more applications in the gnome-ecosystem.

### The solution

During the last few months we considered different solutions to this problem.
This first proposal to not support gir through cross compilation and only allow
it through native build became more and more unsatisfying as the number of
packages using this mechanism increased over time.

The second approach which was the followup to the one described above was to
add native builders to the system and build those packages on those native
builders. The issue was here that this would require a lot of infrastructure
work and added a lot of complexity.

The third solution and the one we chose was to use the userspace emulation
features of [Qemu](http://qemu.org) to emulate the target system only for
those calls that needed to be on the target platform. The [yocto
project](https://yoctoproject.org/) is already using this approach to cross
compile Gnome Applications to other platform. We reused many of their tooling
for void-packages. Nontheless, we hit many porting issues - our tooling must run
on musl, too - , new bugs were triggered in void-packages - see for example
[these](https://maxice8.github.io/1-void-cpython3-cross-pt1/)
[two](https://maxice8.github.io/2-void-cpython3-cross-pt2/) posts at maxice8's
blog, and many other small issues needed to be resolved.

Basic support for cross compilation has already landed in void-packages, the
musl port is not yet finished, but we expect it to work soon(tm).

maxice8 also prepared a blog post about his porting work on
[libgusb](https://maxice8.github.io/9-libgusb-meson-gir-cross/).
