+++
title="The Advent of Void: Day 17: qrencode"
date=2018-12-17
+++

[qrencode](https://fukuchi.org/works/qrencode/) is a command line QR-Code
generator.

You can generate a QRCode from an arbitrary string:

```
$ qrencode -o qrcode.png "QRCode Message"
```

This will create a new png image containing the QR-Code. You can use [feh](https://voidlinux.org/news/2018/12/advent-feh.html) to display it:

```
$ feh qrcode.png
```

If you're a terminal guy, you might dislike the window popping up. qrencode has
you covered there:

```
$ qrencode -t ansi "QRCode Message"
```

This will generate a scannable QR-Code directly on the terminal window using
ANSI escape sequences. If you'd like to avoid escape codes qrencode also
supports pure UTF-8 encoding using `-t utf8`.

```
$ qrencode -t utf8 "QRCode Message"
█████████████████████████████
█████████████████████████████
████ ▄▄▄▄▄ █▀▄█▀▄█ ▄▄▄▄▄ ████
████ █   █ █▀▄█▀██ █   █ ████
████ █▄▄▄█ █▀▀ █ █ █▄▄▄█ ████
████▄▄▄▄▄▄▄█▄█ ▀ █▄▄▄▄▄▄▄████
████▄▄ ▄▄▀▄ ▄ ▀▄▄ ▀ █▄▀ █████
████▀██▀▄ ▄▀ ██ ▄ █▀█▀▀ █████
█████▄█▄██▄█ ██▄▄▀▄ ▀█ ▀█████
████ ▄▄▄▄▄ █▄▀█   █▄█ ▀▄▀████
████ █   █ █ █▄█▄▄▄▀▀▀█▄▄████
████ █▄▄▄█ █ ▀  ▄ ▄▀█ ▀██████
████▄▄▄▄▄▄▄█▄▄▄█▄▄▄████▄█████
█████████████████████████████
█████████████████████████████
```

qrencode supports a rich set of output formats including
PNG, SVG, EPS, XPM, and even pure ASCII.

More colors? No problem! You can define custom foreground- and background colors:

```
$ qrencode -o - "QRCode Message" --foreground=00ff00 --background=0000ff | feh -
```

For more information please read the [qrcode(1)
manpage](https://man.voidlinux.org/qrencode).
