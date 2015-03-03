---
layout: std
title: Enter the void - xbps
---

## xbps - example usage

xbps contains some utilities to accomplish a certain task for package management
(additional utilities not listed here were omitted for simplicity):

- `xbps-install(8)` - XBPS utility to (re)install and update packages
- `xbps-query(8)` - XBPS utility to query for package and repository information
- `xbps-remove(8)` - XBPS utility to remove packages
- `xbps-reconfigure(8)` - XBPS utility to configure installed packages
- `xbps-pkgdb(8)` - XBPS utility to report/fix issues and modify the package database (pkgdb)
- `xbps-rindex(8)` - XBPS utility to manage local binary package repositories

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
- http://repo3.voidlinux.eu (Dallas, TX, US)

#### Archives

Repository archives are available at http://archive.voidlinux.eu/YYYY-MM-DD, where
the datestamp is the date of the archive you wish to use as a repository.

    $ xbps-query --repository=http://archive.voidlinux.eu/2015-02-27/current -Mis \*

To list all packages stored on that repository.

### xbps-install(8)

This utility can be used to install, update, reinstall, or downgrade a package,
or all packages in your system, and to syncronize the remote repositories data.

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

### xbps-query(8)

This utility can be used to query for information about packages installed in your system
and in specific repositories.

The `xbps-query(8)` has two working modes:

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

### xbps-remove(8)

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

### xbps-reconfigure(8)

This utility can be used to configure or force reconfiguration of an installed package.

When `xbps-install(8)` installs a package, it performs the task in two phases: *unpacking* and *configuration*.
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


### xbps-pkgdb(8)

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

It's possible to change this mode with `xbps-pkgdb(8)`:

    # xbps-pkgdb -m auto pkg
    # xbps-pkgdb -m manual pkg

A package can also be put *on hold* mode to skip updates while performing a system update:

    # xbps-pkgdb -m hold pkg
    # xbps-pkgdb -m unhold pkg

### xbps-rindex(8)

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

#### Signing packages stored in a repository

    $ xbps-rindex --signedby "I'm Groot" -s /path/to/dir

Signs all binary packages stored in repository with your specified RSA key.
If the `--privkey` argument not set, it defaults to `~/.ssh/id_rsa`.
