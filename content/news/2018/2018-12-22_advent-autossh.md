+++
title="The Advent of Void: Day 22: autossh"
date=2018-12-22
+++

SSH. The very use of the acronym screams "Knows which end of the computer
needs to be plugged in." It can be used to confirm your computers are working,
to transfer files (two ways!), as a SOCKS proxy (didn't know this? Go read the
man page, option `-D`, it's brilliant), and even as a poor man's VPN.

Poor man's VPN?

Well, I have a computer that lives behind a firewall. I can't adjust the
firewall. But I want to use that computer. Legally, mark you, I have permission
from the network owners, it's just not practical to adjust the firewall.

What to do?

Well, set up an ssh tunnel of course! In this case, `localhost` is the target
computer, and the other hostname is a place I can access more readily than
`localhost`.

```
$ ssh -NR $portA:localhost:22 nbis.gov
```

But problems. My local network isn't the best, and sometimes when there is a
power outage my computer comes up first. I could just create a runit service
to make sure the ssh connection is running.... and I did, for a while, but
when it failed it failed very badly.  Finally, I settled on `autossh`. What
does `autossh` do? Automatically runs an SSH command. You can configure a lot
about how it does this, how many times it tries, how long it waits between
tries, what the backoffs are, everything like that. So, I combined the best
of both worlds: autossh (which should never crash) wrapped in a user service
with runit (which should always remember to start autossh)

```
#!/bin/sh
[ -r ./conf ] && . ./conf
: ${portA:=2222}
: ${targetHost:=localhost}
exec autossh -M 0 -NR ${portA}:localhost:22 $targetHost
```

And my problem is (mostly) solved! So, in summary: SSH is an amazing tool, and
`autossh` helps you keep your ssh tunnels alive.

One point about configuration, from the manpage:

```
Other than the flag to set the connection monitoring port, autossh uses
environment variables to control features. ssh seems to be still
collecting letters for options, and this seems the easiest way to avoid
collisions.
```

and there are 13 environment variables right now, so plenty you can choose to
configure.

For more information, examples, and to see the list of relevant environment
variables, please read the
[autossh(1) manpage](https://man.voidlinux.org/1/autossh).
