+++
title="The Advent of Void: Day 24: snooze"
date=2017-12-24
+++

[cron(8)](http://man.voidlinux.eu/cron.8) is a nice tool, but it has
some long-standing problems, among them:

* The cron/crond design requires setuid. 
* Making cronjobs not overlap requires additional work.
* It's not possible to trigger a cronjob to run now, instead of the
  next scheduled time.
* The crontab syntax is confusing (if you think this is not true, do
  you know about `%`?).

A little, but flexible alternative is to use
[snooze(1)](http://man.voidlinux.eu/snooze.1), which essentially just
waits for a particular time, and then executes a command.  To get
recurring jobs ala cron, we can use this together with our [runit
service supervision suite](https://www.voidlinux.eu/usage/runit/).
If we wanted [at(1)](http://man.voidlinux.eu/at.1) instead, we
can just run snooze once.

The time for snooze is given using the options
`-d` (for day), `-m` (for month), `-w` (for weekday),
`-D` (for day of year), `-W` (for ISO week), and
`-H` (for hour),
`-M` (for minute),
`-S` (for second).
Each option of these can be comma-separated list
of values, ranges (with `-`) or repetitions (with `/`).
The default is daily at midnight,
so if we wanted to run at the next full hour instead, we could run:

```
% snooze -n -H'*'
2017-12-24T17:00:00+0100 Sun  0d  0h 47m 33s
2017-12-24T18:00:00+0100 Sun  0d  1h 47m 33s
2017-12-24T19:00:00+0100 Sun  0d  2h 47m 33s
2017-12-24T20:00:00+0100 Sun  0d  3h 47m 33s
2017-12-24T21:00:00+0100 Sun  0d  4h 47m 33s
```

The `-n` option disables the actual execution and shows the next five
matching times instead.

To run every 15 minutes, we'd use

```
% snooze -n -H'*' -M/15  
2017-12-24T16:15:00+0100 Sun  0d  0h  1m 31s
2017-12-24T16:30:00+0100 Sun  0d  0h 16m 31s
2017-12-24T16:45:00+0100 Sun  0d  0h 31m 31s
2017-12-24T17:00:00+0100 Sun  0d  0h 46m 31s
2017-12-24T17:15:00+0100 Sun  0d  1h  1m 31s
```

More complicated things are possible, for example next Friday the 13th:

```
% snooze -n -w5 -d13
2018-04-13T00:00:00+0200 Fri 108d  6h 45m 33s
2018-07-13T00:00:00+0200 Fri 199d  6h 45m 33s
no satisfying date found within a year.
```

Note that snooze bails out if it takes more than a year for the event
to happen.

By default, snooze will just terminate successfully, but we can give
it a command to run instead:

```
% snooze -H'*' -M'*' -S30 date 
Sun Dec 24 16:27:30 CET 2017
```

When snooze receives a SIGALRM, it immediately runs the command.

snooze is quite robust, it checks every 5 minutes the time has
progressed as expected, so if you change the system time (or the
timezone changes), it is noticed.

For additional robustness, you can use the timefiles option `-t`,
which ensures a job is not started if its earlier than some
modification time of a file.  On success, your job can then touch this
file to unlock the next iteration.  Together with the slack option
this can be used for anacron-style invocations that ensure a task is
run, for example, every day at some point.
