---
layout: post
title: "The Advent of Void: Day 9: zutils"
comments: true
---

We often deal with compressed files, and these days there quite a few
popular formats, e.g. gzip, bzip2, and xz.

When we deal with mixed formats, standard tools quickly get messy:

```
% date | gzip > date.gz
% date | bzip2 > date.bz2   
% date | xz > date.xz      
% zcat date.*

gzip: date.bz2: not in gzip format
Sat Dec  9 18:37:12 CET 2017

gzip: date.xz: not in gzip format
% xzcat date.* 
xzcat: date.bz2: File format not recognized
xzcat: date.gz: File format not recognized
Sat Dec  9 18:37:24 CET 2017
% bzcat date.* 
Sat Dec  9 18:37:20 CET 2017
bzcat: date.gz is not a bzip2 file.
bzcat: date.xz is not a bzip2 file.
```

Luckily, there are the `zutils`, which provide some compression-aware
general purpose Unix tools.  In Void Linux, they use a capital `Z` as
command prefix, to avoid name clashes.

[Zcat(1)](https://man.voidlinux.eu/Zcat.1) will decompress all
supported file formats on the fly:

```
% Zcat date.*
Sat Dec  9 18:37:20 CET 2017
Sat Dec  9 18:37:12 CET 2017
Sat Dec  9 18:37:24 CET 2017
```

Very useful is [Zgrep(1)](https://man.voidlinux.eu/Zgrep.1) to search
in compressed files:

```
% Zgrep :2. date.*
date.bz2:Sat Dec  9 18:37:20 CET 2017
date.xz:Sat Dec  9 18:37:24 CET 2017
```

In contrast to the [zgrep(1)](https://man.voidlinux.eu/zcat.1) script
of `gzip`, it supports the `-r` flag to recurse into directories,
which is very useful if you want to search in all files in `/var/log`
for example.

`zutils` also contains [Zcmp(1)](https://man.voidlinux.eu/Zcmp.1) and
[Zdiff(1)](https://man.voidlinux.eu/Zdiff.1) to compare files to each
other, and [Ztest](https://man.voidlinux.eu/Ztest.1) to verify files
are not corrupted.
