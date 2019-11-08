+++
title="The Advent of Void: Day 2: sshfs"
date=2018-12-02
+++

[sshfs(1)](https://man.voidlinux.org/sshfs) is a fuse filesystem that mounts
a remote directory into the local filesytem. It uses the secure [sftp
protocol](https://man.voidlinux.org/sftp-server).

On Void you'll find sshfs in the fuse-sshfs packages. It can be installed using
the following command:

```
xbps-install -S fuse-sshfs
```

Once it is installed the only requirement on the remote site is a running
[ssh daemon](https://man.voidlinux.org/sshd.8) with sftp support. To mount
remotes /home/void on the local box make sure you have the target directory
owned by the mounting user and call the following command:

```
$ sshfs void@voidlinux.org:/home/void /tmp/mnt
```

Depending on your ssh setup you may be prompted for authentication. Once the
connection is established you can access the remote folder just like any local
directory:

```bash
$ cd /tmp/mnt
$ ls
GNU_Manifesto.txt  NSA_Backdoor_contract.pdf  rockyou.txt
```

To unmount the filesystem you can use the `fusermount` tool:

```
$ fusermount -u /tmp/mnt
```

If you like to use sshfs with `/etc/fstab` it's easy to do with Void:

```
sshfs#bkp@bkp.a-server.ninja:/media/store1/bkp /backup fuse defaults,allow_other,reconnect,delay_connect 0 0
```

For Void the option `delay_connect` is strongly recommended. It will delay
establishing the connection to the point when the filesystem is accessed. This
prevents mount errors in case the network hasn't been set up when the
filesystem is mounted.

Also make sure you're allowed to login without a prompt as you're not able to
enter it.

For more information about sshfs consult the [sshfs
manpage](https://man.voidlinux.org/sshfs).
