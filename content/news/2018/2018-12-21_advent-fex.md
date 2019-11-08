+++
title="The Advent of Void: Day 21: fex"
date=2018-12-21
+++

[fex](https://www.semicomplete.com/projects/fex/) is a simple yet
powerful field extraction tool for working with text.

If you spend enough time in a shell fiddling with code or data, you
inevitably want to pull fields out of some text you have. For example,
say you want the hex sha256sum of a file, minus the name:

    $ sha256sum launch-codes
    a0cd7db7343bed89416660b4f92c43fe7b556439daa2e26e9844ce82491191c6  launch-codes

You could write this output to a file and remove the filename from it
with a text editor, or use cut or awk. However, fex can save you a bit
of time by extracting the first field containing the checksum for you:

    $ sha256sum launch-codes | fex 1
    a0cd7db7343bed89416660b4f92c43fe7b556439daa2e26e9844ce82491191c6

Or, say you want a list of all home directories from passwd. To do this,
we ask fex to split by colon and select the sixth field:

```
$ fex </etc/passwd :6
/root
/dev/null
/var/lib/colord
/var/empty
...
```

Or maybe we want `gid:login` pairs to work with:

```
$ fex </etc/passwd ':{4,1}'
0:root
99:nobody
999:colord
22:dbus
...
```

Here we can see that fex will keep the separator we split by, letting us
reduce the data to only what we want while maintaining its format. And,
it allows us to rearrange fields using `{N,M,...}` selectors.

You can alse use fex to pluck fields by narrowing the selection with
different split characters. So let's say we want to get an idea of what
the most common pairs of 'subject: verb' are in commit messages for
[void-packages](https://github.com/void-linux/void-packages) -- maybe to
see which packages receive the most updates.

To do this, we'll use git to search for commit message subjects with
a colon and pipe that to fex. Using fex, we'll write our first selector
(`:1`) to take the first field behind the colon. We'll then use a second
selector (`:2 1`) to take the text after the colon, split that by
spaces, and select the first word from that. With this, we get a list of
subjects and verbs we can sort and count:

```
$ git log --pretty=%s --grep ':' | fex ':1' ':2 1' | sort | uniq -c | sort -rh | head
    328 youtube-dl update
    206 xbps-git bump
    160 git update
    151 Adapta update
    149 ImageMagick update
    143 exiftool update
    142 firefox update
    136 kernel update
    133 rpi-kernel update
    129 python-setuptools update
```

From that, we can see that updates make up all but one of the top ten
pairs, with xbps-git bumps being the second in line after youtube-dl
updates. This only covers basic use of fex, too -- you can also select
field ranges, fields matching a regular expression, and combine all of
these.

There are lots of ways to use fex in day to day data munging,
programming, and writing your own tools. For many field extraction
tasks, fex allows you to easily get the data you want without writing
small awk programs or messing with cut. Plus, it's just fun to use.

For more information and examples, please read the [fex(1)
manpage](https://man.voidlinux.org/1/fex).
