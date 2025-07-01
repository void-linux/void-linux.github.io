---
layout: post
title: "The Advent of Void: Day 13: ncdu"
comments: true
---

On day 13 of the Advent of Void, you realize your disk is quite full.
How can we find the space wasters?

On the command line, we have [du(1)](https://man.voidlinux/du.1) of
course, which recursively lists all files and aggregates sizes for
directories.  But for a big disk, this results in a long, unwieldy and
unfathomable list.

[ncdu(1)](https://man.voidlinux.eu/ncdu.1) to the rescue!
This ncurses program will display the disk usage data as a
[nice menu](https://dev.yorhel.nl/ncdu/scr)
that you can browse interactively; sorted by size of course.

ncdu makes finding big files in the depths of your directories easy,
and it also provides help with cleaning up: the shortcut to delete a
file or directory is just a keypress away (use `-r` for read-only mode
if that idea scares you).

Finally, ncdu also provides a few options to restrict the file list to
the current filesystem, or exclude caches and files with certain
filenames.
