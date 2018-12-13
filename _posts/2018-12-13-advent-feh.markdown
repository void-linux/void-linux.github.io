---
layout: post
title: "The Advent of Void: Day 13: feh"
comments: true
---

Sometimes you just want to view an image and do so quickly.  Using a
full desktop image viewing package may be too slow or too cumbersome,
or if you're in a minimalist environment might bring in too many extra
packages.

In these cases, `feh` is the ideal tool for the job.  This simple
image viewer understands most common formats and can be called from
the command line.

For example:

```
$ feh imgs/security_architecture_unredacted.png
```

Its really that simple!  Just pass a single file or a directory to the
command and it will display in a new window.

Displaying images isn't all that feh can do though, you can also use
it to set desktop wallpaper in a window manager only environment.  In
this use case, most users will find the `--bg-scale` option to be the
appropriate choice as it will preserve the aspect ratio of the images
used.  There are other options as well, and these can be found in the
man page.

Once used once to set the desktop wallpaper, feh will write a script
'.fehbg' to your home folder which can subsequently be called to set
the wallpaper.  This script is suitable to add to startup scripts or
other initialization mechanisms so that you always have your favorite
wallpaper after logging in.

Whether its quickly looking at images from the command line, showing a
slideshow of vacation pictures, or setting the desktop wallpaper,
`feh` is a must have utility for speedy image handling!
