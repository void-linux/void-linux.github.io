---
title: March 2024 Image Release (and Raspberry Pi 5 support)
layout: post
---

We're pleased to announce that the 20240314 image set has been promoted to
current and is now generally available.

You can find the new images on our [downloads page](/download/) and on our many
[mirrors](https://xmirror.voidlinux.org).

Some highlights of this release:

- A keymap selector is now shown in LightDM on XFCE images
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#354](https://github.com/void-linux/void-mklive/pull/354))
- The chrony NTP daemon is now enabled by default in live images
   ([@classabbyamp](https://github.com/classabbyamp) in
   [`abbd636`](https://github.com/void-linux/void-mklive/commit/abbd6365b421234df6d55e7eb94d6c3c4195078d))
- Raspberry Pi images can now be installed on non-SD card storage without manual
   configuration on models that support booting from USB or NVMe
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#361](https://github.com/void-linux/void-mklive/pull/361))
- Raspberry Pi images now default to a `/boot` partition of 256MiB instead of 64MiB
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#368](https://github.com/void-linux/void-mklive/pull/368))

`rpi-aarch64*` PLATFORMFSes and images now support the Raspberry Pi 5.
After installation, the kernel can be
[switched](https://docs.voidlinux.org/installation/guides/arm-devices/platforms.html#raspberry-pi-5-kernel)
to the Raspberry Pi 5-specific `rpi5-kernel`.

You may verify the authenticity of the images by following the instructions on
the [downloads page](/download/), and using the following minisign key information:

```
untrusted comment: minisign public key A3FCFCCA9D356F86
RWSGbzWdyvz8o4nrhY1nbmHLF6QiFH/AQXs1mS/0X+t1x3WwUA16hdc/
```
