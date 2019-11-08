+++
title="The Advent of Void: Day 3: ncdu"
date=2018-12-03
+++

Even though disks are large and cheap, its still very nice to be able
to track down what is using disk space in a graphical way.  While
there are many nice tools that do this for desktops, if you're on a
server or otherwise a remote connection, you'll need a text-mode tool.
This is where [ncdu(1)](https://man.voidlinux.org/ncdu) comes in.

When launched `ncdu` scans the directories below the current working
directory and displays an output of the relative filesizes.

```
ncdu 1.13 ~ Use the arrow keys to navigate, press ? for help
--- /home/maldridge/Desktop/advent/ncdu ----------------------------------------
  777.0 MiB [##########]  hack3r5.divx
   24.0 MiB [          ]  plan_for_world_domination.tex
    8.0 MiB [          ] /secret_keys


 Total disk usage: 809.0 MiB  Apparent size: 809.0 MiB  Items: 4
```

Navigation is straight forward and the tree is very responsive since
all the sizes are scanned at startup.

You can even delete files by pressing `d` while hovering on the file
to delete:

```
ncdu 1.13 ~ Use the arrow keys to navigate, press ? for help
--- /home/┌───Confirm delete─────────────────────────────────────────┐----------
          │ Are you sure you want to delete "backdoor.key"?          │
    8.0 Mi│                                                          │
          │                                                          │
          │              yes      no     don't ask me again          │
          └──────────────────────────────────────────────────────────┘
 Total disk usage:   8.0 MiB  Apparent size:   8.0 MiB  Items: 1
```
