---
name: wsl
date: 1970-01-01 06:00:00
devices:
  - name: x86_64
  - name: aarch64
---

{% capture download_details %}
ROOTFS tarballs compatible with Windows Subsystem for Linux (WSL) 1 and 2 can be installed by downloading the file and running `wsl --install --from-file path/to/void.wsl`.

You can log into these images as `root` with the password `voidlinux`. Creation of a non-root user is prompted on first launch.

Documentation for WSL-specific topics is [available from Microsoft](https://learn.microsoft.com/en-us/windows/wsl).
{% endcapture %}

{% include download_wsl.html content=download_details %}
