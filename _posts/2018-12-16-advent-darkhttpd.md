---
layout: post
title: "The Advent of Void: Day 16: darkhttpd"
comments: true
---

[darkhttpd](https://unix4lyfe.org/darkhttpd/) is a small webserver.
Due to it's design choices it is probably not a good fit for serving
large sites but it is well suited for simple one-off tasks.

To start `darkhttpd`, run `darkhttpd /path/to/wwwroot`.

An exemplary use case, is to distribute xbps packages built on some box
to more machines for testing, before pushing them to the `void-packages`:

```
$ darkhttpd hostdir/binpkgs/firefox
darkhttpd/1.12, copyright (c) 2003-2016 Emil Mikulic.
listening on: http://0.0.0.0:8080/
```

`darkhttpd` by defaults listens on port 8080, so to update the testing machines,
running `sudo xbps-install --repository=http://buildbox:8080 -Suy` is all to be done.

As expected the files will be served and `darkhttpd` will log this information to stdout:

```
1544653860 192.168.1.15 "GET /x86_64-repodata" 304 136 "" "xbps/2.0"
1544653863 192.168.1.15 "GET /firefox-64.0_1.x86_64.xbps" 200 40882770 "" "xbps/2.0"
1544653863 192.168.1.15 "GET /firefox-64.0_1.x86_64.xbps.sig" 200 489 "" "xbps/2.0"
```

Be aware that that [xbps-install](https://man.voidlinux.org/xbps-install) requires packages
from remote repositories to be signed with [xbps-rindex](https://man.voidlinux.org/xbps-rindex).

In case a different port than 8080 is needed, this can be done via the `--port` flag.
For privileged ports where `darkhttpd` has to be run from the root user, the flags
`--chroot`, `--uid` and `--gid` should be considered.

For more information on run `darkhttpd --help`.
