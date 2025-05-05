---
title: xbps bug results in missing /bin/sh
layout: post
---

Due to a bug in xbps there was an issue this morning where /bin/sh disappeared after an update.

The bug was fixed quickly, but there's a 2h window where an update may have resulted in a broken system.

If you're affected by this issue you may experience error messages like these during boot:

```
runit: fatal: unable to start child: /etc/runit/1 file does not exist
```

These are the steps to recover your system:

#### Case 1: System is still running and you have a working shell open

Run the following command as root:

```
# xbps-install -Su
```

Afterwards your system should update xbps and recreate `/bin/sh`

#### Case 2: System has rebooted or no shell is opened anymore

Restart your system

```

                              GNU GRUB  version 2.02

  ┌────────────────────────────────────────────────────────────────────────────┐
  │*Void GNU/Linux                                                             │
  │ Advanced options for Void GNU/Linux                                        │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘

       Use the ↑ and ↓ keys to select which entry is highlighted.
       Press enter to boot the selected OS, `e' to edit the commands
       before booting or `c' for a command-line.


```
Once grub comes up, select the kernel you want to boot and press `E`.

```

                              GNU GRUB  version 2.02

  ┌────────────────────────────────────────────────────────────────────────────┐
  │          search --no-floppy --fs-uuid --set=root --hint-bios=hd0,msdos1 --\│↑
  │hint-efi=hd0,msdos1 --hint-baremetal=ahci0,msdos1  XXXXXXXX-XXXX-XXXX-XXXX-\│
  │XXXXXXXXXXXX                                                                │
  │        else                                                                │ 
  │          search --no-floppy --fs-uuid --set=root XXXXXXXX-XXXX-XXXX-XXXX-X\│ 
  │XXXXXXXXXXX                                                                 │
  │        fi                                                                  │ 
  │        echo        'Loading Linux 4.19.15_1 ...'                           │ 
  │        linux        /boot/vmlinuz-4.19.15_1 ro  loglevel=4 slub_debug=P pa\│ 
  │ge_poison=1 rd.break                                                        │
  │        echo        'Loading initial ramdisk ...'                           │ 
  │        initrd        /boot/initramfs-4.19.15_1.img                         │ 
  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘

       Minimum Emacs-like screen editing is supported. TAB lists 
       completions. Press Ctrl-x or F10 to boot, Ctrl-c or F2 for   
       a command-line or ESC to discard edits and return to the GRUB menu.


```
find the line that starts with `linux  /boot/...` and add `rd.break` at the end of the line.
Make sure it is seperated with a space from the rest of the line

Afterwards Press `Ctrl` + `X` to boot the configuration.

```
  Dropping to debug shell.

  dracut:/#
```
Once you've got a shell execute the following commands:

```
  dracut:/# mount -o remount,rw /sysroot
  dracut:/# chroot /sysroot xbps-alternatives -s bash
  dracut:/# exit
```

Afterwards the system should work as expected.

Please use `xbps-install -Su` to fetch the newest xbps version that fixes this bug.

### If it doesn't help

Join over on #voidlinux in freenode or [ask on reddit](https://www.reddit.com/r/voidlinux/comments/cpslmr/xbps_bug_results_in_missing_binsh/).
