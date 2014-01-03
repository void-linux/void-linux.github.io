---
layout: post
title: "Create your repositories!"
comments: true
---

Void Linux supports custom repositories. It's very easy to create your own signed repo
and you can share it, with the community. It's useful when you need to compile
your own packages and when you want to install them on different machines.
I'll show you how to proceed.

First, try to generate your own key using `openssl(1)`:

	openssl genrsa -des3 -out privkey.pem 4096

It also works with `ssh-keygen(1)`:

	ssh-keygen -t rsa -b 4096 -f privkey.pem

It's possible to use `2048`, `4096` or even `8192`.

Then, you need to modify a package, by editing its `template`. Compile it, using `xbps-src(1)` and a
package will be created ( `foo-0.5_1.x86_64.xbps` for example).

Create a directory that contains the final package called `foo-0.5_1.x86_64.xbps` and run:

	xbps-rindex -a /path/to/directory/*.xbps

The repository is created, but it's not signed yet. Now, we will sign this package:

	xbps-rindex --sign --signedby 'Iamfoo <foo@my_awesome_isp.org>' --privkey /path/to/privkey.pem /path/to/directory/

You'll be prompted for the password (from the key), type it. You did it! You created your own repository.  
Now, it would be interesting to upload this repo online. You must upload:

- `x86_64-repodata`
- `foo-0.5_1.x86_64.xbps`
- `foo-0.5_1.x86_64.xbps.sig`

When it's done, use your repository with the following command:

	xbps-install --repository=http://my_awesome_isp.org/repos/

or

	xbps-install -R http://my_awesome_isp.org/repos/

You can specify this repo with `xbps-query` as well.
