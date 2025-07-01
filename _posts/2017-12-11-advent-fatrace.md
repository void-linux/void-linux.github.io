---
layout: post
title: "The Advent of Void: Day 11: fatrace"
comments: true
---

As a Linux user, you probably know how to use
[strace(1)](https://man.voidlinux.eu/strace.1) to see what a
*particular* process is doing.  However, getting a picture of what the
whole system is doing is more difficult.

If it's related to file access,
[fatrace(1)](https://man.voidlinux.eu/fatrace.1) can be of great help
then.  fatrace uses the Linux fanotify API, which allows *global tracing*
of all file operations.
`CONFIG_FANOTIFY=y` is enabled on Void Linux by default.

Just run `fatrace` as root to see what's going on:

```
# fatrace
svlogd(1036): W /var/log/socklog/secure/current
firefox(12433): W /home/.../cookies.sqlite-wal
sh(18513): C /usr/bin/dash
sh(18513): C /usr/lib/ld-2.26.so
sh(18513): C /usr/lib/libc-2.26.so
xlmdcheck(18568): RCO /home/.../Mail/root@fs/new
xlmdcheck(18568): RC /home/.../Mail/root@fs
xlmdcheck(18568): RC /home/.../Mail
...
```

The letters stand for `O`pen, `R`ead, `W`rite, or `C`lose, respectively.

fatrace also offers some filtering functions, so you can exclude by
PID, match for actions or the program name, and even add timestamps to
the output.

A nice usecase of fatrace occurs when you are doing a long but silent
`cp -a` or `rsync`, since you can quickly check on which files the
process currently operates.
