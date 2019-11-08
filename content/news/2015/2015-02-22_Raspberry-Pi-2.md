+++
title="Raspberry Pi 2 platform support"
date=2015-02-22
+++

The Raspberry Pi 2 (ARMv7) platform is now fully supported and a 2GB image
as well as a rootfs have been created to use Void on them.

Thanks to some donations I've been able to test the hardware and merge the required changes
to `void-packages` and `void-mklive` to generate a working rootfs/image.

As any other supported ARM platform, once booted, `dhcpcd`, `ntpd` and `sshd` are started
automatically to be able to connect to it via `ssh` (log in as `root`, password `voidlinux`).

Check the [downloads](http://www.voidlinux.eu/download/) section to grab them!
