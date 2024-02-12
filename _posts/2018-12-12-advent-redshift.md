---
layout: post
title: "The Advent of Void: Day 12: redshift"
comments: true
---

If you stay up late working on packages and system security patches,
you may notice after a while your eyes start to hurt.  This is likely
due to too much blue light at night, which studies have shown can
cause eye strain.  While glasses and monitors that can filter this
light out are one solution, you can also adjust values in software to
account for this blue light at night.

Doing this by hand is obviously tedious, so there's an excellent
software package called "redshift" which does this adjustment for you.

Once installed from the repos (`xbps-install redshift`) create a file
like so that configures it:

```
[redshift]
temp-day=5700
temp-night=3200
gamma=0.8
location-provider=manual
elevation-high=24.69

[manual]
lat=39.109489
lon=-76.772980
```

This file should be in ~/.config/redshift.conf

The fields are pretty self explanatory, with the exception of
elevation-high which is the solar elevation in degrees before its
considered to be daytime.  All temperatures are provided in Kelvin,
and the wikipedia page on [color
temperature](https://en.wikipedia.org/wiki/Color_temperature) has a
nice chart showing different values against the common sources of
light that produce them.

From here, just start redshift with your session (`redshift-gtk` if
you have an environment that can autostart `.desktop` files) to enjoy
color filtered light at night!
