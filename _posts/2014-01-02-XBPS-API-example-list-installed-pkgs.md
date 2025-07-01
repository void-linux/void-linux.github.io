---
layout: post
title: "XBPS API example: list installed pkgs (emulating pacman -Q)"
comments: true
---

In this post I'll show another simple example of the XBPS API that allows
you to list all installed packages in a root directory; the output emulates
the `pacman -Q` command from the *Archlinux* distribution:

{% highlight C %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <xbps.h>

static int pkgdb_foreach(struct xbps_handle *xhp, xbps_object_t obj,
		const char *key, void *arg, bool *done)
{
	pkg_state_t state;
	const char *pkgver;

	xbps_pkg_state_dictionary(obj, &state);
	if (state == XBPS_PKG_STATE_INSTALLED) {
		xbps_dictionary_get_cstring_nocopy(obj, "pkgver", &pkgver);
		printf("%s\n", pkgver);
	}
	return 0;
}

int main(int argc, char **argv)
{
	struct xbps_handle xh;
	int rv;

	if (argc != 2) {
		fprintf(stdout, "usage: %s rootdir\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	memset(&xh, 0, sizeof(xh));
	strncpy(xh.rootdir, argv[1], sizeof(xh.rootdir));

	if ((rv = xbps_init(&xh)) != 0) {
		fprintf(stderr, "failed to initialize libxbps: %s\n", strerror(rv));
		exit(EXIT_FAILURE);
	}
	rv = xbps_pkgdb_foreach_cb(&xh, pkgdb_foreach, NULL);
	exit(rv);
}
{% endhighlight %}

To compile the example you'll have to install some additional packages:

    # xbps-install -Sy gcc libxbps-devel pkg-config

And then to compile the C source code:

    $ cc `pkg-config --cflags --libs libxbps` list_installed_pkgs.c

You can then specify a path to the root directory to list installed packages:

```
$ ./a.out /foo
attr-2.4.47_2
base-chroot-0.40_1
base-directories-0.22_1
base-files-0.92_1
...
```

Please check out `/usr/include/xbps.h` to know more about the XBPS API.
