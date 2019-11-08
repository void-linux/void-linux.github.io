+++
title="The Advent of Void: Day 7: scrot"
date=2018-12-07
+++

[scrot(1)](https://man.voidlinux.org/scrot) is a tool for taking screenshots on
[XWindow](https://x.org) systems.

The simplest way to create a screenshot from your desktop is to call the
program without arguments

```bash
$ scrot
$ ls
2018-12-07-114552_3200x1800_scrot.png
```

This creates a timestamped png file covering the whole desktop.

scrot allows you to define a target filename as last argument:

```bash
$ scrot awesome_screenshot.png
$ ls
awesome_screenshot.png
```

This creates `awesome_screenshot.png` instead of an autocreated filename

To screenshot a single window you can either use `-s` to select the window with
the mouse or `-u` to screenshot the currently focused one. For `-u` it might be
useful to also apply `-d 2` to get 2 seconds to focus the desired window.

```bash
$ scrot -s
$ ls
2018-12-07-115330_1444x952_scrot.png
```

If you like to learn more about scrot, please consider reading the
[manpage](https://man.voidlinux.org/scrot).
