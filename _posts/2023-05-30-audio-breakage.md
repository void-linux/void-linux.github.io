---
title: "Breaking changes: Pipewire session manager switch, Pipewire and PulseAudio system service removal"
layout: post
---

### Pipewire session manager switch

Void has now dropped the long-deprecated `pipewire-media-session` session manager
from its `pipewire` package, bringing it inline with the upstream default
configuration. If you are currently using `pipewire`, you must migrate to
`wireplumber` or `pipewire` will cease to function properly. Refer to
[Void documentation](https://docs.voidlinux.org/config/media/pipewire.html#session-management)
if you need guidance when making this change.

### Pipewire and PulseAudio system service removal

The oft-confusing services for `pipewire`, `pipewire-pulse`,
`wireplumber`, and `pulseaudio` have been removed from the `pipewire`,
`wireplumber`, and `pulseaudio` packages because they were experimental and
should not have been used for almost all use-cases.

If you are currently using those services and still wish to do so, replacements
for the `pipewire` and `pulseaudio` services can be found in
`/usr/share/examples/$pkgname/sv/`. Otherwise, it is recommended to migrate to
another method of launching `pipewire`. Refer to
[Void documentation](https://docs.voidlinux.org/config/media/pipewire.html)
if you need guidance.
