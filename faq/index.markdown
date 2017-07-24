---
layout: std
title: Enter the void - runit
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

## System daemons

Void uses the [runit](/usage/runit/)

### Introduction
### Cron
### Logging
## Changing the default shell

# Packages

## Introduction
## Package Management
## Building Packages
## Contributing

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
