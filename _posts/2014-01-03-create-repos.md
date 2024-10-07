---
layout: post
title: "Create your own XBPS repositories!"
comments: true
date: 2014-01-03 20:00:00
---

Void Linux supports custom repositories. It's very easy to create your own signed repo
and you can share it, with the community. It's useful when you need to compile
your own packages and when you want to install them on different machines.
I'll show you how to proceed.

First, try to generate your own RSA key using `openssl(1)`:

	$ openssl genrsa -des3 -out privkey.pem 4096

It also works with `ssh-keygen(1)`:

	$ ssh-keygen -t rsa -b 4096 -f privkey.pem

It's possible to use `2048`, `4096` or even `8192` bits.

> XBPS currently only supports RSA keys in PEM format.

Then, you need to modify a package, by editing its `template`. Compile it, using `xbps-src(1)` and a
package will be created ( `foo-0.5_1.x86_64.xbps` for example).

Create a directory that contains the final package called `foo-0.5_1.x86_64.xbps` and run:

	$ xbps-rindex -a /path/to/dir/*.xbps

The repository is created, but it's not signed yet. Now, we will sign this package:

	$ xbps-rindex --sign --signedby 'foo <foo@foo.org>' --privkey privkey.pem /path/to/dir/

You'll be prompted for the passphrase(from the key), type it. You did it! You created your own repository.  
Now, it would be interesting to upload this repo online. You can just make it available through
an HTTP(S) or FTP server directly.

When it's done, use your repository with the following command:

	$ xbps-install --repository=http://foo.org/dir/

You can specify this repository with `xbps-query(8)` as well.
