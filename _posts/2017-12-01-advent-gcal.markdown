---
layout: post
title: "The Advent of Void: Day 1: gcal"
comments: true
---

Hi, this year we want to give our users a special treat in the form of
this digital advent calendar.  Every day until Dec 25, we'll show you
one of the lesser known packages of Void Linux, with some focus on
command line tools.

The first tool is `gcal`, a "a program for calculating and printing
calendars", because we need to prepare our advent calendar, right?

gcal is the GNU version of the trusty old
[cal(1)](https://man.voidlinux.org/cal.1), but that description doesn't
do it justice because it's probably one of the most powerful and
flexible calendaring tools, supporting many different calendars and
astronomical data.

By default, gcal looks like plain cal:

```
% cal
    December 2017   
Su Mo Tu We Th Fr Sa
                1  2 
 3  4  5  6  7  8  9 
10 11 12 13 14 15 16 
17 18 19 20 21 22 23 
24 25 26 27 28 29 30 
31                   
% gcal

    December 2017
 Su Mo Tu We Th Fr Sa
                 1  2
  3  4  5  6  7  8  9
 10 11 12 13 14 15 16
 17 18 19 20 21 22 23
 24 25 26 27 28 29 30
 31           
```

A convenience feature is that you can display the calendar for a
particular month using `gcal aug` for example (recent versions of
`util-linux` cal do that too).

To show off some of the power gcal has, let's print the holidays in
December for Bavaria and California, and let's compute the
astronomical events too:

```
% gcal -q DE_BY+US_CA --astronomical-holidays -n -u dec

Eternal holiday list:

Full Moon 15:47 (Ast)                    - Sun,  Dec  3rd 2017 =   +2 days
St Nicholas' Eve (DE_BY)                 - Tue,  Dec  5th 2017 =   +4 days
Waning Half Moon 07:51 (Ast)             - Sun,  Dec 10th 2017 =   +9 days
New Moon 06:30 (Ast)                     - Mon,  Dec 18th 2017 =  +17 days
Solstice Day 16:28 (Ast)                 - Thu,  Dec 21st 2017 =  +20 days
Christmas Eve (DE_BY)                    * Sun,  Dec 24th 2017 =  +23 days
Christmas Day (DE_BY)                    + Mon,  Dec 25th 2017 =  +24 days
Christmas Day (US_CA)                    + Mon,  Dec 25th 2017 =  +24 days
Boxing Day (DE_BY)                       + Tue,  Dec 26th 2017 =  +25 days
Kwanzaa (US_CA)                          - Tue,  Dec 26th 2017 =  +25 days
Waxing Half Moon 09:20 (Ast)             - Tue,  Dec 26th 2017 =  +25 days
Kwanzaa (US_CA)                          - Wed,  Dec 27th 2017 =  +26 days
Kwanzaa (US_CA)                          - Thu,  Dec 28th 2017 =  +27 days
Kwanzaa (US_CA)                          - Fri,  Dec 29th 2017 =  +28 days
Kwanzaa (US_CA)                          - Sat,  Dec 30th 2017 =  +29 days
Kwanzaa (US_CA)                          - Sun,  Dec 31st 2017 =  +30 days
Sylvester/New Year's Eve (DE_BY)         * Sun,  Dec 31st 2017 =  +30 days
```

Finally, let's check the moon phase on Christmas eve:

```
gcal -#0*d1#999_%Z__%O %20171224

Fixed date list:

Sun,  Dec 24th 2017:            (        @@@@@
                           (                @@@@@@@
                         (                   @@@@@@@@
                       (                      @@@@@@@@@
                      (                        @@@@@@@@@
                     (                         @@@@@@@@@@
                     (                         @@@@@@@@@@
                      (                        @@@@@@@@@
                       (                      @@@@@@@@@
                        (                     @@@@@@@@
                           (                @@@@@@@
                               (          @@@@@ 33%+
```

gcal also has good support for *resource files*, where you can
configure your own holidays, dates and reminders (replacing many uses
of [calendar(1)](https://man.voidlinux.org/calendar.1] or
[when(1)](https://man.voidlinux.org/when.1)).  I recommend you to check
out the extensive info manual.
