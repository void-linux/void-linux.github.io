---
layout: std
title: Enter the void - Downloads
---

<div class="chooser">
<div markdown="1" class="item item_on">
#### Architecture:

* [x86_64](#images_x86_64)
* [i686](#images_i686)
* [armv6hf](#images_armv6hf)
* [armv7hf](#images_armv7hf)
* [show all](#images)
</div>
</div>

<div class="chooser" id="images">
<div markdown="1" id="images_x86_64" class="item">
### x86\_64:

#### glibc:

* [Void live with Cinnamon for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-cinnamon.iso)
* [Void live with Enlightenment for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-enlightenment.iso)
* [Void live with Mate for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-mate.iso)
* [Void live with base-system for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest.iso)
* [Void live with xfce for x86\_64](http://repo.voidlinux.eu/live/void-live-x86_64-latest-xfce.iso)

#### musl:

* [Void live with Mate for x86\_64 and musl libc](http://repo.voidlinux.eu/live/void-live-x86_64-musl-latest-mate.iso)
* [Void live with base-system for x86\_64 and musl libc](http://repo.voidlinux.eu/live/void-live-x86_64-musl-latest.iso)
* [Void live with xfce for x86\_64 and musl libc](http://repo.voidlinux.eu/live/void-live-x86_64-musl-latest-xfce.iso)
</div>
<div markdown="1" id="images_i686" class="item">
### i686:

#### glibc:

* [Void live with Cinnamon for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-cinnamon.iso)
* [Void live with Enlightenment for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-enlightenment.iso)
* [Void live with Mate for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-mate.iso)
* [Void live with xfce for i686](http://repo.voidlinux.eu/live/void-live-i686-latest-xfce.iso)

#### musl:

* none
</div>
<div markdown="1" id="images_armv6hf" class="item">
### armv6hf:

#### glibc:

* [Raspberry Pi (ARMv6, hard float)](http://repo.voidlinux.eu/live/void-rpi-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-rpi-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/Raspberry-Pi#rootfs-install)


#### musl:

* none

Connect to it in virtual terminal or via ssh and log in as *root*, password **voidlinux**.

</div>
<div markdown="1" id="images_armv7hf" class="item">
### armv7hf:

#### glibc:

* [BeagleBone/BeagleBone Black (ARMv7, hard float)](http://repo.voidlinux.eu/live/void-beaglebone-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-beaglebone-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/beaglebone#rootfs-install)
* [Cubieboard2 (ARMv7, hard float)](http://repo.voidlinux.eu/live/void-cubieboard2-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-cubieboard2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/cubieboard2#rootfs-install)
* [Odroid U2/U3 (ARMv7, hard float)](http://repo.voidlinux.eu/live/void-odroid-u2-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-odroid-u2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/odroid-u2#rootfs-install)
* [Raspberry Pi 2 (ARMv7, hard float)](http://repo.voidlinux.eu/live/void-rpi2-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-rpi2-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/Raspberry-Pi#rootfs-install)
* [USB Armory (ARMv7, hard float)](http://repo.voidlinux.eu/live/void-usbarmory-latest.img.xz) [rootfs](http://repo.voidlinux.eu/live/void-usbarmory-rootfs-latest.tar.xz) [instructions](https://github.com/voidlinux/documentation/wiki/USB-Armory#rootfs-install)

#### musl:

* none

Connect to it in virtual terminal or via ssh and log in as *root*, password **voidlinux**.

</div>
</div>
<br clear="both">

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
$ LANG=C gpg --verify sha256sums.txt.asc
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

