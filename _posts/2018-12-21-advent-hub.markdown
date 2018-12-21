---
layout: post
title: "The Advent of Void: Day 21: hub"
comments: true
---

[hub(1)](https://man.voidlinux.org/hub) is a github client that integrates well
with the [git(1)](https://man.voidlinux.org/git) command line interface,
provides additional commands and extends existing ones.

hub allows to create new github repositories from an existing local one using
this command:

```
$ cd src/xkeyscore
$ hub create 
```

to open the github repository in a browser window just execute

```
$ hub browse
```

hub also inherits git commands and enhances them with e.g. short links:

```
$ hub remote add Gottox/xkeyscore
```

You can query the continious integration status of the current commit:

```
$ hub ci-status
success
```

And even start a pull request from the command line:

```
$ hub pull-request
```

Unfortunatelly, hub is a Github only product. Supporting other tools like
[gitlab](http://gitlab.com/) won't be
[implemented](https://github.com/github/hub/issues/1383) by the developers..
If you'd like to learn more about hub, read the [manpage](https://man.voidlinux.org/hub) or visit its
[github page](https://github.com/github/hub)
