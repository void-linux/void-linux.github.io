---
name: containers
date: 1970-01-01 07:00:00
flavors: [full, "", busybox]
---

{% capture download_details %}
All OCI container images are available on
[Github's container registry](https://github.com/orgs/void-linux/packages?repo_name=void-containers).

There are 3 images provided for each libc (`glibc` or `musl`):

- `void-LIBC-full`: Large image based on the `base-minimal` package.
  If you want something that is as close to a full void VM as possible,
  this is the image you want to start with. These images average 80-135MB.

- `void-LIBC`: This image contains far fewer packages and uses a
  `noextract` configuration to prevent certain directories from being added
  to the image. These images average 40-65MB.

- `void-LIBC-busybox`: This image is the same as the `void-LIBC` image
  above, but uses busybox instead of GNU coreutils. Note that this is
  not a well tested configuration with Void, but if you want a very
  small image, busybox is a good way to get it. These images average 15-40MB.

These images are available for the following OCI platforms:

- `linux/amd64`
- `linux/386` (`glibc` only)
- `linux/arm64`
- `linux/arm/v7`
- `linux/arm/v6`
{% endcapture %}

{% include download_containers.html content=download_details %}
