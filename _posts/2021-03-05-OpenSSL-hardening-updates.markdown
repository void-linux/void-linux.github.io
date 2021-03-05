---
title: Friday in the Void: OpenSSL and Kernel Hardening
layout: post
---

The previously announced [OpenSSL switch](https://voidlinux.org/news/2021/02/OpenSSL.html)
is now underway. Because OpenSSL is a dependency of a large number of packages,
the full rebuild process is expected to take several days. Syncing between the
builders and public repositories has been suspended to ensure that the package
tree remains consistent. Consequently, no new package updates will appear until
the switch is complete.

Once updates appear, we recommend that you perform a complete system update to
simplify the transition. Partial updates are possible, but you will need to
manually trace all OpenSSL dependants installed on your system and update them
atomically.

---

Since 2016, the default bootloader configuration in Void Linux has set
the Linux kernel command-line options `slub_debug=P` and `page_poison=1` to
provide some level of kernel hardening. Kernel series 5.3 and later offer
alternative measures `init_on_alloc` and `init_on_free` (see [this kernel
commit](https://github.com/torvalds/linux/commit/6471384af)).

Void's kernels come with the `init_on_alloc` option enabled by default where
available (*i.e.*, `linux5.4>=5.4.102`, `linux5.10>=5.10.20` and
`linux5.11>=5.11.3`). In most cases, you should not disable this option, as it
has a fairly minimal impact on performance (within 1%). The `init_on_free`
option is more expensive (around 5% on average) and needs to be enabled by hand
by passing `init_on_free=1` on the kernel command line. Similarly,
`init_on_alloc` can be disabled if needed by passing `init_on_alloc=0`.

As a consequence of these changes, Void's default kernel command-line now omits
the `slub_debug` and `page_poison` options. There is a chance that your
existing system still has the old options enabled. They still work in newer
kernels, but have a performance impact more in line with `init_on_free=1`. On
older hardware this can be quite noticeable. If you are running a kernel series
older than 5.4, you can keep them (or add them) for extra security at the cost
of performance; otherwise, you should remove them.

---

As always, if you experience any issues, feel free to reach out to us! You can
[open an issue](https://github.com/void-linux/void-packages/issues/new) on
GitHub or seek help in the `#voidlinux` channel on <https://freenode.net>.
