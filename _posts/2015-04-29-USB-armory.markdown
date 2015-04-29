---
layout: post
title: "ARM USB armory platform support"
comments: true
---

The Inverse Path USB armory ARM platform is now fully supported and a 2GB SD image as well
as a rootfs have been created to use Void on them.

Thanks to [Enno Boland](http://twitter.com/Gottox) for testing the hardware and
making the required changes to `void-packages` and `void-mklive` to generate the
base platform package `usbarmory-base`.

In contrast to other supported platforms the USB armory has a static network
configuration. Once the usb armory is plugged in and booted it will be registered
as USB networking device. Configure the device as follows:

```
ip addr add 10.0.0.1/255.255.255.0 broadcast 10.0.0.255 dev enp0s20u2u3
```

Then log in using ssh:

```
ssh 10.0.0.1 -lroot
```

The default password is ```voidlinux```

Check the [downloads](http://www.voidlinux.eu/download/) section to grab them!

- [http://inversepath.com/usbarmory](http://inversepath.com/usbarmory)
