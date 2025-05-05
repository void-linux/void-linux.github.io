---
layout: post
title: "GRUB not part of base-system anymore"
comments: true
---

On the x86 platforms, grub is not part of the `base-system` package anymore.
That means that after upgrading `base-system` to `0.94`, `grub` will be detected
as an orphan. If you are using `grub`, please change it to `manual` installation mode
to keep it:

	# xbps-pkgdb -m manual grub

for x86, or:

	# xbps-pkgdb -m manual grub-x86_64-efi

for x86\_64.

This is in preparation to support other bootloaders in the future.
