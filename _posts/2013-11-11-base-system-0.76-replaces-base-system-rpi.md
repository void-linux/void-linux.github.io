---
layout: post
title: "base-system-0.76 replaces base-system-rpi"
date: 2013-11-11
comments: true
---

The `base-system` package has been updated to `0.76` and now it's the default for Raspberry Pi too.
Raspberry Pi void users should follow these steps:

    # xbps-install -Sf base-system
    # xbps-install -Su

> Please note that `base-system` is the default for x86 users, hence there is no need to reinstall it. Simply upgrade your packages as usual.

Also with that version, two new packages are also installed by default:

 - f2fs-tools for the F2FS filesystem.
 - openssh-server (the sshd.service is now enabled by default).

If you have any of them installed manually, you can change its `installation type` to `automatic`:

    # xbps-pkgdb -m auto f2fs-tools openssh-server
