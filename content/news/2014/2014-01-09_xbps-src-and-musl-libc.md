+++
title="xbps-src: building packages against the musl C library"
date=2014-01-09
+++

Starting with the just released *xbps* 0.29 and *xbps-src* v96 versions
there's support to build packages for the musl C library. Two ways to build
packages are available:

- Natively (matching your CPU architecture) via the meta package *base-chroot-musl*.
- Using a cross compiler provided by `Void`.

To build packages natively for musl follow these steps:

```
$ xbps-src -m ~/masterdir-musl binary-bootstrap <arch>-musl
$ xbps-src -m ~/masterdir-musl build-pkg foo
```

> Replace `<arch>` with your native CPU architecture i.e `x86_64`.

Alternatively you can also cross compile the packages for musl with xbps-src:

```
$ xbps-src -a <arch>-musl build-pkg foo
```

I'd welcome everybody to build software against the musl C library and fix/report
portability problems to their respective developers.

musl homepage: [http://www.musl-libc.org/](http://www.musl-libc.org/)
