---
title: Changes to xbps-src Masterdir Creation and Use
layout: post
---

In an effort to simplify the usage of [`xbps-src`](https://github.com/void-linux/void-packages),
there has been a small change to how masterdirs (the containers xbps-src uses
to build packages) are created and used.

The default masterdir is now called `masterdir-<arch>`, except when `masterdir`
already exists or when using xbps-src in a container (where it's still `masterdir`).

### Creation

When creating a masterdir for an alternate architecture or libc, the previous
syntax was:

```
./xbps-src -m <name> binary-bootstrap <arch>
```

Now, the `<arch>` should be specified using the new `-A` (host architecture)
flag:

```
./xbps-src -A <arch> binary-bootstrap
```

This will create a new masterdir called `masterdir-<arch>` in the root of your
void-packages repository checkout.

Arbitrarily-named masterdirs can still be created with `-m <name>`.

### Usage

Instead of specifying the alternative masterdir directly, you can now use the
`-A` (host architecture) flag to use the `masterdir-<arch>` masterdir:

```
./xbps-src -A <arch> pkg <pkgname>
```

Arbitrarily-named masterdirs can still be used with `-m <name>`.
