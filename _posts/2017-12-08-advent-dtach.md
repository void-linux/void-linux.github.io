---
layout: post
title: "The Advent of Void: Day 8: dtach"
comments: true
---

dtach is a tool that helps detaching and reattaching terminal sessions. It's
kinda similiar to screen or tmux in that regard. Nevertheless, in comparision
dtach is rather minimal and does not support multiple windows, split screen,
or similiar. It just opens a shell, allows to move it to the background and reattach it from another session.

A common task is to run your IRC session in a dtach session. This allows to
detach one session, switch the network and reattach from a new ssh session. To
start a new session with irssi type:

```
# dtach -c /tmp/dtach.irssi /usr/bin/irssi
```

This opens a new session on the socket `/tmp/dtach.irssi` and starts irssi in
it.

To detach the session you can press `Ctrl` + `\`. This ends the client session. To reattach the session, use the following command:

```
# dtach -a /tmp/dtach.irssi
```

It's also possible to use dtach for poor mans automatisation: Using
`dtach -p /tmp/dtach.irssi` you can send arbitrary text input to the session.
This is a great way of building shell shortcuts to run commands in a specific
session from another terminal.

For more information have a look at the [dtach website](http://dtach.sourceforge.net/)
