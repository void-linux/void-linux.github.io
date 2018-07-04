---
layout: std
title: Enter the void - Downloads
---
* TOC
{:toc}

## Download installable base live images (x86)

***PLEASE NOTE: To install the desktop environment, DON'T choose "install from network" choose the local install. VERY IMPORTANT!***

Currently there are installable live images for the **x86** and **x86\_64** architectures
and there is support to make a local installation (with the included packages) or a network
installation (packages are downloaded from official repository).

All **live images** and **rootfs tarballs** are available at:

* [http://repo.voidlinux.eu/live/current](http://repo.voidlinux.eu/live/current)

The x86\_64 images have these requirements:

- EM64T CPU, 96MB RAM, 350MB disk, Ethernet/WiFi for network installation.

The i686 images have these requirements:

-  Pentium 4 CPU (SSE2), 96MB RAM, 350MB disk, Ethernet / WiFi for network installation.

Log in as **anon/root**, password **voidlinux**.

To start the installer just execute the *void-installer* utility with enough permissions (i.e *sudo*).

Additional live images with *flavours* (an additional Desktop Environment with autologin) are also
available:

- Enlightenment
- Cinnamon
- LXDE
- MATE
- XFCE

These images need at least 256 or 512 MB of RAM in order to work correctly.

## Download ready to boot images for ARM

Install Void by using a *prepared image* or a *rootfs tarbal* that can be written/unpacked onto the SD card.
This method allows you to have a system ready to boot / use, once it's written / unpacked onto the target device.

The images are prepared for 2GB SD cards, alternatively use the **rootfs tarball** if you want
to customize the partitions and filesystems.

The list of supported platforms currently is:

- BeagleBone/BeagleBone Black (ARMv7, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/Beaglebone)

- Cubieboard2 (ARMv7, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/Cubieboard2_SD-Card)

- Odroid U2/U3 (ARMv7, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/Odroid_U2)

- Raspberry Pi (ARMv6, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/Raspberry_Pi)

- Raspberry Pi 2 (ARMv7, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/Raspberry_Pi)

- USB Armory (ARMv7, hard float)
   - [rootfs instructions](https://wiki.voidlinux.eu/USB_Armory)

Connect to it in virtual terminal or via ssh and log in as *root*, password **voidlinux**.

## Verifying file integrity and its digital signature

The [sha256sums.txt](http://repo.voidlinux.eu/live/current/sha256sums.txt) file contains the `SHA256` hashes to verify the integrity
of the downloaded files; this file is digitally signed with a gpg key.

Images prior to 2017-10-07 were signed with Juan RP's key:

- Signer: `Juan RP <xtraeme@gmail.com>`
- KeyID: `482F9368`
- Fingerprint: `F469 EAEF 52F5 9627 75B8 20CD AF19 F6CB 482F 9368`

His public key is available at [http://repo.voidlinux.eu/live/xtraeme.asc](http://repo.voidlinux.eu/live/xtraeme.asc)
or in any known `PGP key server`. Follow these steps to verify the integrity and its digital signature:

Images after 2017-10-07 are signed with a dedicated Void Images key.

- Signer: `Void Linux Image Signing Key <images@voidlinux.eu>`
- KeyID: `B48282A4`
- Fingerprint: `CF24 B9C0 3809 7D8A 4495 8E2C 8DEB DA68 B482 82A4`

This key is available
at
[http://repo.voidlinux.eu/live/current/void_images.asc](http://repo.voidlinux.eu/live/current/void_images.asc) or
in most known `PGP key servers`.  Follow these steps to verify the
integrity and signature.

~~~
$ gpg --recv-keys <KEY_ID>
$ wget http://repo.voidlinux.eu/live/current/sha256sums.txt{,.sig}
$ LANG=C gpg --verify sha256sums.txt.sig
gpg: Signature made Sun Feb  8 12:33:05 2015 CET using RSA key ID 482F9368
gpg: Good signature from "Juan RP <xtraeme@gmail.com>" [unknown]
gpg:                 aka "[jpeg image of size 3503]" [unknown]
~~~

The important line in the output above is "Good signature from [...]".
Make sure that you have this line and that the "from" field matches
what you expect.

Now that the signature has been verified, you should check the sha256 hash is valid for the file you've downloaded...
use the sha256sum utility and compare it with what's stored in the `sha256sums.txt` file:

~~~
$ LANG=C sha256sum -c sha256sums.txt 2>/dev/null|grep void-beaglebone-latest.img.xz
void-beaglebone-latest.img.xz: OK
$
~~~

If the above command does not return `OK`, the downloaded file is corrupt or has been modified. Don't use it.


## Mirrors

Void Linux maintains mirrors in several geographic regions for you to
use.  In normal use your traffic will be routed to the nearest mirror
to you based on your IP Address.  If you would like to directly use a
particular mirror you can set this manually.  This can also be handy
if you are on a different continent than the primary mirror, or if you
are not on the same continent as any officially managed mirrors.

Our mirrors are separated into two categories.  Tier 1 mirrors sync
directly from the build-master and will always have the latest packages
available.  These repositories are maintained by the Void Linux
Infrastructure Team.  In rare occasions we may permit a mirror that we
don't manage to sync directly from our primary servers if there are
extenuating circumstances.  Tier 2 mirrors sync from a nearby tier 1
mirror when possible, but there is no guarantee of a mirror being
nearby.  These mirrors are not managed by Void nor do they have any
specific guarantees for staleness or completeness of packages.  Tier 2
mirrors are free to sync only specific architectures and exclude
sub-repositories (nonfree/multilib).

To change your mirrors to use a different set, you must create files
in `/etc/xbps.d` with the same names as those in `/usr/share/xbps.d`.
Once you have created such files, replace `http://repo.voidlinux.eu/`
with one of the servers below.  If you wish to change this for all
four repos on a 64-bit host you will need to edit 4 files.  Only the
files containing 'repository' in the filename need to be duplicated to
`/etc/xbps.d/`.

### Tier 1 Mirrors

  * http://vm1.a-lej-de.m.voidlinux.org (EU: Germany)
  * http://repo2.voidlinux.eu (EU: Germany)
  * http://vm1.a-mci-us.m.voidlinux.org (USA: Kansas City)
  * http://mirror.clarkson.edu/voidlinux/ (USA: New York)
  * http://mirrors.servercentral.com/voidlinux/ (USA: Chicago)

### Tier 2 Mirrors

  * http://mirror.aarnet.edu.au/pub/voidlinux/ (AU: Canberra)
  * http://ftp.swin.edu.au/voidlinux/ (AU: Melbourne)
  * http://ftp.acc.umu.se/mirror/voidlinux.eu/ (EU: Sweden)
  * https://mirrors.dotsrc.org/voidlinux/ (EU: Denmark)
  * http://www.gtlib.gatech.edu/pub/VoidLinux/ (USA: Atlanta)

If you are operating a Tier 2 mirror and would like to be on this
list, please either file a pull request or reach out to
maldridge[at]voidlinux.eu.
