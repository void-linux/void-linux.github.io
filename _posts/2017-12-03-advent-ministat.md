---
layout: post
title: "The Advent of Void: Day 3: ministat"
comments: true
---

On day 3 we introduce you to the small statistics tool
[ministat(1)](https://man.voidlinux.eu/ministat.1) that originates
from FreeBSD.

When we sling around data on the command line, sometimes we want to
compute some basic statistics on it.  While minimum, average and
maximum are easily computed with
[awk(1)](https://man.voidlinux.eu/awk.1), you probably forgot the
formula for more complicated statistics.  There is no need to pull out
[R](https://man.voidlinux.eu/R.1) already, lets use ministat instead!

For example, let's have a look at the
[historical summer temperatures in Germany](ftp://ftp-cdc.dwd.de/pub/CDC/regional_averages_DE/seasonal/air_temperature_mean/regional_averages_tm_summer.txt).
We need to strip off the header, and then we can look e.g. at the
measurements in Bavaria:

```
% sed 1,2d <regional_averages_tm_summer.txt | ministat -d';' -C6
x <stdin>
+------------------------------------------------------------------------------+
|                    x       x                                                 |
|                    x       x                                                 |
|                x   x       x      x                                          |
|                x   x       xx     x                                          |
|              x x   x       xx  x  x                                          |
|              x x   xx   x  xxx xx x                                          |
|              xxx   xx x x xxxx xx x  x     x                                 |
|          x  xxxx xxxx x x xxxx xxxx xx   x x                                 |
|        x x  xxxx xxxx xxx xxxx xxxx xxx  x x  x      x                       |
|x     x x xx xxxx xxxx xxx xxxx xxxx xxxx x xx xx x x x  x      x            x|
|                |___________A___________|                                     |
+------------------------------------------------------------------------------+
    N           Min           Max        Median           Avg        Stddev
x 137          13.9            20          16.1     16.105839    0.96883545
```

ministat will prepare a nice ASCII-art plot so we can get a feel for
the data distribution.  We have 137 measurements, and an average
temperature of 16.1°C.

To compare multiple datasets, we need to pass them as multiple input files.
Luckily, [our shell](https://man.voidlinux.eu/zsh.1) has process substitution.
Let's match the Bavarian measurements with the German average:

```
% ministat -s <(awk -F';' 'NR>2{print $6}' regional_averages_tm_summer.txt) \
              <(awk -F';' 'NR>2{print $19}' regional_averages_tm_summer.txt) 
x /proc/self/fd/11
+ /proc/self/fd/12
+------------------------------------------------------------------------------+
|                    x       x        +                                        |
|                    x       x        +                                        |
|                x   x      +x   +  x +                                        |
|                x   x   +  +x*  + +x +                                        |
|              x x   x   +  +x*  *++* +  +                                     |
|              x+x   *x  +x +**x **+* ++ +      +                              |
|              x*x + *x x+x **** **+* +* + + x  +                              |
|          x  xx*x *x*x *+x **** **** ** + * x  + +                            |
|        x *  *x** **** **x **** **** ***+ * *  *++    x ++                    |
|x     x x *x **** **** *** **** **** **** *+** **+* *+x +*+     x        +   x|
|                |___________A___________|                                     |
|                     |___________A__________|                                 |
+------------------------------------------------------------------------------+
    N           Min           Max        Median           Avg        Stddev
x 137          13.9            20          16.1     16.105839    0.96883545
+ 137          14.7          19.7          16.5     16.481752    0.89838245
Difference at 95.0% confidence
	0.375912 +/- 0.221251
	2.33401% +/- 1.37373%
	(Student's t, pooled s = 0.934273)
```

ministat now plotted both datasets, and computed a [Student's
t-test](https://en.wikipedia.org/wiki/Student%27s_t-test) which shows
it's indeed a bit colder in Bavaria than in Germany in general.

Of course, in winter its even colder.
