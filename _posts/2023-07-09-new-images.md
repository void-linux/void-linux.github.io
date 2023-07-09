---
title: New Images! (July 2023 Edition)
layout: post
---

We're pleased to announce that the 20230628 image set has been promoted to
current and is now generally available.

You can find the new images on our [downloads page](/download/) and on our many
[mirrors](https://docs.voidlinux.org/xbps/repositories/mirrors/index.html).

Some highlights of this release:

- Installing using the network source no longer fails to create the non-root
   user ([@classabbyamp](https://github.com/classabbyamp) in
   [#319](https://github.com/void-linux/void-mklive/pull/319))
- The xbps mirror can now be selected in the installer using
   [`xmirror`](https://github.com/void-linux/xmirror)
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#318](https://github.com/void-linux/void-mklive/pull/318))
- The xfce live ISO now uses LightDM ([@paper42](https://github.com/paper42) in
   [#324](https://github.com/void-linux/void-mklive/pull/324))
- GRUB will no longer fail to be installed in some partition layouts/orders
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#328](https://github.com/void-linux/void-mklive/pull/328))
- Various improvements to the installer
   ([@dateiexplorer](https://github.com/dateiexplorer) in
   [#334](https://github.com/void-linux/void-mklive/pull/334))
- Xfce live ISOs now use pipewire for audio, and base ISOs now include ALSA
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#348](https://github.com/void-linux/void-mklive/pull/348))
- Live ISOs now include several new boot options, including
   screenreader-enabled, memtest86+, reboot, shutdown, and EFI firmware setup
   ([@classabbyamp](https://github.com/classabbyamp) in
   [#295](https://github.com/void-linux/void-mklive/pull/295) and
   [#348](https://github.com/void-linux/void-mklive/pull/348))

The console screenreader `espeakup`, the braille TTY driver `brltty`, and the
GUI screenreader `orca` are now included in all live ISOs for x86_64 and i686.
To learn more about this, read the [documentation in the Void Linux
Handbook](https://docs.voidlinux.org/installation/live-images/index.html#accessibility-support).

You may verify the authenticity of the images by following the instructions on
the downloads page, and using the following minisign key information:

```
untrusted comment: minisign public key 5D7153E025EC26B6
RWS2Juwl4FNxXe0NtAdYushNLM3GtJ6poGkZ0Up1P/9YLcCK4xlSWAfs
```
