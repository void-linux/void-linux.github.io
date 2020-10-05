---
name: arm platforms
date: 1970-01-01 05:00:00
devices:
- name: beaglebone
  arch: armv7
- name: cubieboard2
  arch: armv7
- name: odroid-c2
  arch: armv7
- name: rpi
  arch: armv6
- name: rpi2
  arch: armv7
- name: rpi3
  arch: aarch64
- name: usbarmory
  arch: armv7
---

{% capture download_details %}
Live images can be written onto an SD card (i.e. using `dd`) and they provide you with a ready to boot system. These images are prepared for 2GB SD cards. Alternatively, use the ROOTFS tarballs if you want to customize the partitions and filesystems.

Connect to the system using a virtual terminal or SSH and log in as `root` with password `voidlinux`.

Platform specific instructions for these images are available [in the documentation](https://docs.voidlinux.org/installation/guides/arm-devices/platforms.html).

Deprecated instructions for the following platforms can be found in these wiki pages (you can help by porting them over to the [Void Handbook](https://github.com/void-linux/void-docs/blob/master/CONTRIBUTING.md)):

- [BeagleBone/BeagleBone Black](https://wiki.voidlinux.org/Beaglebone)
- [Cubieboard2](https://wiki.voidlinux.org/Cubieboard2_SD-Card)
- [Odroid U2/U3](https://wiki.voidlinux.org/Odroid_U2)
- [USB Armory](https://wiki.voidlinux.org/USB_Armory)
{% endcapture %}

{% include download_sbc.html content=download_details %}
