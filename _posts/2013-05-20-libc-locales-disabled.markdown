---
layout: post
title: "GNU libc locales disabled by default"
date: 2013-05-20
---

Starting with `glibc-locales-2.17_7` all locales that were enabled in `/etc/default/libc-locales` previously (de, en, es, fr, etc) are now disabled by default. The installer will enable the wanted locale for new installations.

If you didn't modify `/etc/default/libc-locales` you'll have to uncomment your wanted locales and rebuild the list of locales after upgrading with:

    $ xbps-reconfigure -f glibc-locales
