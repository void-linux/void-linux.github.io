---
layout: post
title: "Using the Nix package manager"
comments: true
---

In this post I'll explain how to use the `Nix package manager` which is fully supported
and ready to be used for all users in the Void distribution. A brief introduction:

```
Nix is a 'purely functional package manager', This means that it treats packages like values
in purely functional programming languages such as Haskell — they are built by functions that
don’t have side-effects, and they never change after they have been built.`
```

The instructions are quite simple, install the `nix` package, start the `nix-daemon`
service and setup the user environment:

    # xbps-install -Sy nix
    # systemctl start nix-daemon

You can now either re-login your user or re-read `/etc/profile`:

    $ source /etc/profile

After this the `nix` package manager is fully functional and can be used by any user.

You can then subscribe to the Nix packages channel to query or install any available package:

    $ nix-channel --add http://nixos.org/channels/nixpkgs-unstable
    $ nix-channel --update

See [http://nixos.org/nix/manual/#chap-quick-start](http://nixos.org/nix/manual/#chap-quick-start)
for more information.

NixOS: [http://nixorg.org/](http://nixos.org/)
