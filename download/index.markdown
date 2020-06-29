---
layout: std
title: Enter the void - Downloads
---
* TOC
{:toc}

## Download installable base live images and rootfs tarballs

All **live images** and **rootfs tarballs** are available at:

- [https://alpha.de.repo.voidlinux.org/live/current](https://alpha.de.repo.voidlinux.org/live/current)

These files can also be downloaded from other mirrors, which are listed [in the documentation](https://docs.voidlinux.org/xbps/repositories/mirrors/index.html).
Simply navigate to `live -> current` to find them.

The requirements for these images can be found [in the documentation](https://docs.voidlinux.org/installation/index.html#base-system-requirements).
An internet connection via Ethernet or WiFi is required for network installation.

### Verifying file integrity and its digital signature

Prior to using any image you're strongly encouraged to validate the
signatures on the image to ensure they haven't been tampered with.
The process for validating these keys can be found [in the
documentation](https://docs.voidlinux.org/installation/index.html#downloading-installation-media).

## Download installable base live images for x86

***PLEASE NOTE: To install the desktop environment, DON'T choose "install from network" choose the local install. VERY IMPORTANT!***

Currently there are installable live images for the **i686** and **x86\_64** architectures
and there is support to make a local installation (with the included packages) or a network
installation (packages are downloaded from official repository).

Log in as `anon`/`root`, password `voidlinux`.

To start the installer just execute the `void-installer` utility with enough permissions (i.e., `sudo`).

Additional live images with *flavors* (an additional Desktop Environment with autologin) are also
available:

- Enlightenment
- Cinnamon
- LXDE
- LXQT
- MATE
- XFCE

These images are named `void-live-ARCH-BUILD_DATE[-FLAVOR].iso`, where

- `ARCH` is the architecture of the image, which can be:
   - `x86_64`
   - `x86_64-musl`
   - `i686`
- `BUILD_DATE` is the date the image was built
- `FLAVOR` is optional, and specifies which flavor the image contains

These images need at least 256 or 512 MB of RAM in order to work correctly.

## Download ready to boot images for ARM

There are ready to boot images for several **ARM** devices. These images can be written onto an SD card (i.e. using `dd`)
and they allow you to have a ready to boot system. These images are prepared for 2GB SD cards. Alternatively, use the
rootfs tarballs if you want to customize the partitions and filesystems.

These images are named `void-DEVICE[-musl]-BUILD_DATE.img.xz`, where

- `DEVICE` is the device for which the image was built, which can be:
   - `beaglebone`: BeagleBone/BeagleBone Black (ARMv7, hard float)
   - `cubieboard2`: Cubieboard2 (ARMv7, hard float)
   - `odroid-c2`: Odroid U2/U3 (ARMv7, hard float)
   - `rpi`: Raspberry Pi and Raspberry Pi Zero (ARMv6, hard float)
   - `rpi2`: Raspberry Pi 2 (ARMv7, hard float)
   - `rpi3`: Raspberry Pi 3 (AARCH64, hard float)
   - `usbarmory`: USB Armory (ARMv7, hard float)
- `-musl` is optional and indicates that the image uses the musl libc instead of glibc
- `BUILD_DATE` is the date the image was built

Connect to it in virtual terminal or via ssh and log in as `root`, password `voidlinux`.

## Download rootfs tarballs

### Download rootfs tarballs for ARM

There are rootfs tarballs available for all the **ARM** devices which have ready to boot images,
as well as generic devices.

For the devices which have ready to boot images, the tarballs are named
`void-DEVICE[-musl]-PLATFORMFS-BUILD_DATE.tar.xz`, where all items mean the same as they do for ready to
boot images, and `PLATFORMFS` marks it as a tarball.

For generic devices, the tarballs are named `void-ARCH[-musl]-ROOTFS-BUILD_DATE.tar.xz`, where

- `ARCH` is the architecture of the image, which can be:
   - `armv6l`
   - `armv7l`
   - `aarch64`
- `-musl` is optional and indicates that the image uses the musl libc instead of glibc
- `BUILD_DATE` is the date the image was built

Deprecated instructions for using the PLATFORMFS images can be found in these wiki pages:

- [BeagleBone/BeagleBone Black](https://wiki.voidlinux.org/Beaglebone)
- [Cubieboard2](https://wiki.voidlinux.org/Cubieboard2_SD-Card)
- [Odroid U2/U3](https://wiki.voidlinux.org/Odroid_U2)
- [Raspberry Pi, Raspberry Pi Zero and Raspberry Pi 2](https://wiki.voidlinux.org/Raspberry_Pi)
- [USB Armory](https://wiki.voidlinux.org/USB_Armory)

### Download rootfs tarballs for x86

There are also rootfs tarballs available for **x86** architectures. They are named
`void-ARCH-ROOTFS-BUILD_DATE.tar.xz`, where all items mean the same as they do for the live images.
