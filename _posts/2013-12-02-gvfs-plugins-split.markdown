---
layout: post
title: "gvfs plugins split"
date: 2013-12-02
---

Starting with `gvfs-1.18.3_2` many of the provided plug-ins have been splitted
into additional binary packages:

```
gvfs-afp-1.18.3_2     Userspace virtual filesystem - Apple Filing Protocol (AFP) backend
gvfs-cdda-1.18.3_2    Userspace virtual filesystem - CD-ROM backend
gvfs-devel-1.18.3_2   Userspace virtual filesystem - development files
gvfs-goa-1.18.3_2     Userspace virtual filesystem - Gnome Online Accounts (webservices) backend
gvfs-gphoto2-1.18.3_2 Userspace virtual filesystem - gphoto2 (PTP camera/MTP media player) backend
gvfs-mtp-1.18.3_2     Userspace virtual filesystem - MTP backend
gvfs-smb-1.18.3_2     Userspace virtual filesystem - SMB/CIFS (Windows client) backend
```

Just install any of these plug-ins to have the same functionality as previously.
