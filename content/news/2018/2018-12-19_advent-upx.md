+++
title="The Advent of Void: Day 19: upx"
date=2018-12-19
+++

Code golf is trying to solve a problem in the fewest lines of code.  I
like to think there's a similar thing for trying to build a complete
working system in the fewest number of bytes.  You can get pretty far
using projects like busybox to replace large parts of the system with
a single binary that provides shared functionality, but to get the
last bit of the way, its often necessary to shrink the remaining
binaries as well.  That's where `upx` comes in.

The Ultimate Packer for eXecutables does exactly what its name
implies.  It packs executables to make them smaller.  This is done
with compression which is undone on the fly when a binary is called.

Lets look at a quick example:

```
$ ls -lh
total 128K
-rwxr-xr-x 1 maldridge maldridge 127K Dec 19 00:03 ls
```

This is the  standard `ls` that ships with Void  and is already pretty
small.  Lets make it smaller!

```
$ upx ls
                       Ultimate Packer for eXecutables
                          Copyright (C) 1996 - 2018
UPX 3.95        Markus Oberhumer, Laszlo Molnar & John Reiser   Aug 26th 2018

        File size         Ratio      Format      Name
   --------------------   ------   -----------   -----------
    129760 ->     60624   46.72%   linux/amd64   ls

Packed 1 file.
```

As you can see, the file is now only 60k in size.  A pretty good
start!

Lets take a look now at a Go executable.  Go is known for generating
large binaries and `upx` can help shrink them down to size.

For this example we'll use the `netauthd` binary which forms part of
Void's server authentication system.

```
$ ls -lh
total 17M
-rwxr-xr-x 1 maldridge maldridge 17M Dec 19 00:08 netauthd
```

We can get part of the way there by stripping symbols out of the
binary, since Go builds those in by default:

```
$ strip netauthd
$ ls -lh
total 13M
-rwxr-xr-x 1 maldridge maldridge 13M Dec 19 00:10 netauthd
```

Now to see how much further `upx` can get us:

```
$ upx netauthd
                       Ultimate Packer for eXecutables
                          Copyright (C) 1996 - 2018
UPX 3.95        Markus Oberhumer, Laszlo Molnar & John Reiser   Aug 26th 2018

        File size         Ratio      Format      Name
   --------------------   ------   -----------   -----------
  12724112 ->   4714692   37.05%   linux/amd64   netauthd

Packed 1 file.
```

The netauthd file is now just 4.5M, quite a bit smaller than the 17M
starting size.

UPX can be a great tool to keep in your embedded toolbox, just
remember not to run it on files owned by the package manager!
