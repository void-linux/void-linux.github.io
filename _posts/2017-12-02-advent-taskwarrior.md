---
layout: post
title: "The Advent of Void: Day 2: taskwarrior and friends"
comments: true
---


Day 2! There are just so many tools we want to cover, so today we'll be covering two packages from the same upstream source, and mentioning related tools. These scratch many itches, are simple to start using, but have many more powerful and useful features as you need them. These are both from the taskwarrior project, are backed by organizations with money, and are both MIT licensed.

The tools I'll be talking about today are taskwarrior and timewarrior, the
`task` and `timewarrior` packages. First, let me start tracking how much time
I'm spending on this. I can't bill this time to anybody, but it's a good habit.

```
$ timew start write-advent-day-2
Recorded "lunch"
  Started 2017-12-01T11:28:54
  Ended              12:03:55
  Total               0:35:01
Tracking "write-advent-day-2"
  Started 2017-12-01T12:03:55
  Current                  55
  Total               0:00:00
```

Well, that's not actually what I wrote: I aliased `timew start` to `tt` because
I type it so often.

Onward! There is an interesting feature of these tools: they don't use any of
your system's resources behind your back. If I run `ps` to try and find
timewarrior right now, I'll get nothing back. It's just [not
there](https://youtu.be/vvmq66op0G8). Now, you can definitely install `taskd`
and get an always-running server for your tasks, but if you expected a server
to have no memory usage, you just learned something new.

Speaking of tasks, let's talk about taskwarrior. Their [own
documentation](https://taskwarrior.org/docs/start.html) is good at the
quick-start stuff of `task add thing I need to do  due:yesterday` (this command
works and does create a task that was due yesterday), and running `task` or
`task next` to see the list of your tasks in order of priority.

(As an aside: Priority? You can fiddle
with priority of tasks in incredibly fine grained ways if you like, but the
default calculation for priority is pretty good: things get higher priority as
they've been on your list longer, have other tasks depending on them, or are
due sooner).

What else do you need to know to start with task? Not much, except you can
`task modify ID` where `ID` is a number, you can `task delete`, you can `task
done`, and you can apply filters to your tasks or apply those filters to
commands like `done`. By way of example:

```
$ task due:yesterday
[task next ( due:yesterday )]

ID Age Due Description   Urg
24 12w -1d [redacted ]   9.96

1 task
$ task add important thing I must do due:yesterday
Created task 42.
$ task add another super important thing priority:H depends:42 due:yesterday
Created task 43.
$ task due:yesterday
[task next ( due:yesterday )]

ID Age Deps P Due Description                   Urg
42 25s        -1d important thing I must do     17.5
43 5s  42   H -1d another super important thing 10.5
24 12w        -1d [redacted]                    9.96

3 tasks
$ task modify 24 due:2017-11-29
Modifying task 24 '[redacted]'.
Modified 1 task.
$ task due:yesterday done
  - End will be set to '2017-12-01'.
  - Status will be changed from 'pending' to 'completed'.
Complete task 42 'important thing I must do'? (yes/no/all/quit) yes
Completed task 42 'important thing I must do'.
Unblocked 43 'another super important thing'.

  - End will be set to '2017-12-01'.
  - Status will be changed from 'pending' to 'completed'.
Complete task 43 'another super important thing'? (yes/no/all/quit) all
Completed task 43 'another super important thing'.
Task 4fc42e56 '[redacted 1]' is neither pending nor waiting.
Task 057109a9 '[redacted 2]' is neither pending nor waiting.
Task 652c9be1 '[redacted 3]' is neither pending nor waiting.
Task 5a4cabfe '[redacted 4]' is neither pending nor waiting.
Completed 2 tasks.
You have more urgent tasks.
```

That last line is a nice (mean) reminder that I have tasks with higher
priorities. What's that stuff at the end though, about other tasks? You see,
taskwarrior keeps your tasks around unless you `delete` them, so if you need to
see them again for some reason (I keep addresses in my tasks for places I have
to be, which is useful if I have to visit again), there is a way to get that
information from `task`.

All of that seems like a lot of stuff to know. I'll let you in on a secret:
I don't know how to get `done` tasks back. Everything is stored in text files
under `~/.task/`, and if I need something I can either `man task` or just use
`grep`. That's part of the beauty of `taskwarrior`, you only need to know `add`
and `done` to use it, but you can do so much more.

Fun fact! I learned today that there is a massive ecosystem
around `task`. Tools include a python script for converting
github/bitbucket/etc. issues to `task` entries (as well as some form of
synchronization), iOS and Android ports, a `taskd` (packaged for Void!) server
to share your tasks to the android client or other taskwarrior installations,
web frontends, thunderbird integrations, graph generation of tasks, emacs
clients, and... somehow.... much much [more](https://taskwarrior.org/tools/).

```
$ timew stop
Recorded "write-advent-day-2"
  Started 2017-12-01T12:03:55
  Ended                 41:48
  Total               0:37:53
```

Timewarior is another powerful tool from the same people, which also only uses
resources when you run the command, not in the background.

This one is cool because I can use it for all my reporting, all my clocking in
and out of tasks, gives me a cool daily/weekly/monthly view of my activities,
and has more features than I know about (and I don't need to know about them).
Timewarrior uses a simple file format just like `task`'s, provides commands
to make reporting hours worked on a particular tag very very easy, and you only
need three commands to get started: `timew start`, `timew stop`, and `timew`
to print the current time interval.

And this is how I can see a nice overview of time used on a particular project.
```
$ timew summary write-advent-day-2

Wk  Date       Day Tags                 Start      End    Time   Total
W48 2017-12-01 Fri write-advent-day-2 12:03:55 12:41:48 0:37:53 0:37:53

                                                                0:37:53
```

The summary command takes filters to, allowing for only reports for
a particular month or week, completing the taskwarrior standard of having more
features than any one user could hope to want, but leaving every user satisfied
with the way they use it.

Happy Working!
