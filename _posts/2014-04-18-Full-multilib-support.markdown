---
layout: post
title: "Multilib support becomes a reality"
comments: true
date: 2014-04-18 10:35:00
---

Some of our readers thought we were dead due to the previous April's Fool post...
well, we are not dead (yet) and after 5 years since the first `xbps-0.1` release
I'm still improving the package system and making the Void distribution more stable
than ever. Now let's move on to the real post...

The Void distribution now contains a full multilib environment to be able to compile
and run 32-bit code on 64-bit systems. The `xbps-packages` collection automatically
builds 32-bit packages for x86\_64, if `xbps-src` runs on 32-bit environments.

While others might say that it has been supported for years in other distributions, I can
only say that we are not a fork of *any existing distribution* and we had to improve
the `xbps-packages` collection to achieve it in the least troublesome way.

Software on x86 is now configured to use `/usr/lib32` and by making this a symlink to `/usr/lib`
we were able to make all packages work on x86\_64 with the minimal effort.
Lots of 32-bit packages are now available for x86\_64 named as `<pkgname>-32bit`.

The following example illustrates how to compile `xbps` (the native void package manager)
for 32-bit by using the `gcc-multilib` package:

```
# xbps-install -Sy libarchive-devel-32bit gcc-multilib
...

$ cd xbps
$ CC="cc -m32" PKG_CONFIG_LIBDIR=/usr/lib32/pkgconfig ./configure && make
...
$ file bin/xbps-query/xbps-query
bin/xbps-query/xbps-query: ELF 32-bit LSB shared object, Intel 80386 ...
$
```

I'd like to thank Gottox for the initial implementation and ideas in allowing us to
achieve this feature in a relative short time.
