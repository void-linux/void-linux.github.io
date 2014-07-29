---
layout: post
title: "runit enabled by default"
comments: true
---

The [runit](http://smarden.org/runit/) init system is now enabled by default,
replacing [systemd](http://www.freedesktop.org/wiki/Software/systemd/) in the
base system.

*runit* is small, portable and perfect for our needs. *systemd* is still being
supported *optionally* and can be installed via the *base-system-systemd* package.

After upgrading you'll have to customize system settings in the `/etc/rc.conf`
configuration file; see [this wiki page](https://github.com/voidlinux/documentation/wiki/runit)
for more information.

All images have been switched to *runit*. If you are using a *Desktop Environment*
such as *GNOME*, you might want to put some packages *on hold* and rebuild packages
that need *systemd* with the *systemd* package build option enabled:

```
## This makes base-system-systemd the preferred base-system pkg.

# xbps-install -S
# xbps-install -y base-system-systemd
```

```
## This enables the systemd build option globally for all supported pkgs.

$ cd xbps-packages
$ cat XBPS_PKG_OPTIONS=systemd >> etc/conf
$ ./xbps-src show-sys-updates
...
```

Enjoy!
