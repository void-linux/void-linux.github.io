---
layout: std
title: Enter the void - xbps
---

* TOC
{:toc}

# Introduction

xbps contains some utilities to accomplish a certain task for package management
(additional utilities not listed here were omitted for simplicity):

- `xbps-install(1)` - XBPS utility to (re)install and update packages
- `xbps-query(1)` - XBPS utility to query for package and repository information
- `xbps-remove(1)` - XBPS utility to remove packages
- `xbps-reconfigure(1)` - XBPS utility to configure installed packages
- `xbps-pkgdb(1)` - XBPS utility to report/fix issues and modify the package database (pkgdb)
- `xbps-rindex(1)` - XBPS utility to manage local binary package repositories
- `xbps-alternatives(1)` - XBPS utility to handle alternatives

This page shows brief examples for common usage, refer to the manual pages for more information.

### Repositories

Repositories are the heart of the `xbps` package system. Repositories can be *locally* or *remotely*
available:

- *local*: repository is available in a local directory, e.g `/xbps/repository`.
- *remote*: repository is available in a remote location, e.g `http://my.domain.com/repository`.

Repositories can be declared in a file stored in `/etc/xbps.d` with a simple format:

    repository=<url>

Where `url` can be a path to a directory (local) or an URL to the repository (remote):

    # echo 'repository=/path/to/dir' > /etc/xbps.d/my-local-repo.conf
    # echo 'repository=http://my.domain.com/repository' > /etc/xbps.d/my-remote-repo.conf

System repositories can be available at `/usr/share/xbps.d`, files bearing the same filename
available in `/etc/xbps.d` override those defined in `/usr/share/xbps.d`.

#### Official Repositories

- http://repo.voidlinux.eu (Germany, EU *default*)
- http://repo2.voidlinux.eu (Germany, EU)
- http://repo3.voidlinux.eu (Los Angeles, CA, US)
- http://repo4.voidlinux.eu (Paris, FR, EU)

The official repositories (glibc) are signed with the following RSA key:

    Signed-by: Void Linux
    4096 60:ae:0c:d6:f0:95:17:80:bc:93:46:7a:89:af:a3:2d

You can print the `repository` RSA public key fingerprint with `xbps-query`:

    $ xbps-query -vL

#### Official Repositories (musl)

- http://muslrepo.voidlinux.eu (Paris, EU *default*)

The musl repositories are signed with the following RSA key:

    Signed-by: Void Linux
    4096 3d:b9:c0:50:41:a7:68:4c:2e:2c:a9:a2:5a:04:b7:3f

You can print the `repository` RSA public key fingerprint with `xbps-query`:

    $ xbps-query -vL

#### Subrepositories

Additional sub repositories exist in the official repositories:

