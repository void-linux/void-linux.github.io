---
layout: std
title: Enter the void - FAQ
---
* TOC
{:toc}

# Introduction

# Installation

Void Linux provides a dialog based installation script, which can be used for most basic setups.
The script however does not work for slightly more specific setups, in this case you should use the manual installation method.

The following features are **not** supported by the installation script:

* LVM
* Luks
* ZFS

You can either install Void Linux from one of the live images using one of both installation methods or use another linux distribution and the manual installation method with static [xbps](/usage/xbps) binaries.

## Downloading

### Live Images

### Static XBPS binaries

Static xbps images can be downloaded from [https://repo.voidlinux.eu/static/](https://repo.voidlinux.eu/static/).

```
$ wget https://repo.voidlinux.eu/static/xbps-static-latest.$(uname -m)-musl.tar.xz
```

After [verifying the integrity](#verifying-integrity) you can extract and use the binaries.

```
$ tar xfv xbps-static-latest.$(uname -m)-musl.tar.xz
$ ./usr/bin/xbps-install -h
```

### Verifying integrity

The image release directories contain a `sha256sums.txt` and a
`sha256sums.txt.asc` file to verify the integrity of the downloaded images.

```
$ wget http://repo.voidlinux.eu/live/current/sha256sums.txt{,.asc}
```

You can now verify the integrity of downloaded file using `sha256sum(1)`.

```
$ sha256sum -c --ignore-missing sha256sums.txt
void-live-x86_64-musl-20170220.iso: OK
```

This just makes sure that the file was not corrupted while downloading.

To verify that the downloaded files are the ones that the Void Linux maintainers published and signed you can use pgp.

The file is signed with Juan RP’s GPG key:
* Signer: `Juan RP <xtraeme@voidlinux.eu>`
* KeyID: `482F9368`
* Fingerprint: `F469 EAEF 52F5 9627 75B8  20CD AF19 F6CB 482F 9368`

You can use `gpg(1)` to receive the key from a keyserver using the following command or download it from [https://repo.voidlinux.eu/live/xtraeme.asc](https://repo.voidlinux.eu/live/xtraeme.asc).

```
$ gpg --recv-keys 482F9368
gpg: key AF19F6CB482F9368: public key "Juan RP <xtraeme@voidlinux.eu>" imported
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: next trustdb check due at 2018-03-18
gpg: Total number processed: 1
gpg:               imported: 1
```

You can now verify the signature of the `sha256sums.txt` file with `gpg(1)`.

```
$ gpg --verify sha256sums.txt.asc
gpg: assuming signed data in 'sha256sums.txt'
gpg: Signature made Wed 22 Feb 2017 02:59:20 AM CET
gpg:                using RSA key AF19F6CB482F9368
gpg: Good signature from "Juan RP <xtraeme@voidlinux.eu>" [unknown]
gpg:                 aka "Juan RP <xtraeme@gmail.com>" [unknown]
gpg:                 aka "[jpeg image of size 3503]" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: F469 EAEF 52F5 9627 75B8  20CD AF19 F6CB 482F 9368
```

## Using the Installer

The installer has to be executed as `root` user, if you logged in as `anon` you can use `sudo(8)` to run the installer as `root`.

## Manual installation


# System Management

## System services and daemons

Void uses the [runit](/usage/runit/) supervision suite to run system services and daemons.

Services are enabled by simply linking them into the `/var/service` service directory.

```
# ln -s /etc/sv/<service name> /var/service/
```

To disable them again you just remove the link.

```
# rm /var/service/<service name>
```

Activated services can be controlled with the `sv(8)` command, following commands are available and can be used like `sv <command> <services...>`.

* `up` to start, `down` to stop and `once` to start services once.
* `pause`, `cont`, `hup`, `alarm`, `interrupt`, `quit`, `1`, `2`, `term` and `kill` to send the corresponding signal.
* `start`, `stop`, `reload` and `restart` for LSB init compatibility.

See the `sv(8)` manual page for further informations.

The `status` command can be used to retrieve the current status of one or more services.
It accepts either service names or service directories, which makes it possible to use shell wildcards to retrieve the status for all activated services.

```
# sv status dhcpcd
run: /var/service/dhcpcd: (pid 659) 561392s
# sv status /var/service/*
run: /var/service/agetty-tty1: (pid 658) 561392s
run: /var/service/agetty-tty2: (pid 639) 561392s
run: /var/service/agetty-tty3: (pid 662) 561392s
run: /var/service/agetty-ttyS0: (pid 650) 561392s
run: /var/service/dhcpcd: (pid 659) 561392s
run: /var/service/nanoklogd: (pid 666) 561391s
run: /var/service/ntpd: (pid 665) 561391s; run: log: (pid 664) 561391s
run: /var/service/opensmtpd: (pid 661) 561392s
run: /var/service/socklog-unix: (pid 646) 561392s; run: log: (pid 645) 561392s
run: /var/service/sshd: (pid 674) 561391s
run: /var/service/udevd: (pid 660) 561392s
run: /var/service/uuidd: (pid 640) 561392s
```

Extra options can be passed to most services using a `conf` file in the service directory.

```
$ cat /etc/sv/sshd/run
#!/bin/sh
ssh-keygen -A >/dev/null 2>&1 # Will generate host keys if they don't already exist
[ -r conf ] && . ./conf
exec /usr/bin/sshd -D $OPTS
# echo 'OPTS="-p 2222"' >>/etc/sv/sshd/conf
```

Another example is the `wpa_supplicant` service which has other available variables.

```
# cat /etv/sv/wpa_supplicant/run
#!/bin/sh
[ -r ./conf ] && . ./conf
exec 2>&1
exec wpa_supplicant -c ${CONF_FILE:=/etc/wpa_supplicant/wpa_supplicant.conf} -i ${WPA_INTERFACE:=wlan0} ${OPTS:=-s}
# echo WPA_INTERFACE=wlp3s0 >>/etc/sv/wpa_supplicant/conf
```

### Cron

Void Linux comes without a default cron daemon, you can choose one of multiple cron implementations, by installing the package and enabling the system service.

Available choices include `cronie`, `dcron`, `fcron` and more.

As alternative to the standard cron implementations you can use something like [snooze](https://github.com/chneukirchen/snooze) or `runwhen` which go hand in hand with service supervision.

### Logging

#### Syslog

The default installation comes with no syslog daemon, there are different implementations available.

`socklog` is the implementation from the `runit(8)` author and Void Linux provides a package with some basic configuration for it, this makes it a good choice if you don't know which one to choose.

```
# xbps-install -S socklog-void
# usermod -aG socklog <your username>
# ln -s /etc/sv/socklog-unix /var/service/
# ln -s /etc/sv/nanoklogd /var/service/
```

Other syslog implementations like `rsyslog` and `metalog` are available in the package repository too.

## Changing the default shell

The default shell for users can be changed with the `chsh(1)` tool.

```
$ chsh -s /bin/bash <user name>
```

Make sure to use the same path to the shell as its in `/etc/shells` or listed by the `chsh(1)` list command.

A list of available installed shells can be retrieved with the `chsh(1)` list command.

```
$ chsh -l
/bin/sh
/bin/bash
/bin/mksh
/bin/zsh
/bin/rc
/bin/ksh
/bin/oksh
/bin/yash
```

Following packages are available in the package repository and provide usable shells.

* bash
* dash
* elvish
* es
* fish-shell
* heirloom-sh
* ksh
* mksh
* oksh
* posh
* rc
* tcsh
* yash
* zsh

## Kernel
### Kernel series

Void Linux provides many kernel series in the default repository,

```
$ xbps-query --regex -Rs 'linux[34]' | grep -Ev '(dbg|headers)'
[-] linux3.14-3.14.79_1           The Linux kernel and modules (3.14 series)
[-] linux3.18-3.18.60_1           The Linux kernel and modules (3.18 series)
[-] linux4.1-4.1.41_1             The Linux kernel and modules (4.1 series)
[-] linux4.10-4.10.17_1           The Linux kernel and modules (4.10 series)
[*] linux4.11-4.11.11_1           The Linux kernel and modules (4.11 series)
[-] linux4.12-4.12.3_1            The Linux kernel and modules (4.12 series)
[-] linux4.13-4.13.0rc1_1         The Linux kernel and modules (4.13 series)
[-] linux4.4-4.4.76_1             The Linux kernel and modules (4.4 series)
[-] linux4.8-4.8.17_1             The Linux kernel and modules (4.8 series)
[-] linux4.9-4.9.37_1             The Linux kernel and modules (4.9 series)
```

The `linux` meta package which is installed by default depends on one of the kernel packages, usually the latest mainline kernel that works with all dkms modules.


### Removing old kernels

```
$ vkpurge list
3.8.2_1
```

You can now remove a specific kernel version like `3.8.2_1` or `all` which removes all kernels  expect the latest kernel of each series and the kernel that is currently booted.

```
# vkpurge rm 3.8.2_1
# vkpurge rm all
```

### Kernel modules
#### Loading kernel modules at boot

To load kernel modules at boot time, a `.conf` file like `/etc/modules-load.d/virtio.conf` can be created.

```
# load virtio-net
virtio-net
```

#### Blacklisting kernel modules

There are two different methods to blacklist kernel modules, for the initramfs and for the booted system.
Some modules are loaded by the initramfs very early in the boot process, those have to be blacklisted in the initramfs.

You can blacklist modules with a `.conf` file like `/etc/modprobe.d/radeon.conf`.

```
blacklist radeon
```

##### dracut

To blacklist modules from being included in a dracut initramfs you need to create a `.conf` file like `/etc/dracut.conf.d/radeon.conf`.

```
omit_drivers+=" radeon "
```

Now you need to regenerate the initramfs to make the changes take effect on the next reboot.

```
# dracut --force
```

##### mkinitcpio

XXX: add example of blacklisting kernel modules for mkinitcpio

### Kernel hooks

Void Linux provides directories for kernel hooks in `/etc/kernel.d/{pre-install,post-install,pre-remove,post-remove}`.

Bootloaders like `grub`, `gummiboot` and `lilo` use those hooks to update the bootmenu. Initramfs tools like `dracut` and `mkinitcpio` use the hooks to generate initramfs files for newly installed kernels.

### Dynamic Kernel Module Support (dkms)

There are kernel modules that are not part of the linux source tree that are build at install time using dkms and [kernel hooks](#kernel-hooks).

```
$ xbps-query -Rs dkms
[-] acpi_call-dkms-1.2.0_2             Kernel module allowing calls to ACPI methods through /proc/acpi/call
[-] dkms-2.4.0_2                       Dynamic Kernel Modules System
[-] exfat-dkms-1.2.8_2                 Exfat kernel driver (nofuse)
[-] spl-0.6.5.10_1                     Solaris Porting Layer -- userland and kernel modules (using DKMS)
[-] tp_smapi-dkms-0.42_2               IBM ThinkPad hardware functions driver
[-] virtualbox-ose-dkms-5.1.24_1       General-purpose full virtualizer for x86 hardware - kernel module sources for dkms
[-] virtualbox-ose-guest-dkms-5.1.24_1 General-purpose full virtualizer for x86 hardware - guest addition module source for dkms
[-] zfs-0.6.5.10_1                     Z File System -- userland and kernel modules (using DKMS)
[-] zfs-32bit-0.6.5.10_1               Z File System -- userland and kernel modules (using DKMS) (32bit)
[-] broadcom-wl-dkms-6.30.223.271_6    Broadcom proprietary wireless drivers for Linux - DKMS kernel module
[-] catalyst-dkms-15.302_2             AMD catalyst driver 15.12 for Linux - DKMS kernel module
[-] nvidia-dkms-381.22_2               NVIDIA drivers for linux (long-lived series) - DKMS kernel module
[-] nvidia304-dkms-304.135_4           NVIDIA drivers (For GeForce 5 FX, 6, 7, 8 series) - DKMS kernel module
[-] nvidia340-dkms-340.102_5           NVIDIA drivers (GeForce 8, 9, 9M, 100, 100M, 200, 300 series) - DKMS kernel module
```

## Manual pages

Void packages come with manual pages and the default installation includes the [mandoc](http://mandoc.bsd.lv/) manpage toolset.

The `man(1)` command can be used to show manual pages.

```
$ man 1 chroot
```

The [mandoc](http://mandoc.bsd.lv/) toolset contains `apropos(1)` to search for manual pages, `apropos(1)` uses a database that can be updated and generated with the `makewhatis(1)` command.

```
# makewhatis -a
$ apropos chroot
chroot(1) - run command or interactive shell with special root directory
xbps-uchroot(1) - XBPS utility to chroot and bind mount with Linux namespaces
xbps-uchroot(1) - XBPS utility to chroot and bind mount with Linux namespaces
xbps-uunshare(1) - XBPS utility to chroot and bind mount with Linux user namespaces
xbps-uunshare(1) - XBPS utility to chroot and bind mount with Linux user namespaces
chroot(2) - change root directory
```

There are two extra packages for development and POSIX manuals that are not installed by default.

```
$ xbps-query -Rs man-pages
[*] man-pages-4.11_1        Linux Documentation Project (LDP) manual pages
[-] man-pages-devel-4.11_1  Linux Documentation Project (LDP) manual pages - development pages
[-] man-pages-posix-2013a_3 Manual pages about POSIX systems
# xbps-install -S man-pages-devel man-pages-posix
```

# Packages

Void Linux uses its home grown package management system, `xbps`.

## Package Management
### Searching a file

To search a file in packages you can use one of two methods

The first method is to use `xbps-query(1)` which is okay to use if you want to just look for local files, you can use it to search for remote files with the `-R` flag but its very slow compared to the second method using `xlocate`.

```
$ xbps-query -o /usr/bin/xlocate
xtools-0.46_1: /usr/bin/xlocate (regular file)
```

The `xtools` package contains the `xlocate` utility that works like `locate(1)` but for all files in the void package repository.

```
# xbps-install -Su xtools
$ xlocate -S
From https://repo.voidlinux.eu/xlocate/xlocate
 + 16d97bfe86...2ad1a4a8d1 master     -> master  (forced update)
$ xlocate fizz
nim-0.17.0_1	/usr/lib/nim/examples/fizzbuzz.nim
ponysay-3.0.2_1	/usr/share/ponysay/ponies/cherryfizzy.pony -> /usr/share/ponysay/ponies/cherrycola.pony
ponysay-3.0.2_1	/usr/share/ponysay/ttyponies/cherryfizzy.pony -> /usr/share/ponysay/ttyponies/cherrycola.pony
supertux2-data-0.5.1_1	/usr/share/supertux2/sounds/fizz.wav
```

## Building Packages

The first step is to building xbps packages from source is to clone the `void-packages` `git(1)` repository.

```
$ git clone https://github.com/voidlinux/void-packages.git
Cloning into 'void-packages'...
remote: Counting objects: 398517, done.
remote: Total 398517 (delta 0), reused 1 (delta 0), pack-reused 398516
Receiving objects: 100% (398517/398517), 151.18 MiB | 5.10 MiB/s, done.
Resolving deltas: 100% (227465/227465), done.
```

After cloning the repository it is necessary to setup the build environment by bootstrapping a container/chroot using the `xbps-src` script.

To bootstrap a build environment using binary packages for the same architecture your host uses use `binary-bootstrap`.

```
$ ./xbps-src binary-bootstrap
=> Installing bootstrap from binary package repositories...
[...]
=> Installed bootstrap successfully!
```

If you have the time and you want to build the bootstrap from source too, use the `bootstrap` command.

```
$ ./xbps-src bootstrap
```

In case you want to compile `i686` packages on your `x86_64` machine you can use one of the bootstrap commands with a different masterdir and the target architecture as second argument.

```
$ ./xbps-src -m masterdir-i686 binary-bootstrap i686
=> Installing bootstrap from binary package repositories...
[...]
=> Installed bootstrap successfully!
```

You can now build packages using the `pkg` command.

```
$ ./xbps-src pkg vim
[...]
```

Or in case you bootstrapped a different masterdir for another native architecture.

```
$ ./xbps-src -m masterdir-i686 pkg vim
[...]
```

## Contributing

You can find an extensive contributing guide [CONTRIBUTING.md](https://github.com/voidlinux/void-packages/blob/master/CONTRIBUTING.md) in the `void-packages` git repository.

## Debugging packages

Void Linux packages come without debugging symbols, if you want to debug software or look at a coredump it is helpful to have the debugging symbols.
To get debugging symbols for packages you need to activate the debug repo, afterwards its possible to install packages with the `-dbg` suffix.

```
$ xbps-install -S void-repo-debug
$ xbps-install -S <package name>-dbg
```

The `xtools` package contains the `xdbg` utility to retrieve a list of debug packages including dependencies for a package.

```
$ xdbg bash
bash-dbg
glibc-dbg
# xbps-install -S $(xdbg bash)
```

# Disk Setup

# Networking

The Network configuration in Void Linux can be done with different methods, the
default installation comes with `dhcpcd(8)`.

## Static Setup

A static network in Void Linux can be configured with `ip(8)`.

A simple way to configure the static network at boot is to add the necessary `ip(8)` commands to the `/etc/rc.local` file.

```
# Static IP configuration via iproute
ip link set dev eth0 up
ip addr add 192.168.1.2/24 brd + dev eth0
ip route add default via 192.168.1.1
```

## DHCP

### dhcpcd
### dhclient
### NetworkManager
### wicd
