---
layout: post
title: "LibreSSL enabled by default"
comments: true
date: 2014-08-06 10:00:00
---

The [LibreSSL](http://www.libressl.org) implementation is now used by default.
This fork of [OpenSSL](http://www.openssl.org) is maintained and pro-actively
developed by the [OpenBSD team](http://www.openbsd.org). 

We believe that at long-term it will benefit the whole **FOSS** community, and
this will help to not repeat the *infamous* [heartbleed](http://en.wikipedia.org/wiki/Heartbleed).

If you still have the **openssl** package installed, it should be *replaced*
by the **libressl-openssl** package to make a full switch to *LibreSSL*:

    # xbps-install -Sv libressl-openssl

Enjoy!
