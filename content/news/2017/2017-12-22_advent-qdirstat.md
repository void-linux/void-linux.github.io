+++
title="The Advent of Void: Day 22: QDirStat"
date=2017-12-22
+++

We already covered other cleaning tools like
[ncdu](/news/2017/12/advent-ncdu.html) and probably everybody used some form of
`du -h ... | sort -h` as well, but there is another little gem I'd like you to know
about.

## QDirStat - Qt-based directory statistics (KDirStat without any KDE - from the original KDirStat author)

[QDirStat](https://github.com/shundhammer/qdirstat) uses a **treemap** to
display used disk space. 

```
# xbps-install qdirstat
```

Files are represented as little boxes. The color hints
the file type and the area covered corresponds to the file size. Then QDirStat
tries to group files within a folder into one rectangle. This is done for the
whole hierarchy. The per-folder cushion shading guides your eyes and makes it
easy to recognise related files.

![QDirStat screenshot with treemap](https://raw.githubusercontent.com/shundhammer/qdirstat/master/screenshots/QDirStat-main-win.png)

The treemap is interactive. To find what file belongs to a box, you can just
click on it. With the `Alt + ↑` shortcut, you can go one level up in the file
hierarchy. At the same time a box is painted around the whole folder.

## qdirstat-cache-writer - Collecting remote file statistics

With `qdirstat-cache-writer` (separate package, minimal dependencies) you can
collect file sizes on remote or headless machines. 

On the remote machine install the package and scan your disk with:

```
# xbps-install qdirstat-cache-writer
# qdirstat-cache-writer /path/of/interest cache-file.cache.gz
```

You can transfer the `cache-file` via ssh or any other method and just throw it
against `qdirstst` locally:

```
# scp remote:/path/to/cace-file.cache.gz .
# qdirstat --cache cache-file.cache.gz
```

You can still examine the hierarchy, but you loose the ability to run the
clean-up actions.

## Extra bits

At the time of writing QDirStat had no open issues or pull requests. I'm not
aware of any obvious bugs. It's a unique and solid tool. My disks thank Stefan
Hundhammer for his amazing work.
