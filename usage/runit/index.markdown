---
layout: std
title: Enter the void - runit
---

# Overview

### Design

runit is a suite of tools which include a unix init (PID1) as well as a
daemontools-compatible process supervision framework, along with utilities
which streamline creation and maintenance of services.

#### Example Process Tree

Example of a basic running system with runit as PID 1

```
# pstree -a
runit
  `-runsvdir -P /run/runit/runsvdir/current...
      |-runsv agetty-console
      |   `-agetty console 38400 linux
      |-runsv dhcpcd-eth0
      |   `-dhcpcd -B eth0
      |-runsv sshd
      |   `-sshd -D
      |-runsv agetty-tty1
      |   `-agetty --noclear tty1 38400 linux
      |-runsv agetty-tty2
      |   `-agetty tty2 38400 linux
      |-runsv agetty-tty3
      |   `-agetty tty3 38400 linux
      |-runsv agetty-tty4
      |   `-agetty tty4 38400 linux
      |-runsv agetty-tty5
      |   `-agetty tty5 38400 linux
      |-runsv agetty-tty6
      |   `-agetty tty6 38400 linux
      `-runsv udevd
          `-udevd
```

Note how each service is managed by its own runsv process, further explanation below.

### Framework

runit employes a concept of a service directory, responsible for an individual service,
which is a process to monitor and an optional log service.

#### void runit directories

- /var/service - always linked to the currently active runlevel
- /etc/sv - directory containing service files placed by xbps
- /etc/runit/runsvdir - directory containing all available runlevels

#### Service Directory layout

A service directory requires only one file, an executable named `run` which is expected
to exec a process in the foreground. If the service directory contains a directory named
`log`, a pipe will be opened from the output of the `run` process in the service directory
to the input of the `run` process in the `log` directory.

/etc/sv/sshd/run
```
#!/bin/sh
ssh-keygen -A >/dev/null 2>&1 # Will generate host keys if they don't already exist
[ -r conf ] && . ./conf
exec /usr/sbin/sshd -D $OPTS 2>&1
```
will run the sshd process in the foreground, making sure all output (stderr, stdout) are directed
to stdout, which will be piped to the log below.

/etc/sv/sshd/log/run
```
#!/bin/sh
[ -d /var/log/sshd ] || mkdir -p /var/log/sshd
exec chpst -u root:adm svlogd -t /var/log/sshd
```

#### User Commands

- `sv(8)` - runit utility to manage and inspect services
- `svlogd(8)` - runit logging utility
- `chpst(8)` - runit process environment manipulator
- `runsvchdir(8)` - runit "runlevel" switcher

#### System Commands

- `runit(8)` - a UNIX process number 1
- `runsvdir(8)` - starts and monitors a collection of runsv(8) processes
- `runsv(8)` - starts and monitors a service and optionally an appendant log service

# Usage

### Examples

System services require root access for most of these operations. Use `sudo(8)` with these
commands as a normal user for the desired system-level behavior.

#### Service Status

To see the status of a supervised service use `sv s <service_name>`

for example, 

`sv s sshd`

returns

`run: sshd: (pid 42) 1587s`

To see the status of all services, use `sv s /var/service/*`.

#### Stop/Start/Restart

Start a service

`sv u sshd`

Stop A service

`sv d sshd`

Restart a service

`sv t sshd`

Each of these is a shortcut, for 'up', 'down', and 'terminate', respectively. Only the first letter
of each word is recognized (see `sv(8)`).

More verbose forms of the above

`sv start sshd`

`sv stop sshd`

`sv restart sshd`

Each of these will also return the status of the service upon exit.

#### Enabling a service

void-provided service directories live in `/etc/sv`. To enable a service in the current runlevel,
create a symlink from it to `/var/service`.

`ln -s /etc/sv/sshd /var/service/`

Once a service is linked it will always start on boot and restart if it stops (unless administratively downed).

#### Disabling a service

To disable a service in the current runlevel remove the symlink to its service directory from `/var/service`.

`rm /var/service/sshd`

Removing the symlink will also stop the service.

# Run Levels

runit support an unlimited amount of run levels, implemented as directories located under `/etc/runit/runsvdir/`. The default runlevel
that ships with void is `/etc/runit/runsvdir/default`. In order to create a new runlevel, it is best to start by copying
this default and removing/adding symlinks to service directories to create the runlevel you desire.

```
cp -a /etc/runit/runsvdir/default /etc/runit/runsvdir/my_runlevel
rm /etc/runit/runsvdir/my_runlevel/agetty-tty[3456] # remove all gettys except for tty1 and tty2
ln -s /etc/sv/dcron /etc/runit/runsvdir/my_runlevel/ # add the cron service
```
To change runlevels, use the `runsvdir` command.
```
runsvdir my_runlevel
```
To make this runlevel the default runlevel, append it to your bootloader's kernel command line.

Example for grub, edit `/etc/default/grub`, adding
```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=4 my_runlevel"
```
and rebuild grub.cfg (`xbps-reconfigure -f linux-3.18.7`)

Now your default runlevel will be "my\_runlevel"

# See Also

- [sv-helper](/usage/runit/sv-helper) - Utilities to simplify building and managing runit services.
