+++
title="Upgrading to base-files-0.76"
date=2012-10-05
+++

This package now owns some files in /etc that didn't have any owner, as follows:

```
/etc/fstab
/etc/crypttab
/etc/passwd
/etc/group
```

Both */etc/fstab* and */etc/crypttab* are empty files with some comments. The */etc/passwd* file does not contain any change compared to the file the **shadow** pkg created by default. Some changes were made to */etc/group*:

  * The *usb* group (gid 15) has been removed (unused).
  * The *plugdev* group (gid 21) has been removed (unused).
  * The *adm* group has been added (gid 15). Users of that group can review the systemd journal.
 
Make sure to backup these files before upgrading to **base-files-0.76** and merge your changes back in.
> Don't forget to execute pwconv(8) and grpconv(8) after merging the changes to */etc/passwd* and */etc/group*.
