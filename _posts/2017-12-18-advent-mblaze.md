---
layout: post
title: "The Advent of Void: Day 18: mblaze"
comments: true
---

Today I want to introduce [mblaze(7)](https://man.voidlinux.eu/mblaze.7), a set of Unix utilities to deal with mails stored in the maildir format.

It aims to be used for both interactive usage and scripting, similar to MH or nmh.
Except that its `mblaze` was written from scratch to be performant and memory efficient allowing to work with large amounts of mails.
This results in a smaller and clean implementation which dropped support for (in our eyes) less useful features and improve usability.

The basic concept of `mblaze` is to work with sequences which are newline separated list of mail files with optional indention to represent threading.
Sequences can be used in memory by using pipes or as files which enabled further features as explained later in this post.

There are tools to create, sort, filter and manipulate sequences, other tools like `mshow`, `maddr` or `magrep` use those sequences to gather, address or show specific mails from sequences.

[mlist(1)](https://man.voidlinux.eu/mlist.1) creates the initial sequence, It takes mail directories as argument and prints out all the mails it can find, it also has some arguments to filter mails by flags that are stored in the file name, as example `-S` and `-s` to show only seen or not seen mails respectively.

```
$ mlist ~/mail/
/home/duncan/mail/1505313797.1422_503.tux,U=41583:2,S
/home/duncan/mail/1505402355.860_19.tux,U=41679:2,ST
/home/duncan/mail/1505402356.860_24.tux,U=41684:2,S
/home/duncan/mail/1505402355.860_23.tux,U=41683:2,S
/home/duncan/mail/1505402356.860_25.tux,U=41685:2,S
/home/duncan/mail/1505402355.860_22.tux,U=41682:2,
/home/duncan/mail/1505402355.860_20.tux,U=41680:2,S
/home/duncan/mail/1505402356.860_26.tux,U=41686:2,S
/home/duncan/mail/1505313797.1422_502.tux,U=41582:2,ST
```

Most mails and MUAs work with mails in threads, `mblaze` has [mthread(1)](https://man.voidlinux.eu/mthread.1) to group the mails in a sequence into threads.
To sort mails we use [msort(1)](https://man.voidlinux.eu/msort.1) which uses mail headers like `Date` or `Subject` to sort the sequence in the specified way.

```
$ mlist ~/mail/ | mthread
/home/duncan/mail//1505402355.860_19.tux,U=41679:2,ST
<voidlinux/void-packages/issues/7614@github.com>
 /home/duncan/mail//1505313797.1422_502.tux,U=41582:2,ST
 /home/duncan/mail//1505313797.1422_503.tux,U=41583:2,S
 /home/duncan/mail//1505402355.860_20.tux,U=41680:2,S
/home/duncan/mail//1505402355.860_22.tux,U=41682:2,
 /home/duncan/mail//1505402355.860_23.tux,U=41683:2,S
 /home/duncan/mail//1505402356.860_24.tux,U=41684:2,S
<voidlinux/void-packages/pull/7639@github.com>
 /home/duncan/mail//1505402356.860_25.tux,U=41685:2,S
 /home/duncan/mail//1505402356.860_26.tux,U=41686:2,S
9 mails threaded
$ mlist ~/mail/ | mthread | msort -d
<voidlinux/void-packages/issues/7614@github.com>
 /home/duncan/mail//1505313797.1422_502.tux,U=41582:2,ST
 /home/duncan/mail//1505313797.1422_503.tux,U=41583:2,S
 /home/duncan/mail//1505402355.860_20.tux,U=41680:2,S
 /home/duncan/mail//1505402355.860_23.tux,U=41683:2,S
 /home/duncan/mail//1505402356.860_24.tux,U=41684:2,S
<voidlinux/void-packages/pull/7639@github.com>
 /home/duncan/mail//1505402356.860_25.tux,U=41685:2,S
 /home/duncan/mail//1505402356.860_26.tux,U=41686:2,S
/home/duncan/mail//1505402355.860_19.tux,U=41679:2,ST
/home/duncan/mail//1505402355.860_22.tux,U=41682:2,
9 mails threaded
```

To avoid creating and piping sequences every time we can use [mseq(1)](https://man.voidlinux.eu/mseq.1) to save and manipulate mail sequence files.
If the sequence is stored as file the `mblaze` utilities can use the sequence from the file to address mails by index numbers and [mmsg(7)](https://man.voidlinux.eu/mmsg.7) selectors.

```
$ mlist ~/mail/ | mthread | msort -d  | mseq -S
9 mails threaded
$ cat ~/.mblaze/seq
<voidlinux/void-packages/issues/7614@github.com>
 /home/duncan/mail//1505313797.1422_502.tux,U=41582:2,ST
 /home/duncan/mail//1505313797.1422_503.tux,U=41583:2,S
 /home/duncan/mail//1505402355.860_20.tux,U=41680:2,S
 /home/duncan/mail//1505402355.860_23.tux,U=41683:2,S
 /home/duncan/mail//1505402356.860_24.tux,U=41684:2,S
<voidlinux/void-packages/pull/7639@github.com>
 /home/duncan/mail//1505402356.860_25.tux,U=41685:2,S
 /home/duncan/mail//1505402356.860_26.tux,U=41686:2,S
/home/duncan/mail//1505402355.860_19.tux,U=41679:2,ST
/home/duncan/mail//1505402355.860_22.tux,U=41682:2,
```

Now that the sequence is saved we can continue can use [mscan(1)](https://man.voidlinux.eu/mscan.1) a tool to print one line message lists including the subject, the date and a visual representation for the flags.

```
$ mscan
                                       \_ <voidlinux/void-packages/issues/7614@github.com>
 x  2   Sun Sep 10 gravicappa            Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    3   Sun Sep 10 Lain                  Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    4   Thu Sep 14 Enno Boland           Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    5   Thu Sep 14 Dominic Monroe        Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
    6   Thu Sep 14 lemmi                 Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
                                       \_ <voidlinux/void-packages/pull/7639@github.com>
    8   Thu Sep 14 Michael Gehring       Re: [voidlinux/void-packages] libcaca: add (optional) support for imlib2 (#7639)
    9   Thu Sep 14 newbluemoon           Re: [voidlinux/void-packages] libcaca: add (implicit) support for imlib2 (#7639)
 x  10  Thu Sep 14 Michael Gehring     Re: [voidlinux/void-packages] libdockapp: Corrected incorrect entry in shlibs (#7652)
 .  11  Thu Sep 14 lemmi               [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
11 mails scanned
```

The first column is for flags, `x` is for Trashed mails, and `.` (dot) for unseen mails, the second column is the index of the mail in the sequence.

`mscan` can use the previously mentioned [mmsg(7)](https://man.voidlinux.eu/mmsg.7) syntax to address or select mails.
In this example the first one just addresses two mails by their index, the second example selects a range of mails starting and ending at the specified index.

```
$ mscan 2 5
 x  2   Sun Sep 10 gravicappa            Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    5   Thu Sep 14 Dominic Monroe        Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
2 mails scanned
$ mscan 2:5
 x  2   Sun Sep 10 gravicappa            Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    3   Sun Sep 10 Lain                  Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    4   Thu Sep 14 Enno Boland           Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    5   Thu Sep 14 Dominic Monroe        Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
4 mails scanned
```

The next tool is [mshow(1)](https://man.voidlinux.eu/mshow.1) which renders mails or extracts attachments.

```
$ mshow 2
From: gravicappa <notifications@github.com>
Subject: Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
To: voidlinux/void-packages <void-packages@noreply.github.com>
Cc: Duncan Overbruck <duncaen@voidlinux.eu>,  Comment <comment@noreply.github.com>
Date: Sun, 10 Sep 2017 09:30:36 -0700 (14 weeks, 1 day, 1 hour ago)
Reply-To: voidlinux/void-packages <reply+002aecdf7dfdc8d5ee7bc8a57eb08b436b6d3af844c59c4192cf0000000115cd2aac92a169ce0f49ca87@reply.github.com>

--- 1: multipart/alternative size=2477 ---
--- --- 2: text/plain size=258 charset="UTF-8" render="mflow -f" ---
It shows cyrillics correctly but inputting whose with keyboard yields nothing.

--
You are receiving this because you commented.
Reply to this email directly or view it on GitHub:
https://github.com/voidlinux/void-packages/issues/7614#issuecomment-328354106
```

[mless(1)](https://man.voidlinux.eu/mless.1) is a small wrapper around less that lets you page through your sequence.
On the top it prints a few lines from `mscan` with the current mail highlighted and on the bottom it shows the content of the mail.
You can now use `:n` and `:p` to navigate through mails.

```
$ mless
 x  3   Sun Sep 10 gravicappa            Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614
    4   Sun Sep 10 Lain                  Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614
>   5   Thu Sep 14 Enno Boland           Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614
 .  6   Thu Sep 14 lemmi               [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EU
    7   Thu Sep 14 Dominic Monroe        Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's
    8   Thu Sep 14 lemmi                 Re: [voidlinux/void-packages] Replace caddy with wedge in light of caddy's

From: Enno Boland <notifications@github.com>
Subject: Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
To: voidlinux/void-packages <void-packages@noreply.github.com>
Cc: Duncan Overbruck <duncaen@voidlinux.eu>,  Comment <comment@noreply.github.com>
Date: Wed, 13 Sep 2017 23:15:15 -0700 (13 weeks, 4 days, 17 hours ago)
Reply-To: voidlinux/void-packages <reply+002aecdfbf62a2c14f84705a7fd3c31678cfae556dcc03ee92cf0000000115d1e07392a169ce0f49ca87@reply.github.com>

--- 1: multipart/alternative size=2827 ---
--- --- 2: text/plain size=197 charset="UTF-8" render="mflow -f" ---
Closed #7614 via #7633.

--
You are receiving this because you commented.
Reply to this email directly or view it on GitHub:
https://github.com/voidlinux/void-packages/issues/7614#event-1248561716
~
~
mless 2 (message 3 of 12)
```

Another tool is [mpick(1)](https://man.voidlinux.eu/mpick.1) which can be used to write extensive filters for mail sequences.

```
$ mpick -t 'subject =~~ "dmenu"' | mscan
 x  3   Sun Sep 10 gravicappa            Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
    4   Sun Sep 10 Lain                  Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
>   5   Thu Sep 14 Enno Boland           Re: [voidlinux/void-packages] dmenu-4.7 doesn't allow cyrillic input (#7614)
11 mails tested, 3 picked.
3 mails scanned
```

In the next example `mpick` only picks mails between two dates and tests if the replied flag is set or the seen flag is not set.

```
$ mpick -t 'date >= "2017-09-01" && date < "2017-10-01" && (replied || !seen)' | mscan
 .  6   Thu Sep 14 lemmi               [voidlinux/void-packages] Replace caddy with wedge in light of caddy's new EULA (#7657)
11 mails tested, 1 picked.
1 mails scanned
```

This is just a very small example, `mblaze` is capable of a lot more and has great man pages that are worth reading, see [mblaze(7)](https://man.voidlinux.eu/mblaze.7) and the [git repository](https://github.com/chneukirchen/mblaze) as starting point if you want to learn more about it.
