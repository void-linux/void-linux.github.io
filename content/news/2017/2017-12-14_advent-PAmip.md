+++
title="The Advent of Void: Day 14: PAmix and pulsemixer"
date=2017-12-14
+++

Day 14, and a little treat for you pulseaudio users out there. Two
underappreciated packages for an underappreciated workflow.

I don't always use pulseaudio. But when I do, I don't like opening pavucontrol
for any reason. After all, I live in the terminal for almost everything, and
switching from my text-mode audio players to the GUI just to change volumes
(or route audio to new players) just seems like a waste.

So that's where `PAmix` and `pulsemixer` come in. They are only useful if you
use pulseaudio, but it solves the problem of needing a GUI to easily tinker
with pulse volume, set where audio gets sent, and it does it all in two super
intuitive interfaces.

`PAmix` is a fun little interface that tries to map 1:1 from `pavucontrol` to
an ncurses interface. The keybindings are intuitive, there is support for hjkl
as well as arrow keys, and interaction is what you expect.

![A gifv of the PAmix interface](https://i.imgur.com/NuzrAXZ.gif)

PAmix occasionally segfaults (but has gotten much better about that), but is
very fast to start up again with a quick up-arrow enter in your (not dash)
shell.

Meanwhile, there is a python implementation of the same functionality, this one
with a different set of goals. For `pulsemixer`, there are two interfaces. One
is suitable for scripting, with commands such as `pulsemixer --change-volume +5`,
and a ncurses interface. This interface isn't modeled after `pavucontrol`, but
takes freedoms some people might appreciate.

![A regular image of the pulsemixer
interface](https://github.com/GeorgeFilipkin/pulsemixer/blob/img/1.png?raw=true)

To learn more, you can read the [PAmix
README](https://github.com/patroclos/PAmix) or the [pulsemixer
README](https://github.com/GeorgeFilipkin/pulsemixer)

Either way, there is no longer any need to use a GUI to manage your pulseaudio
system. Enjoy your newfound power!
