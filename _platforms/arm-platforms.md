---
name: arm platforms
date: 1970-01-01 05:00:00
devices:
- name: apple silicon
  arch: asahi
  flavors: [base, xfce]
- name: rpi-aarch64
- name: rpi-armv7l
- name: rpi-armv6l
---

{% capture download_details %}
Platform images can be written onto an SD card (i.e. using `dd`) and they provide you with a ready to boot system. These images are prepared for 2GB SD cards. Alternatively, use the ROOTFS tarballs if you want to customize the partitions and filesystems.

Connect to the system using a virtual terminal or SSH and log in as `root` with password `voidlinux`.

Platform specific instructions for these images are available [in the documentation](https://docs.voidlinux.org/installation/guides/arm-devices/index.html).

Live ISOs are available for Apple Silicon devices. `void-installer` is not supported in these images.
You can log into these images as `anon` or `root`, and the password is `voidlinux`.

In addition to the plain command line image, there is a graphical flavor with the XFCE desktop environment.
Other graphical environments are fully supported by Void Linux, but are not offered as demonstration/installation
images, in order to decrease the overhead involved with testing.
{% endcapture %}

{% include download_arm_platforms.html content=download_details %}
