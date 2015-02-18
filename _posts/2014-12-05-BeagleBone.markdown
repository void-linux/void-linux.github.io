---
layout: post
title: "ARM BeagleBone/BeagleBone Black platform support"
comments: true
---

The Texas Instruments BeagleBone / BeagleBone Black ARM platforms are now fully
supported and a 2GB SD image as well as a rootfs have been created to use Void on them.

Thanks to a donation I've been able to test the hardware and merge the required changes
to `void-packages` and `void-mklive` to generate the base platform package `beaglebone-base`.

As any other supported ARM platform, once booted, `dhcpcd`, `ntpd` and `sshd` are started
automatically to be able to connect to it via `ssh` (log in as `root`, password `voidlinux`).

Check the [downloads](http://www.voidlinux.eu/download/) section to grab them!

- [http://en.wikipedia.org/wiki/BeagleBoard#BeagleBone](http://en.wikipedia.org/wiki/BeagleBoard#BeagleBone)
- [http://en.wikipedia.org/wiki/BeagleBoard#BeagleBone_Black](http://en.wikipedia.org/wiki/BeagleBoard#BeagleBone_Black)