- debug (contains -dbg pkgs for debugging)
- nonfree (contains pkgs that don't have free licenses)
- multilib (contains 32bit pkgs for 64bit platforms)
- multilib/nonfree (contains non free 32bit pkgs for 64bit platforms)

Packages for these repositories exist in the `main` repository, i.e:

    $ xbps-query -Rs void-repo
    [*] void-repo-debug-5_1            Void Linux drop-in file for the debug repository
    [*] void-repo-multilib-5_1         Void Linux drop-in file for the multilib repository
    [*] void-repo-multilib-nonfree-5_1 Void Linux drop-in file for the multilib/nonfree repository
    [*] void-repo-nonfree-5_1          Void Linux drop-in file for the nonfree repository

After installing any of them don't forget to synchronize the repository data:

    # xbps-install -S

#### Archives

Repository archives are available at 

* http://archive.voidlinux.eu (Paris, FR - primary)
* http://archive.voidlinux.com (California, US - mirror)

Archive repository URIs would be http://archive.voidlinux.eu/musl/YYYY-MM-DD, where
the datestamp is the date of the archive you wish to use as a repository, and either musl
or glibc as the prefix directory.

    $ xbps-query --repository=http://archive.voidlinux.eu/glibc/2015-06-15/current -Mis \*
    $ xbps-query --repository=http://archive.voidlinux.com/musl/2015-06-14/current -Mis \*

To list all packages stored on that repository.

### Download static binaries

Static binaries for Linux built with the *musl C library* are available at:

- [aarch64](http://repo.voidlinux.eu/static/xbps-static-latest.aarch64-musl.tar.xz)
- [armv6hf](http://repo.voidlinux.eu/static/xbps-static-latest.armv6l-musl.tar.xz)
- [i686](http://repo.voidlinux.eu/static/xbps-static-latest.i686-musl.tar.xz)
- [x86\_64](http://repo.voidlinux.eu/static/xbps-static-latest.x86_64-musl.tar.xz)
- [mips32](http://repo.voidlinux.eu/static/xbps-static-latest.mips-musl.tar.xz)

### xbps-install(1)

This utility can be used to install, update, reinstall, or downgrade a package,
or all packages in your system, and to syncronize the remote repositories data.

#### Synchronize remote repository data

    # xbps-install -S

Remote repositories in xbps contain an archive that stores metadata of all
available packages in that repository. This data must be up-to-date. The `-S` flag
can be used with other mode to always sync.

#### Installing/updating a single package

    # xbps-install -S pkg

If `pkg` is installed and there's a newer version, the package will be upgraded to
that version of the first repository containing it; otherwise the package will be installed.

#### Reinstalling/downgrading to a specific package version

    # xbps-install -Sf pkg-1.0_1

By specifying a specific package version and the `-f` flag, the package will be reinstalled
or downgraded to that version if the package is currently installed.

#### Updating your system

    # xbps-install -Su

This will update all currently installed packages to the latest version found in the
registered repositories, performing a global system update. This is the recommended command
to keep your system up to date daily.

### xbps-query(1)

This utility can be used to query for information about packages installed in your system
and in specific repositories.

The `xbps-query(1)` has two working modes:

- **Local**: shows information of packages installed in the rootdir
- **Repository**: shows information of packages stored in repositories

The `-R` or `--repository` option switches to the `repository` mode. Most options are able
to work in `local` and `repository` mode.

#### Listing registered repositories

    $ xbps-query -L

#### Listing installed packages

    $ xbps-query -l

#### Showing information for a package

    $ xbps-query [-R] pkg

#### Showing the files list for a package

    $ xbps-query [-R] -f pkg

#### Showing the required dependencies for a package

    $ xbps-query [-R] -x pkg

#### Showing the reverse dependencies for a package (packages that depend on it):

    $ xbps-query [-R] -X pkg

#### Searching for packages matching its package name/version and/or description

    $ xbps-query [-R] -s pattern

#### Searching for packages matching a filename

    $ xbps-query [-R] -o "*/filename"

### xbps-remove(1)

This utility can be used to remove installed packages and clean the cache directory.

#### Removing a single package

    # xbps-remove pkg

#### Removing a single package and recursively all packages that were installed as dependencies

    # xbps-remove -R pkg

#### Cleaning up the cache directory

    # xbps-remove -O

#### Removing all package orphans

    # xbps-remove -o

#### Removing all package orphans and clean the cache directory

    # xbps-remove -Oo

### xbps-reconfigure(1)

This utility can be used to configure or force reconfiguration of an installed package.

When `xbps-install(1)` installs a package, it performs the task in two phases: *unpacking* and *configuration*.
The *unpacking* phase unpacks the package files of the binary package into disk, and the *configuration*
phase performs additional steps necessary to execute the software.

Packages that were not configured can be listed with `xbps-query -l` if its first two characters
are `uu`. In that case, those packages should be `reconfigured`:

    # xbps-reconfigure -a

#### Configure a package that is in *unpacked* state

    # xbps-reconfigure pkg

#### Configure all packages that are in *unpacked* state

    # xbps-reconfigure -a

#### Force reconfiguration of a package (even if it was configured previously):

    # xbps-reconfigure -f pkg


### xbps-pkgdb(1)

This utility can be used to report errors in installed packages, as well as changing some of its
properties.

#### Checking for errors in an installed package

    # xbps-pkgdb pkg

If `pkg` does not have any error there won't be any output and return value will be 0.

#### Checking for errors in all installed packages

    # xbps-pkgdb -a

#### Changing properties of an installed package

An installed package can have different modes depending how it was installed. If a package
was *explicitly* installed by the administrator and not as a *dependency*, its **installation** mode
will be set to **manual**, otherwise **auto**.

Packages that were installed manually can be listed with:

    $ xbps-query -m

or per-package:

    $ xbps-query -p automatic-install pkg

It's possible to change this mode with `xbps-pkgdb(1)`:

    # xbps-pkgdb -m auto pkg
    # xbps-pkgdb -m manual pkg

A package can also be put *on hold* mode to skip updates while performing a system update:

    # xbps-pkgdb -m hold pkg
    # xbps-pkgdb -m unhold pkg

A package can also be put in *repository locked mode* and will only be possible to update it
if there's an update in the same *repository* that was used for installing:

    # xbps-pkgdb -m repolock pkg
    # xbps-pkgdb -m repounlock pkg

### xbps-rindex(1)

This utility can be used to generate local repositories, remove obsolete binary packages stored
in them, and to sign the packages with a cryptographic key.

#### Creating a local repository

    $ xbps-rindex -a /path/to/dir/*.xbps

Once the command has run, a local repository is available at `/path/to/dir` and can be used as an argument
to the `--repository` option or be declared in `/etc/xbps.d/`.

#### Adding a specific package to a repository

    $ xbps-rindex -a /path/to/dir/foo-1.0_1.x86_64.xbps


#### Force addition of a specific package to a repository

    $ xbps-rindex -f -a /path/to/dir/foo-1.0_1.x86_64.xbps

#### Cleaning a repository (removing stalled entries)

    $ xbps-rindex -c /path/to/dir

#### Removing obsolete packages in a repository

    $ xbps-rindex -r /path/to/dir

#### Signing a repository

Initialize the repository metadata with signing properties:

    $ xbps-rindex --sign --signedby "I'm Groot" /path/to/dir

Signs all binary packages stored in repository with your specified RSA key.
If the `--privkey` argument not set, it defaults to `~/.ssh/id_rsa`.

    $ xbps-rindex --signedby "I'm Groot" --sign-pkg /path/to/dir/*.xbps

### xbps-alternatives(1)

The `xbps-alternatives` utility lists or sets the alternatives provided by
installed packages.  Alternatives are classified by groups, and a group
contains a number of symbolic links which are applied when the group is
set.

#### List all alternatives

    $ xbps-alternatives -l

#### List alternatives for a specific package

    $ xbps-alternatives -l foo

#### Set all alternative groups

    $ xbps-alternatives -s foo

#### Set specific alternative groups

    $ xbps-alternatives -g bar -s foo
