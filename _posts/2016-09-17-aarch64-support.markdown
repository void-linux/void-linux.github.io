---
layout: post
title: "aarch64 support has landed!"
comments: true
---

Thanks to a lot of effort of
[Christian Neukirchen](https://twitter.com/chneukirchen) and the help of
[Duncan Overbruck](https://twitter.com/duncaen) getting the builder up
and running the aarch64 target is now officially supported by Void,
so you can now run Void on your 64-bit ARM computers without compiling
everything yourself!

In March 2015, Chris bootstrapped the first aarch64
base-system --- without any access to real hardware.  Everything was
cross-compiled or used a really slow QEMU when this wasn't possible.
Mid-2015, Void got access to a virtualized instance on a real aarch64
machine (thanks to DataCentred), an offer which unfortunately shut
down in late 2015.

In May 2016, Chris bought an ODROID-C2 and resumed porting.  Soon, the
first installable image was prepared and ran on native hardware.

In September 2016, a virtual machine was dedicated to be the official
aarch64 cross-builder, and now packages are officially provided (both
for glibc and musl)---so far in the seperate repository:
https://repo.voidlinux.org/current/aarch64.

We are still looking for [powerful native aarch64
hardware](https://twitter.com/clandmeter/status/766215821257543680) to
avoid cross-compiling, and also to build 32-bit ARM packages natively.

We thank all contributors for making this port possible,
especially Nick Jones from DataCentred and the folks from Arch Linux ARM.

