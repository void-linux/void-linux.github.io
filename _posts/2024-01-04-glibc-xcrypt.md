---
title: glibc 2.38 Update Issues and Solutions
layout: post
---

With the update to glibc 2.38, `libcrypt.so.1` is [no longer provided by
glibc](https://sourceware.org/glibc/wiki/Release/2.38#Building_libcrypt_is_disabled_by_default).
Libcrypt is an important library for several core system packages that use
cryptographic functions, including `pam`. The library has changed versions, and
the legacy version is still available for precompiled or proprietary
applications. The new version is available on Void as `libxcrypt` and the legacy
version is `libxcrypt-compat`.

With this change, some kinds of partial upgrades can leave PAM unable to
function. This breaks tools like `sudo`, `doas`, and `su`, as well as breaking
authentication to your system. Symptoms include messages like "PAM
authentication error: Module is unknown". If this has happened to you, you can
either:

- add `init=/bin/sh` to your kernel command-line in the bootloader and
   [downgrade](https://docs.voidlinux.org/xbps/advanced-usage.html#downgrading)
   glibc,
- or mount the system's root partition in a live environment,
   [chroot](https://docs.voidlinux.org/config/containers-and-vms/chroot.html#chroot-usage)
   into it, and install `libxcrypt-compat`

Either of these steps should allow you to access your system as normal and run a
full update.

To ensure the disastrous partial upgrade (described above) cannot happen,
`glibc-2.38_3` now depends on `libxcrypt-compat`. With this change, it is safe
to perform partial upgrades that include glibc 2.38.
