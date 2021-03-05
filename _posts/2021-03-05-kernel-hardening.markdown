---
title: Changes to Kernel Security Options
layout: post
---

Since 2016, the default bootloader configruation in Void Linux has set
the Linux kernel command-line options `slub_debug=P` and `page_poison=1` to
provide some level of kernel hardening. Kernel series 5.3 and later offer
alternative measures `init_on_alloc` and `int_on_free` (see [this kernel
commit](https://github.com/torvalds/linux/commit/6471384af)).

Void's kernels come with the `init_on_alloc` option enabled by default where
available (i.e. `linux5.4` and later packages). You should usually not disable
it, as it has a fairly minimal impact on performance (within 1%). The
`init_on_free` option is more expensive (around 5% on average) and needs to be
enabled by hand by passing `init_on_free=1` on kernel command line. If you have
a good reason to disable `init_on_alloc`, you can do that similarly by passing
`init_on_alloc=0`.

As a consequence of these changes, Void's default kernel command-line now omits
the `slub_debug` and `page_poison` options. There is a chance that your
existing system still has the old options enabled. They still work in newer
kernels, but have a performance impact more in line with `init_on_free=1`. On
older hardware this can be quite noticeable. If you are running a kernel series
older than 5.4, you can keep them (or add them) for extra security at cost of
speed; otherwise, you should remove them.
