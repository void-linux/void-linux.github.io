---
name: arm platforms
date: 1970-01-01 05:00:00
devices:
- name: rpi-armv6l
- name: rpi-armv7l
- name: rpi-aarch64
---

{% capture download_details %}
Live images can be written onto an SD card (i.e. using `dd`) and they provide you with a ready to boot system. These images are prepared for 2GB SD cards. Alternatively, use the ROOTFS tarballs if you want to customize the partitions and filesystems.

Connect to the system using a virtual terminal or SSH and log in as `root` with password `voidlinux`.

Platform specific instructions for these images are available [in the documentation](https://docs.voidlinux.org/installation/guides/arm-devices/platforms.html).
{% endcapture %}

{% include download_sbc.html content=download_details %}
