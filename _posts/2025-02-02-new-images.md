---
title: "Feburary 2025 Image Release: Arm64 Extravaganza"
layout: post
---

We're pleased to announce that the 20250202 image set has been promoted to
current and is now generally available.

You can find the new images on our [downloads page](/download/) and on our many
[mirrors](https://xmirror.voidlinux.org).

This release introduces support for several arm64 UEFI devices:

- [Apple Silicon](https://docs.voidlinux.org/installation/guides/arm-devices/apple-silicon.html)
- [Lenovo Thinkpad X13s](https://docs.voidlinux.org/installation/guides/arm-devices/thinkpad-x13s.html)
- [Pinebook Pro](https://docs.voidlinux.org/installation/guides/arm-devices/pinebook-pro.html)

Live ISOs for `aarch64` and `aarch64-musl` should also support other arm64
devices that support UEFI and can run a mainline (standard) kernel.

Additionally, this image release includes:

- Linux 6.12 in live ISOs
- Xfce 4.20 in `xfce`-flavored live ISOs
- Linux 6.6.69 in Raspberry Pi PLATFORMFSes and images
- [`xgenfstab`](https://man.voidlinux.org/xgenfstab.1), a new script from `xtools`
  to simplify generation of `/etc/fstab` for chroot installs

and the following changes:

- Fixed issue where systems with Nvidia graphics cards would not boot without `nomodeset`
   ([void-packages #52545](https://github.com/void-linux/void-packages/pull/52545))
- Added a bootloader menu entry to disable graphics by setting `nomodeset`
   ([void-mklive `380f0fd`](https://github.com/void-linux/void-mklive/commmit/380f0fd3c4ea64b3feff4b8ffd1978def98b2af5))
- Added additional hotkeys in the bootloader menu. See [the handbook](https://docs.voidlinux.org/installation/live-images/index.html#accessibility-support)
   for a full listing
   ([void-mklive `380f0fd`](https://github.com/void-linux/void-mklive/commmit/380f0fd3c4ea64b3feff4b8ffd1978def98b2af5))
- Raspberry Pi platform images are now smaller by default, but will grow the root partition to fit the storage
   device upon first boot using `growpart`. See
   [the handbook](https://docs.voidlinux.org/installation/guides/arm-devices/index.html#pre-built-images)
   for more details
   ([void-mklive #379](https://github.com/void-linux/void-mklive/pull/379))
- `void-installer` now includes a post-installation menu to enable services on the installed system
   ([void-mklive #389](https://github.com/void-linux/void-mklive/pull/389))
- `rpi-aarch64` and `rpi-aarch64-musl` PLATFORMFSes and platform images should now
support the recently-released Raspberry Pi 500 and CM5.

You may verify the authenticity of the images by following the instructions in
[the handbook](https://docs.voidlinux.org/installation/index.html#verifying-images),
and using the following minisign key information:

```
untrusted comment: minisign public key 4D56E70F102AF9F9
RWT5+SoQD+dWTeOdNuc4Q/jq2+3+jpql7+JJp4WukkxTdpsZlk2EGuPj
```

![A screenshot of an xfce desktop with two windows. One is firefox showing voidlinux.org, one is a terminal showing fastfetch output, indicating that this is a Thinkpad X13s](/assets/screenshots/x13s-live.png)
