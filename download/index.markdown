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

The requirements for these images can be found [in the documentation](https://docs.voidlinux.org/installation/base-requirements.html).
An internet connection via Ethernet or WiFi is required for network installation.

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

## Verifying file integrity and its digital signature

The
[sha256.txt](http://alpha.de.repo.voidlinux.org/live/current/sha256.txt)
file contains the `SHA256` hashes to verify the integrity of the
downloaded files; this file is digitally signed with a gpg key.

Prior to using any image you're strongly encouraged to validate the
signatures on the image to ensure they haven't been tampered with.
The process for validating these keys depends when the image set you
wish to verify was created.

### Images after November 2019

Images after November 2019 are signed using a signify key that is
specific to the release.  If you're on Void already, you can obtain
the keys from the void-release-keys package, which will be downloaded
using your existing XBPS trust relationship with your mirror.  You
will also need a copy of signify; on Void this is provided by the
`outils` package.

If you are not currently using Void Linux you will need to obtain a
copy of signify by other means, and the appropriate signing key from
our git repository
[here](https://github.com/void-linux/void-packages/tree/master/srcpkgs/void-release-keys/files/).

Once you've obtained the key, you can verify your image with the
sha256.sig file.  An example is shown here verifying the GCP musl
filesystem from the 20191109 release:

```
$ signify -C -p /etc/signify/void-release-20191109.pub -x sha256.sig void-GCP-musl-PLATFORMFS-20191109.tar.xz
Signature Verified
void-GCP-musl-PLATFORMFS-20191109.tar.xz: OK
```

If the verification process does not spit out the expected "OK" status
then do not use it!  Please alert the Void linux team of where you got
the image and how you verified it and we will follow up.

### Images Prior to November 2019

Images prior to 2017-10-07 were signed with Juan RP's key:

- Signer: `Juan RP <xtraeme@gmail.com>`
- KeyID: `482F9368`
- Fingerprint: `F469 EAEF 52F5 9627 75B8 20CD AF19 F6CB 482F 9368`

His public key is available at [http://alpha.de.repo.voidlinux.org/live/xtraeme.asc](http://alpha.de.repo.voidlinux.org/live/xtraeme.asc)
or in any known `PGP key server`. Follow these steps to verify the integrity and its digital signature:

Images after 2017-10-07 are signed with a dedicated Void Images key.

- Signer: `Void Linux Image Signing Key <images@voidlinux.eu>`
- KeyID: `B48282A4`
- Fingerprint: `CF24 B9C0 3809 7D8A 4495 8E2C 8DEB DA68 B482 82A4`

This key is available
at
[http://alpha.de.repo.voidlinux.org/live/current/void_images.asc](http://alpha.de.repo.voidlinux.org/live/current/void_images.asc) or
in most known `PGP key servers`.  Follow these steps to verify the
integrity and signature.

```
$ gpg --recv-keys <KEY_ID>
$ wget http://alpha.de.repo.voidlinux.org/live/current/sha256sums.txt{,.sig}
$ LANG=C gpg --verify sha256sums.txt.sig
gpg: Signature made Sun Feb  8 12:33:05 2015 CET using RSA key ID 482F9368
gpg: Good signature from "Juan RP <xtraeme@gmail.com>" [unknown]
gpg:                 aka "[jpeg image of size 3503]" [unknown]
```

The important line in the output above is "Good signature from [...]".
Make sure that you have this line and that the "from" field matches
what you expect.

Now that the signature has been verified, you should check the sha256 hash is valid for the file you've downloaded...
use the sha256sum utility and compare it with what's stored in the `sha256sums.txt` file:

```
$ LANG=C sha256sum -c sha256sums.txt 2>/dev/null|grep void-beaglebone-latest.img.xz
void-beaglebone-latest.img.xz: OK
```

If the above command does not return `OK`, the downloaded file is corrupt or has been modified. Don't use it.
