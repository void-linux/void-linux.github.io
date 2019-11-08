+++
title="The Advent of Void: Day 21: neatvi"
date=2017-12-21
+++

On Void, we have many clones of beloved
[vi(1)](https://man.voidlinux.eu/vi.1p) such as
[vim](https://man.voidlinux.eu/vim.1),
[neovim](https://man.voidlinux.eu/nvim.1),
[nvi](https://man.voidlinux.eu/nvi.1),
[vile](https://man.voidlinux.eu/vile.1), busybox vi, and of course the
original [ex-vi](https://man.voidlinux.eu/ex-vi.1).

But today, I want to talk about
[neatvi](https://github.com/aligrudi/neatvi), a reimplementation from
scratch with minimal footprint (fewer than 6kLOC); it doesn't even
need ncurses!  Nevertheless, it supports UTF-8, and even editing
bidirectional text, and generally has a good coverage of the POSIX vi
feature set.

Of course, it doesn't provide all the bells and whistles
of vim and friends,
but it adds a few important features on top of plain vi,
such as
infinite undo/redo, basic syntax highlighting,
and a partial implementation of [ex(1)](https://man.voidlinux.eu/ex.1p).

It's a nice editor for limited environments such as embedded devices
or recovery systems, or for people that like unbloated software.
