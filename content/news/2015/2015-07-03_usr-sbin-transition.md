+++
title="/usr/sbin as symlink transition completed"
date=2015-07-03
+++

The `/usr/sbin` as symlink conversion was successfully completed some weeks ago.
That means that void now contains just a single directory to store all executables:
`/usr/bin`. `/bin`, `/sbin` and `/usr/sbin` are symlinks to `/usr/bin`.

This has some advantages because all applications will find the executables on any
`PATH`, without rebuilding any package to change its location.

If your system still contains a `/usr/sbin` directory, upgrade your system with
`xbps-install -Syuv` and then make sure that `/usr/sbin` only contains symlinks.

After rebooting `runit-void` will move the existing `/usr/sbin` directory to `/usr/sbin.old`
and will create the `/usr/sbin` symlink.

> **NOTE** the images from `20150615` have `/usr/sbin` as a symlink already, so that you
don't have to do anything.
