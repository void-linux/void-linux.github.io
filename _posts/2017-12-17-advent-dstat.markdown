---
layout: post
title: "The Advent of Void: Day 16: dstat"
comments: true
---

There are many ways to see what's going on your system, such as
[top(1)](https://man.voidlinux.eu/top.1),
[htop(1)](https://man.voidlinux.eu/htop.1),
[atop(1)](https://man.voidlinux.eu/atop.1).  However, these tools only
show the current state of the system, and it's not so easy to see how
the data changes.

[dstat(1)](https://man.voidlinux.eu/dstat.1) works differently: it
prints a line every second with some system stats you can configure.
By default, it shows CPU usage, disk I/O, network traffic, paging,
and context switches:

```
% dstat
You did not select any stats, using -cdngy by default.
--total-cpu-usage-- -dsk/total- -net/total- ---paging-- ---system--
usr sys idl wai stl| read  writ| recv  send|  in   out | int   csw 
 45   9  45   1   0| 284k  181k|   0     0 |  18k   36k| 754  2181 
 28   6  65   1   0|   0     0 |4698k  222k|   0     0 |4123    17k
 34   8  58   0   0|   0     0 |4730k  220k|   0     0 |5253    20k
 29   8  62   1   0|4096B 1080k|4640k  215k|   0     0 |4383    18k
 37   7  38  17   0|   0    15M|4844k  219k|   0     0 |5532    21k
 31   8  30  32   0| 336k 6840k|5153k  232k|   0     0 |4383    17k
...
```

For Void development, I like to run this configuration;
showing per-core CPU usage, memory usage, process spawn rate and I/O.

```
% dstat --cpu-use -mpr
---------per-cpu-usage--------- ------memory-usage----- ---procs--- --io/total-
 0   1   2   3   4   5   6   7 | used  free  buff  cach|run blk new| read  writ
  4   2   1   1   1   1   1   1| 550M 2510M 2823M 1315M|  0   0 4.4|6.42  0.93 
  1   0   0   0   0   1   0   0| 550M 2510M 2823M 1315M|  0   0 1.0|   0     0 
  2   2   1   1   0   0   0   1| 551M 2508M 2823M 1315M|  0   0  20|   0     0 
  1   0   0   0   0   0   0   0| 551M 2508M 2823M 1315M|  0   0   0|   0     0 
  0   0   0   0   0   0   0   0| 551M 2509M 2823M 1315M|  0   0   0|   0     0 
  2   0   0   0   0   1   0   0| 551M 2509M 2823M 1315M|  0   0   0|   0     0 
```

This allows us to easily detect if builds are not optimally parallelized,
or whether we run into memory limits.
And process spawn rate detects if a `./configure` script runs. ;)

dstat includes a huge list of probes it can display,
just to list a few: battery usage, free disk, MySQL/InnoDB stats,
qmail queue size, NFS traffic, NTP stats, WiFi measurements,
ZFS information.

It's a very versatile tool, and because it works via the console, you
can also easily run it over SSH.
