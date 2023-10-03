---
title: Changes to Python 3 and pip on Void
layout: post
---

Happy Pythonmas! It's October, which means it's Python 3 update season. This
year, along with the usual large set of updates for Python packages, a safety
feature for pip, the Python package manager, has been activated. To ensure that
Python packages installed via XBPS and those installed via pip don't interfere
with one another, the system-wide Python environment has been marked as
"externally managed".

If you try to use `pip3` or `pip3 --user` outside of a Python virtual environment,
you may see this error that provides guidance on how to deploy a virtual
environment suitable for use with pip:

```
This system-wide Python installation is managed by the Void Linux package
manager, XBPS. Installation of Python packages from other sources is not
normally allowed.

To install a Python package not offered by Void Linux, consider using a virtual
environment, e.g.:

  python3 -m venv /path/to/venv
  /path/to/venv/pip install <package>

Appending the flag --system-site-packages to the first command will give the
virtual environment access to any Python package installed via XBPS.

Invoking python, pip, and executables installed by pip in /path/to/venv/bin
should automatically use the virtual environment. Alternatively, source its
activation script to add the environment to the command search path for a shell:

  . /path/to/venv/activate

After activation, running

  deactivate

will remove the environment from the search path without destroying it.

The XBPS package python3-pipx provides pipx, a convenient tool to automatically
manage virtual environments for individual Python applications.
```

You can read more about this change on Python's website in [PEP 668](https://peps.python.org/pep-0668/).

To simplify the use of Void-based containers, all [Void container images](https://voidlinux.org/download/#containers)
tagged `20231003R1` or later will explicitly ignore the "externally managed"
marker. Containers based on these images will still be able to use pip to
install Python packages in the container-wide environment.

### Here Be Dragons

If you really want to be able to install packages with pip in the system- or
user-wide Python environment, there are several options, but beware: this can
cause hard-to-debug issues with Python applications, or issues when updating with
XBPS.

1. Use pip's `--break-system-packages` flag. This only applies to the current invocation.
2. Set pip's configuration: `pip3 config set install.break-system-packages True`.
   This will apply to all future invocations.
3. Add a `noextract=/usr/lib/python*/EXTERNALLY-MANAGED` rule to your
   [XBPS configuration](https://man.voidlinux.org/xbps.d.5) and re-install the
   `python3` package. This will apply to all future invocations.
