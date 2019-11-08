+++
title="Mesa update to 10.0 and Software OpenGL"
date=2013-12-02
+++

The Mesa package (along with its subpackages) has been updated to 10.0. This provides
us the latest and greatest DRI support for the opensource graphics drivers in the
Linux kernel.

One notable difference in this update for Void is that support for software OpenGL
won't be installed by default anymore as part of the `xorg` meta-pkg;
users wishing to have this functionality must install the `mesa-swraster-dri` package:

```
# xbps-install -Sy mesa-swraster-dri
```

Or if it's already installed, change its `installation type` to `manual` to
keep it permanently:

```
# xbps-pkgdb -m manual mesa-swraster-dri
```

> Please note that after upgrading your system, the `mesa-swraster-dri` package
will be detected as orphan (unless it was previously installed manually),
and it must be explicited changed to `manual` installation mode to keep it.
