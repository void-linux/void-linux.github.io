---
layout: post
title: "The Advent of Void: Day 15: wgetpaste"
comments: true
---

wgetpaste is a bash script that can be used to upload text snippets to
various [pastebin](https://en.wikipedia.org/wiki/Pastebin) sites.

To upload a snippet just add the file as a first parameter:

```
$ wgetpaste my_text.txt 
Your paste can be seen here: https://paste.pound-python.org/show/94nOufHUeBGAPrIX5tuT/
```

wgetpaste can also read input from stdin:

```
$ cal | wgetpaste # poor mans web calendar!
```

To lists the supported engines use the `-S` flag:

```
$ wgetpaste -S
Services supported: (case sensitive):
   Name:        | Url:
   =============|=================
    bpaste      | https://bpaste.net/
    codepad     | http://codepad.org/
    dpaste      | http://dpaste.com/
    gists       | https://api.github.com/gists
   *poundpython | https://paste.pound-python.org/
```

you can set the service by the `-s` flag:

```
$ wgetpaste -s dpaste my_text.txt 
Your paste can be seen here: http://dpaste.com/0RRN4FQ
```

For more information on wgetpaste run `wgetpaste --help`
