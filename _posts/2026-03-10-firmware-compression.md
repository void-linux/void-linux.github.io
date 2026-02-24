---
title: "Changes to linux-firmware may require manual intervention"
layout: post
---

To reduce installation size, firmware provided by `linux-firmware` is now
compressed with zstd. Ensure you are running a supported kernel when updating to
`linux-firmware-20260309_1` or later:

- `linux5.10>=5.10.251_1`
- `linux5.15>=5.15.201_1`
- `linux6.1>=6.1.127_1`
- `linux6.6>=6.6.68_1`
- `linux6.12>=6.12.7_1`
- `linux6.18`, `linux6.19`, or any later version
- `rpi-kernel>=6.12.67_1`
- `pinephone-kernel>=6.1.7_2`

If you cannot run one of these kernels, you can hold the `linux-firmware` packages
at their currently-installed version:

```
# xbps-pkgdb -m hold linux-firmware linux-firmware-amd linux-firmware-broadcom \
    linux-firmware-intel linux-firmware-network linux-firmware-nvidia linux-firmware-qualcomm
```
