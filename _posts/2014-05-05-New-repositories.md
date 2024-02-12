---
layout: post
title: "New package repositories"
comments: true
date: 2014-05-05 11:50:00
---

Starting from now on three new repositories to store binary packages have been
created by default:

- `multilib`: this repository contains 32bit packages, only meaningful for 64bit platforms.

- `multilib/nonfree`: this repository contains `non free` 32bit packages, only
meaningful for 64bit platforms.

- `debug`: this repository contains `debug` packages with debugging symbols.

The URL for those repositories:

- http://repo.voidlinux.eu/current/multilib
- http://repo.voidlinux.eu/current/multilib/nonfree
- http://repo.voidlinux.eu/current/debug

Also available on any of the mirrors listed in the `xbps.conf` configuration file.

Do not forget to update `/etc/xbps/xbps.conf` with the new URLs if you use them.

