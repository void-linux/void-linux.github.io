---
layout: post
title: "Switch to systemd-journal group"
date: 2013-03-27
comments: true
---

Starting with `systemd-199` the group to access the systemd journal group has been changed to the upstream
group name: `systemd-journal`; until `systemd-198` the `adm` system group was used for this purpose.

After upgrading to `systemd>=199` the `systemd-journal` group (with gid 24) will be created automatically. If you want to have access to the journal files your user must be added to this group:

    # usermod -a -G systemd-journal <user>
