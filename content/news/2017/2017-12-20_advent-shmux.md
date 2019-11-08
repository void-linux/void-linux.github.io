+++
title="The Advent of Void: Day 20: shmux"
date=2017-12-20
+++

When you have multiple machines, sometimes you'll want to run the same
commands on all of them.  There are many tools for this job, starting
from simple `for` loops on the shell to full-fledged configuration
management systems such as Puppet or Chef.

A good compromise is [shmux(1)](https://man.voidlinux.eu/shmux.1), the
*shell multiplexer*.

For example, we can measure the uptimes of my servers,
passing the command with `-c`:

```
% shmux -c uptime vuxu.org root@epona.vuxu.org hecate.home.vuxu.org
            vuxu.org:  15:48:01 up 91 days,  6:05, 45 users,  load average: 0.55, 0.47, 0.40
 root@epona.vuxu.org:  15:48:07 up 502 days, 19:29,  1 user,  load average: 0.37, 0.29, 0.29
hecate.home.vuxu.org:  15:48:03 up 225 days,  5:51,  2 users,  load average: 0.06, 0.03, 0.05

3 targets processed in 2 seconds.
Summary: 3 successes
```

shmux is quite clever about this, e.g. if we do a mistake and the
command fails, it stops and asks us what to do:

```
shmux -c oopstime localhost vuxu.org root@epona.vuxu.org hecate.home.vuxu.org
           localhost! zsh:1: command not found: oopstime
               shmux! Child for localhost exited with status 127
-- [PAUSED], 3 Pending/0 Failed/1 Done -- [1.7, 1.8]
?
>> Available commands:
>>       q - Quit gracefully
>>       Q - Quit immediately
>> <space> - Pause (e.g. Do not spawn any more children)
>>       1 - Spawn one command, and pause if unsuccessful
>> <enter> - Keep spawning commands until one fails
>>       + - Always spawn more commands, even if some fail
>>       F - Toggle failure mode to "quit"
>>       S - Show current spawn strategy
>>       p - Show pending targets
>>       r - Show running targets
>>       f - Show failed targets
>>       e - Show targets with errors
>>       s - Show successful targets
>>       a - Show status of all targets
>>       k - Kill a target
a
>>  [0]             error: localhost
>>  [1]           pending: vuxu.org
>>  [2]           pending: root@epona.vuxu.org
>>  [3]           pending: hecate.home.vuxu.org
Q

1 target processed (out of 4) in 89 seconds.
Summary: 3 unprocessed, 1 error
Error    : localhost 
```

Commands can be spawned in parallel when using `-M max`.
By default, shmux spawns the first command on its own, to check it early.

Let's say we want to keep the outputs, so we use `-o`:

```
% shmux -M10 -o uptimes -c uptime localhost vuxu.org root@epona.vuxu.org hecate.home.vuxu.org
...
% ls uptimes 
 hecate.home.vuxu.org.exit    'root@epona.vuxu.org.exit'
 hecate.home.vuxu.org.stderr  'root@epona.vuxu.org.stderr'
 hecate.home.vuxu.org.stdout  'root@epona.vuxu.org.stdout'
 localhost.exit		       vuxu.org.exit
 localhost.stderr	       vuxu.org.stderr
 localhost.stdout	       vuxu.org.stdout
```

Finally, the `-a` and `-A` options can be used to define
*analyzers* for the outputs, so see if everything worked fine.

```
% shmux -o uptimes -a regex -A up  -c uptime ...
```

shmux is a useful tool for adhoc command execution as it requires no
configuration and has sensible defaults.
