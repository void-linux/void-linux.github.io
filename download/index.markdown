---
layout: std
title: Enter the void - Downloads
---
* TOC
{:toc}

## Download installable base live images (x86)

Currently there are installable live images for the **x86** and **x86\_64** architectures
and there is support to make a local installation (with the included packages) or a network
installation (packages are downloaded from official repository).

* [Void live with base-system for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest.iso)
    - Requirements: EM64T CPU, 96MB RAM, 350MB disk, Ethernet/WiFi for network installation.

* [Void live with base-system for i686](http://repo.voidlinux.eu/live/void-live-i686-latest.iso)
    - Requirements: Pentium 4 CPU (SSE2), 96MB RAM, 350MB disk, Ethernet / WiFi for network installation.

Log in as **anon/root**, password **voidlinux**.

To start the installer just execute the *void-installer* utility with enough permissions (i.e *sudo*).

### live images with flavours (x86)

Additional live images with *flavours* (an additional Desktop Environment with autologin) are also
available:

- [Void live with Enlightenment for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-enlightenment.iso)
- [Void live with Enlightenment for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-enlightenment.iso)
- [Void live with Cinnamon for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-cinnamon.iso)
- [Void live with Cinnamon for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-cinnamon.iso)
- [Void live with Mate for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-mate.iso)
- [Void live with Mate for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-mate.iso)
- [Void live with xfce for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-xfce.iso)
- [Void live with xfce for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-xfce.iso)

> NOTE: these images need at least 256 or 512 MB of RAM in order to work correctly.

## Download ready to boot images for ARM

Install Void by using a *prepared image* or a *rootfs tarbal* that can be written/unpacked onto the SD card.
This method allows you to have a system ready to boot / use, once it's written / unpacked onto the target device.

#### BeagleBone/BeagleBone Black (ARMv7, hard float)
 - [**2GB image**](http://repo.voidlinux.eu/live/void-beaglebone-latest.img.xz)
 - [**rootfs**](http://repo.voidlinux.eu/live/void-beaglebone-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/beaglebone#rootfs-install)

#### Cubieboard2 (ARMv7, hard float)
 - [**2GB image**](http://repo.voidlinux.eu/live/void-cubieboard2-latest.img.xz)
 - [**rootfs**](http://repo.voidlinux.eu/live/void-cubieboard2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/cubieboard2#rootfs-install)

#### Odroid U2/U3 (ARMv7, hard float)
 - [**2GB image**](http://repo.voidlinux.eu/live/void-odroid-u2-latest.img.xz)
 - [**rootfs**](http://repo.voidlinux.eu/live/void-odroid-u2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/odroid-u2#rootfs-install)

#### Raspberry Pi (ARMv6, hard float)
 - [**2GB image**](http://repo.voidlinux.eu/live/void-rpi-latest.img.xz)
 - [**rootfs**](http://repo.voidlinux.eu/live/void-rpi-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/Raspberry-Pi#rootfs-install)

#### Raspberry Pi 2 (ARMv7, hard float)
   - [**2GB image**](http://repo.voidlinux.eu/live/void-rpi2-latest.img.xz)
   - [**rootfs**](http://repo.voidlinux.eu/live/void-rpi2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/Raspberry-Pi#rootfs-install)

#### USB Armory (ARMv7, hard float)
   - [**2GB image**](http://repo.voidlinux.eu/live/void-usbarmory-latest.img.xz)
   - [**rootfs**](http://repo.voidlinux.eu/live/void-usbarmory-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/USB-Armory#rootfs-install)

Connect to it in virtual terminal or via ssh and log in as *root*, password **voidlinux**.

## Verifying file integrity and its digital signature

The [sha256sums.txt](http://repo.voidlinux.eu/live/sha256sums.txt) file contains the `SHA256` hashes to verify the integrity
of the downloaded files; this file is digitally signed with **Juan RP's GPG** key.

- Signer: `Juan RP <xtraeme@gmail.com>`
- KeyID: `482F9368`
- Fingerprint: `F469 EAEF 52F5 9627 75B8 20CD AF19 F6CB 482F 9368`

My public key is available at [http://repo.voidlinux.eu/live/xtraeme.asc](http://repo.voidlinux.eu/live/xtraeme.asc)
or in any known `PGP key server`. Follow these steps to verify the integrity and its digital signature:

~~~
$ gpg --recv-keys 482F9368
$ wget http://repo.voidlinux.eu/live/sha256sums.txt{,.asc}
$ LANG=C gpg --verify < sha256sums.txt.asc
gpg: Signature made Sun Feb  8 12:33:05 2015 CET using RSA key ID 482F9368
gpg: Good signature from "Juan RP <xtraeme@gmail.com>" [unknown]
gpg:                 aka "[jpeg image of size 3503]" [unknown]
~~~

Now that the signature has been verified, you should check the sha256 hash is valid for the file you've downloaded...
use the sha256sum utility and compare it with what's stored in the `sha256sums.txt` file:

~~~
$ LANG=C sha256sum -c sha256sums.txt 2>/dev/null|grep void-beaglebone-latest.img.xz
void-beaglebone-latest.img.xz: OK
$
~~~

If the above command does not return `OK`, the downloaded file is corrupt or has been modified. Don't use it.

