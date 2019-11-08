+++
title="New group from base-files 0.92"
date=2013-10-30
+++

Starting with `base-files-0.92` a new group `xbuilder` with `gid 101` has been added
to the default `/etc/group` file.

If you are upgrading make sure to add this group manually to that file:

```
# echo 'xbuilder:x:101:' >> /etc/group
# grpconv
```

This group is now required to build packages with `xbps-src` so don't forget also to make your user a member of that group, i.e:

```
$ usermod -a -G xbuilder <user>
```

and rebuild from scratch your `masterdir`:

```
$ xbps-src zap; xbps-src binary-bootstrap
```
