---
layout: post
title: "Full switch to journald"
date: 2012-11-16
---

base-system-0.67 does not depend on "syslog-daemon" and "logrotate" anymore.

Functionality from those packages is already provided by systemd's journald. By default **void** doesn't store logs on disk, but you can change this behaviour by editing **/etc/systemd/journald.conf** and changing 'Storage' to **persistent**, or simply creating the **/var/log/journal** directory manually.
