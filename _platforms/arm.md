---
name: arm
date: 1970-01-01 04:00:00
devices:
  - name: aarch64
    flavors: [base, xfce]
  - name: armv7l
  - name: armv6l
---

{% capture download_details %}
Live ISOs are available for UEFI-supporting devices. `void-installer` is not supported in these images.
You can log into these images as `anon` or `root`, and the password is `voidlinux`.

In addition to the plain command line image, there is a graphical flavor with the XFCE desktop environment.
Other graphical environments are fully supported by Void Linux, but are not offered as demonstration/installation
images, in order to decrease the overhead involved with testing.

ROOTFS tarballs can be extracted to a previously prepared partition scheme or
used for chroot installation.

General and platform specific instructions are available [in the
documentation](https://docs.voidlinux.org/installation/guides/arm-devices/index.html).
{% endcapture %}

{% include download_arm.html content=download_details %}
