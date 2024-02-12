---
layout: post
title: "The Advent of Void: Day 7: mosh"
comments: true
---

Accessing a remote server over an unstable or high latency connection ... can
be ... a tedious ``CONNECTION TIMEOUT`` ... ``RECONNECT`` task.

[mosh(1)](https://man.voidlinux.eu/mosh.1) stands for MObile SHell and provides
a reliable command line connection that outlives network outages and roaming
between different networks.

The usage of mosh is pretty easy. On un-firewalled hosts just make sure the
remote server runs an [sshd(8)](https://man.voidlinux.eu/sshd) deamon and
has mosh installed. Then connecting to the server is as easy as:

```
# mosh username@server
```

The initial handshake is done through an SSH connection. Once the UDP
connection is prepared, the SSH connection is closed.
The exact protocol design is described in the
[mosh research paper](https://mosh.org/mosh-paper.pdf)

On firewalled systems you need to make sure that the UDP ports between
60000 and 61000 are not filtered as mosh uses a random port in this range.

Once the connection is established feel free to disconnect you rig from the
network, change IP addresses, move to another wifi, etc. You'll see that mosh
automaticly reconnects and updates the state of the terminal as long as the
used UPD-Port is available.

Find more information about mosh on its [homepage](https://mosh.org/).