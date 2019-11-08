+++
title="Platform naming rules have been changed"
date=2014-01-23
+++

To allow upcoming support for multiple platforms, the naming rules have been updated
to follow this convention:

 - platform-kernel <- kernel pkg used by the platform (i.e rpi-kernel)
 - platform-base <- base pkg used by the platform (i.e rpi-base)

That means that for the Raspberry Pi the `base-system` package no longer depends on
the old `kernel-rpi` package or any other platform specific package.

To successfully upgrade your rpi follow these steps:

```
# xbps-install -Syu
... [ base-system will be updated to >=0.80 ] ...

# xbps-install -Sy rpi-base
... [ rpi-base will install rpi-kernel pkg ] ...

# xbps-pkgdb -m manual rpi-base
... [ rpi-base is now the main platform pkg ] ...
```

For x86 users the `base-system` package still depends on platform specific packages
for compatibility, so you can safely ignore this post.
