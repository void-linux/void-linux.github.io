---
layout: post
title: "The Advent of Void: Day 19: mblaze part 2"
comments: true
---

Today is a followup on yesterdays [mblaze(7)](https://man.voidlinux.org/mblaze.7) post.

This time I show how I use mblaze to send and receive patches using `git` and [mblaze(7)](https://man.voidlinux.org/mblaze.7) as example.

First I create a patch file with `git format-patch`, afterwards I use [mcom(1)](https://man.voidlinux.org/mcom.1) to compose a new mail to that I deliver to my local mailbox for this example.

```
voidlinux.github.com@pi$ git format-patch HEAD~1
0001-The-Advent-of-Void-Day-18-mblaze-fixup.patch
voidlinux.github.com@pi$ mcom duncan@pi.lan
To: duncan@pi.lan
Cc:
Bcc:
Subject: [PATCH] mblaze advent fixup
Message-Id: <EWKLTW37CF.2MS3C7VXW22M0@pi.lan>
User-Agent: mblaze/0.2-56-g29d8946-dirty (2017-12-18)

Attachments can be added by starting a line with `#` following the
content type and the file name.

#text/plain 0001-The-Advent-of-Void-Day-18-mblaze-fixup.patch
"./snd.0" 11L, 332C written
What now? ([s]end, [c]ancel, [d]elete, [e]dit, [m]ime, sign, encrypt) m
./snd.0.mime
  1: multipart/mixed size=4342
    2: text/plain size=100
    3: text/plain size=3552 name="0001-The-Advent-of-Void-Day-18-mblaze-fixup.patch"
What now? ([s]end, [c]ancel, [d]elete, [e]dit, [m]ime, sign, encrypt) s
```

First [mcom(1)](https://man.voidlinux.org/mcom.1) opened my `$EDITOR` with a template mail, I added the subject, the body and my patch as attachment, using the `#contenttype filename` syntax.
Then I write the file and close my editor (`:wq`), [mcom(1)](https://man.voidlinux.org/mcom.1) asks me then what to do next.
I choose `[m]ime` first to attach the attachment, mime is requiered for mails that contain multiple parts.
[mcom(1)](https://man.voidlinux.org/mcom.1) asks me again what to do next and I choose `[s]end` to deliver the mail.

On my system [opensmtpd(8)](https://man.openbsd.org/smtpd.8) delivers local mails to a maildir.

When the mail is delivered I use [minc(1)](https://man.voidlinux.org/minc.1) to incorporate the new mails into maildirs `cur` directory and use [mlist(1)](https://man.voidlinux.org/mlist.1) and [mseq(1)](https://man.voidlinux.org/mseq.1) to create a new sequence to work with.
With the new sequence I can now use [mless(1)](https://man.voidlinux.org/mless.1) to read and navigate through my mails.

```
voidlinux.github.com@pi$ minc ~/mail/local -q
voidlinux.github.com@pi$ mlist ~/mail/local | mseq -S
voidlinux.github.com@pi$ mless
>.  1   Wed  01:30 duncan@pi.lan       [PATCH] mblaze advent fixup

From: <duncan@pi.lan>
Subject: [PATCH] mblaze advent fixup
To: duncan@pi.lan
Cc:
Date: Wed, 20 Dec 2017 01:30:05 +0100 (45 minutes, 6 seconds ago)

--- 1: multipart/mixed size=4342 ---
--- --- 2: text/plain size=100 charset="UTF-8" render="mflow -f" ---
Attachments can be added by starting a line with `#` following the
content type and the file name.

--- --- 3: text/plain size=3552 name="0001-The-Advent-of-Void-Day-18-mblaze-fixup.patch" render="mflow -f" ---
From 84eb8bea765561c2b4bb0b2b2d239393eb5c97f5 Mon Sep 17 00:00:00 2001
[...]
```

[mless(1)](https://man.voidlinux.org/mless.1) saves the currently selected mail, which makes it possible to close [mless(1)](https://man.voidlinux.org/mless.1) and then work with the last viewed mail using other [mblaze(7)](https://man.voidlinux.org/mblaze.7) tools.

Because the mail contains a patch I want to apply I use [mshow(1)](https://man.voidlinux.org/mshow.1)s `-t` flag to get a list of the parts in the mail.

```
voidlinux.github.com@pi$ mshow -t
/home/duncan/mail/local/cur/1513729805.5186.pi.lan:2,
  1: multipart/mixed size=4342
    2: text/plain size=100
    3: text/plain size=3552 name="0001-The-Advent-of-Void-Day-18-mblaze-fixup.patch"
```

The third part is the patch file I attached earlier, [mshow(1)](https://man.voidlinux.org/mshow.1)s `-O` flag to extracts a specified part to `stdout` by its index or by using a pattern.
I can just pipe the patch directly into `git am` to apply the patch and fix conflicts if necessary.

```
voidlinux.github.com@pi$ mshow -O . 3 | git am
Applying: The Advent of Void: Day 18: mblaze fixup
```

Now that the patch is applied and I flag the mail as `seen` and `trashed` using [mflag(1)](https://man.voidlinux.org/mflag.1), and update the sequence.
Updating the sequence is necessary because the filename of the mail has changed, I use [mseq(1)](https://man.voidlinux.org/mseq.1)s `-f` flag in this example to just fix missing mails in the current sequence, using [mlist(1)](https://man.voidlinux.org/mlist.1) again like at the beginning would get the same result.

```
voidlinux.github.com@pi$ mflag -ST .
voidlinux.github.com@pi$ mseq -f | mseq -S
```

Using [mscan(1)](https://man.voidlinux.org/mscan.1) once again shows in the second column that the mail is marked as trashed.

```
voidlinux.github.com@pi$ mscan
>x  1   Wed  01:30 duncan@pi.lan       [PATCH] mblaze advent fixup
1 mails scanned
```

I hope this post gives a bit more insight on how to work with [mblaze(7)](https://man.voidlinux.org/mblaze.7).
