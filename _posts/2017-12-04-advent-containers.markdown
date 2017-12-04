---
layout: post
title: "The Advent of Void: Day 3: containers"
comments: true
---

Today we introduce [containers](https://github.com/arachsys/containers) a small suite of tools to create and run programs in "containers" using linux namespaces.

The `containers` package leverages the same kernel features as Docker and LXC, but those pieces of software are large and provide many features not directly related to container technology itself. `containers` only does the bare minimum.

`containers` comes with three tools: `contain`, `pseudo` and `inject`.

`contain` handles the details of running `init` (or `/bin/sh` if no init is specified). Inside its container, `contain` is the computer, much like the lxc or docker daemons.

`pseudo` uses `CLONE_NEWUSER` to create a `user namespace` which makes it possible to map UIDs and GIDs from inside the namespaces to real UIDs and GIDs outside the namespace.

`inject` is used to run a new programm in a running container, like spawning a shell to configure the container form inside.

To setup a small void container we run `xbps-install` with `pseudo` to populate a directory with a base system where files that are usually owned by root are owned by our user outside the namespace. Inside the namespace they will appear as if those files are owned by root.

```
$ pseudo xbps-install -R https://repo.voidlinux.eu/current/ -MSr /tmp/void base-voidst
[*] Updating `https://repo.voidlinux.eu/current//armv7l-repodata' ...
armv7l-repodata: 1140KB [avg rate: 9126MB/s]
`https://repo.voidlinux.eu/current/' repository has been RSA signed by "Void Linux"
Fingerprint: 60:ae:0c:d6:f0:95:17:80:bc:93:46:7a:89:af:a3:2d
Do you want to import this public key? [Y/n] y

Name            Action    Version           New version            Download size
xbps-triggers   install   -                 0.102_3                8116B
base-files      install   -                 0.139_9                51KB
ncurses-base    install   -                 6.0_2                  23KB
glibc           install   -                 2.26_3                 6187KB
[...]
you want to continue? [Y/n]
[*] Downloading binary packages
[...]
[*] Verifying package integrity
[...]
[*] Running transaction tasks
[...]
[*] Configuring unpacked packages
[...]
92 downloaded, 92 installed, 0 updated, 92 configured, 0 removed.
```

With the populated root directory we can already use contain to run a shell inside our container.

```
$ id
uid=1000([...]) gid=1000([...]) groups=[...]
$ contain /tmp/void/
# id
uid=0(root) gid=0(root) groups=0(root)
```

Before we "boot" the void container, we disable the agetty services, because we don't need them and they would just restart in a loop, because the ttys are not available.

```
$ rm /tmp/void/etc/runit/runsvdir/default/agetty*
```

Now we can copy our hosts `/etc/resolv.conf` into the containers root simplify the setup.
To share the host network unprivileged with the container we can use the `-n` flag.
By default contain runs a shell inside of the container, to "boot" the container we specify `/bin/init`.

```
$ cp /etc/resolv.conf /tmp/void/etc/
$ contain -n /tmp/void/ /bin/init
- runit: $Id: 25da3b86f7bed4038b8a039d2f8e8c9bbcf0822b $: booting.
- runit: enter stage: /etc/runit/1
=> Welcome to Void!
=> Mounting pseudo-filesystems...
mount: /sys: permission denied.
mount: /sys/kernel/security: mount point does not exist.
=> Initializing random seed...
=> Setting up loopback interface...
RTNETLINK answers: Operation not permitted
=> Setting up hostname to 'void-live'...
/etc/runit/1: 13: /etc/runit/core-services/05-misc.sh: cannot create /proc/sys/kernel/hostname: Permission denied
=> Loading sysctl(8) settings...
* Applying /usr/lib/sysctl.d/void.conf ...
sysctl: permission denied on key 'kernel.core_uses_pid'
sysctl: permission denied on key 'fs.protected_hardlinks'
sysctl: permission denied on key 'fs.protected_symlinks'
sysctl: permission denied on key 'kernel.kptr_restrict'
sysctl: permission denied on key 'kernel.dmesg_restrict'
sysctl: permission denied on key 'kernel.perf_event_paranoid'
sysctl: cannot stat /proc/sys/kernel/kexec_load_disabled: No such file or directory
sysctl: cannot stat /proc/sys/kernel/yama/ptrace_scope: No such file or directory
* Applying /etc/sysctl.conf ...
install: cannot change ownership of '/run/utmp': Invalid argument
dmesg: read kernel buffer failed: Operation not permitted
=> Initialization complete, running stage 2...
- runit: leave stage: /etc/runit/1
- runit: enter stage: /etc/runit/2
runsvchdir: default: current.
```

While the container is running we can use the `inject` tool to enter the namespace.

```
$ sudo inject $(pgrep contain) /bin/bash
bash-4.4# id
uid=0(root) gid=0(root) groups=0(root)
bash-4.4# ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether de:ad:be:ef:de:ad brd ff:ff:ff:ff:ff:ff
bash-4.4# sv s /var/service/*
run: /var/service/udevd: (pid 41) 61s
bash-4.4# xbps-install -Su
[*] Updating `https://repo.voidlinux.eu/current/armv7l-repodata' ...
bash-4.4# ps auxf
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        43  0.0  0.2   3136  2556 ?        S    16:43   0:00 /bin/bash
root        48  0.0  0.1   2776  1604 ?        R+   16:45   0:00  \_ ps auxf
root         1  0.0  0.0    668     4 console  Ss+  16:42   0:00 runit
root        34  0.0  0.0   1788   180 ?        Ss   16:42   0:00 runsvdir -P /run/runit/runsvdir/current log: ......
root        40  0.0  0.0   1648   192 ?        Ss   16:42   0:00  \_ runsv udevd
root        41  0.0  0.2  10476  2060 ?        S    16:42   0:00      \_ udevd
```

The functionality of `contain` can be further extended with two flags: `-i` to run a program inside of the namespace and `-o` to run a program outside of the namespace.

As example we can use the `-i` flag to bind mount a directory into the namespace

```
$ contain -i "mkdir data; mount --bind $(pwd) data" -n /tmp/void/ /bin/init
[...]
$ sudo inject $(pgrep contain) /bin/bash
bash-4.4# ls /data/
hello  world
bash-4.4#
```

Instead of passing the shell commands to `-i` and `-o` you can create scripts to prepare your containers.
The scripts can mount filesystems, setup virtual network interfaces and more.
