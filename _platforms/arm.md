---
name: arm
date: 1970-01-01 04:00:00
devices: [armv6l, armv7l, aarch64]
---

{% capture download_details %} 
ROOTFS tarballs can be extracted to a previously prepared partition scheme or
used for chroot installation.

General and platform specific instructions are available [in the
documentation](https://docs.voidlinux.org/installation/guides/arm-devices/index.html).
{% endcapture %}

{% include download_arm.html content=download_details %}
