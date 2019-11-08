+++
title="XBPS API example: list pkgs in a repo (emulating pacman -Sl repo)"
date=2013-12-30
+++

In this post I'll show another simple example of the XBPS API that allows
you to list all packages in a repository (local or remote); the output
emulates the `pacman -Sl repo` command from the *Archlinux* distribution:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <xbps.h>

static int repo_foreach(struct xbps_repo *repo, void *arg, bool *done)
{
	xbps_dictionary_t pkgd;
	xbps_object_t obj;
	xbps_object_iterator_t iter;
	const char *pkgver;

	/* ignore empty repos */
	if (repo->idx == NULL)
		return 0;

	/* Iterate over the repository index dictionary */
	iter = xbps_dictionary_iterator(repo->idx);
	while ((obj = xbps_object_iterator_next(iter)) != NULL) {
		pkgd = xbps_dictionary_get_keysym(repo->idx, obj);
		xbps_dictionary_get_cstring_nocopy(pkgd, "pkgver", &pkgver);
		printf("%s %s", repo->uri, pkgver);
		if (xbps_pkgdb_get_pkg(repo->xhp, pkgver))
			printf(" [installed]");
		printf("\n");
	}
	xbps_object_iterator_release(iter);

	return 0;
}

int main(int argc, char **argv)
{
	struct xbps_handle xh;
	int rv;

	if (argc != 2) {
		fprintf(stdout, "usage: %s repourl\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	memset(&xh, 0, sizeof(xh));
	/*
	 * We specify an unexistent conf file to make sure that only specified repo
	 * is being used.
	 */
	xh.conffile = "dr_pwwker_is_watching_you";
	/*
	 * And then we add the specified repo to the repositories array.
	 */
	xh.repositories = xbps_array_create();
	xbps_array_add_cstring_nocopy(xh.repositories, argv[1]);

	if ((rv = xbps_init(&xh)) != 0) {
		fprintf(stderr, "failed to initialize libxbps: %s\n", strerror(rv));
		exit(EXIT_FAILURE);
	}
	rv = xbps_rpool_foreach(&xh, repo_foreach, NULL);
	exit(rv);
}
```

To compile the example you'll have to install some additional packages:

```
# xbps-install -Sy gcc libxbps-devel pkg-config
```

And then to compile the C source code:

```
$ cc `pkg-config --cflags --libs libxbps` list_pkgs_in_repo.c
```

You can then specify a repository url to list all stored packages in this
repository:

```
$ ./a.out http://xbps.nopcode.org/repos/current
http://xbps.nopcode.org/repos/current blah-1.0_1 [installed]
http://xbps.nopcode.org/repos/current foo-1.0_1
...
```

Please check out `/usr/include/xbps.h` to know more about the XBPS API.
