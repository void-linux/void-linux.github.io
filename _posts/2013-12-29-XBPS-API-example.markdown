---
layout: post
title: "XBPS API example: list pkgs by maintainer"
comments: true
---

In this post I'll show a real and simple example of the XBPS API. The
example allows you to find out which packages are being maintained by a 
contributor (aka maintainer).

{% highlight C %}
#define _GNU_SOURCE /* for strcasestr() */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <xbps.h>

static int repo_foreach(struct xbps_repo *repo, void *arg, bool *done)
{
	xbps_dictionary_t pkgd;
	xbps_object_t obj;
	xbps_object_iterator_t iter;
	const char *maint, *pkgver, *str = arg;
	bool printed_uri = false;

	/* ignore empty repos */
	if (repo->idx == NULL)
		return 0;

	iter = xbps_dictionary_iterator(repo->idx);
	while ((obj = xbps_object_iterator_next(iter)) != NULL) {
		pkgd = xbps_dictionary_get_keysym(repo->idx, obj);
		xbps_dictionary_get_cstring_nocopy(pkgd, "maintainer", &maint);
		if (strcasestr(maint, str)) {
			xbps_dictionary_get_cstring_nocopy(pkgd, "pkgver", &pkgver);
			if (!printed_uri) {
				printf("%s:\n", repo->uri);
				printed_uri = true;
			}
			printf("  %s (%s)\n", pkgver, maint);
		}
	}
	xbps_object_iterator_release(iter);
	if (printed_uri)
		printf("\n");

	return 0;
}

int main(int argc, char **argv)
{
	struct xbps_handle xh;
	int rv;

	if (argc != 2) {
		fprintf(stdout, "usage: %s maintainer\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	memset(&xh, 0, sizeof(xh));

	if ((rv = xbps_init(&xh)) != 0) {
		fprintf(stderr, "failed to initialize libxbps: %s\n", strerror(rv));
		exit(EXIT_FAILURE);
	}
	rv = xbps_rpool_foreach(&xh, repo_foreach, argv[1]);
	exit(rv);
}
{% endhighlight %}

To compile the example you'll have to install some additional packages:

    # xbps-install -Sy gcc libxbps-devel pkg-config


And then to compile the C source code:

    $ cc `pkg-config --cflags --libs libxbps` find_pkgs_by_maintainer.c

You can then specify a string to be matched in all packages registered in all
available repositories, i.e:

```
$ ./a.out hans
http://xbps.nopcode.org/repos/current:
  abcde-2.5.4_2 (Philipp Hirsch <itself@hanspolo.net>)
  abook-0.5.6_1 (Philipp Hirsch <itself@hanspolo.net>)
  cd-discid-1.4_2 (Philipp Hirsch <itself@hanspolo.net>)
  emacs-24.3_2 (Philipp Hirsch <itself@hanspolo.net>)
  task-2.2.0_1 (Philipp Hirsch <itself@hanspolo.net>)
  vorbis-tools-1.4.0_1 (Philipp Hirsch <itself@hanspolo.net>)
```

Please check out `/usr/include/xbps.h` to know more about the XBPS API.
