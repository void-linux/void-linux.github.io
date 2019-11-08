+++
title="The Advent of Void: Day 10: dvtm"
date=2017-12-10
+++

You know window managers, right? Like tiled window managers. There are plenty of them. But did you know that there's a tiled window manager for the shell?



```
[1][2][3][4][5][]=[                                                           ]
──[#1]─────────────────────────────────┬──[#2]─────────────────────────────────
  1 text.txt                           │#
  2                                    │
  3 :Author: tox                       │
  4 :Email: tox@rootkit                │
  5 :Date: 2017-12-07 14:07            │
  6                                    │
  7                                    │
~                                      │
~                                      │
~                                      ├──[#3]─────────────────────────────────
~                                      │# echo Hello
~                                      │Hello
~                                      │#
~                                      │
~                                      │
~                                      │
~                                      │
~                                      │
~                                      │
                     7,0-1         All │
```



[dvtm(1)](https://man.voidlinux.eu/dvtm.1) helps you to organize multiple shells
within the same screen without relying on such n00p-software as any form of
graphical user interface.

To start a new instance of dvtm, just run `dvtm`. Let me give a little
explaination of the terms first:

* Window: a pseudo terminal in dvtm.
* Tag: A tag is a marker on the window. It's a number between 1 and 9.
* View: a set tags that define which windows are shown.

Once you started `dvtm` you can open a new window by typing `Ctrl`+`G`, which is
the modifier combination followed by `C`. Cycling through the windows is done
by the modifier combination follower by `J` for the next window or `K` for the
previous one.

dvtm supports tagging like dwm does. You may apply a tag to the selected window
by pressing the modifier combination followed by `T` followed by the tag digit.
This removes all other tags from the window.
To toggle a single tag without changing other tags, use `Shift`+`T`.

To switch your view to another tag you can use the modifier combination followed
by `V` followed by the tag digit.

There are a lot more features in dvtm. You may read about them on the
[dvtm website](http://www.brain-dump.org/projects/dvtm/#quickstart)
or the [manpage](https://man.voidlinux.eu/dvtm.1)
