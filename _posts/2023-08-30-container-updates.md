---
title: Changes to Container Images
layout: post
---

To simplify the container experience, we've revamped the way Void's OCI container images are built and tagged.

In short:

- Architectures are now encoded using the platform in the manifest instead of in tags
- Different libcs and flavors of images are now separate images instead of tags
- The `mini` flavor is no longer built, as they did not work as intended

You can check out the available images on the [Download](/download/#containers) page or on [Github](https://github.com/orgs/void-linux/packages?repo_name=void-containers).

If you're interested in the technical details, you can take a look at the [pull request](https://github.com/void-linux/void-docker/pull/11) for these changes.

#### **To migrate your current containers:**

| Old Image | New Image | Notes |
|:----------|:----------|:------|
| `voidlinux/voidlinux` | `ghcr.io/void-linux/void-glibc` | Wow, you've been using two-year-old images! |
| `voidlinux/voidlinux-musl` | `ghcr.io/void-linux/void-musl` | |
| | | |
| `ghcr.io/void-linux/void-linux:*-full-*` | `ghcr.io/void-linux/void-glibc-full` | |
| `ghcr.io/void-linux/void-linux:*-full-*-musl` | `ghcr.io/void-linux/void-musl-full` | |
| | | |
| `ghcr.io/void-linux/void-linux:*-thin-*` | `ghcr.io/void-linux/void-glibc` | |
| `ghcr.io/void-linux/void-linux:*-thin-*-musl` | `ghcr.io/void-linux/void-musl` | |
| | | |
| `ghcr.io/void-linux/void-linux:*-mini-*` | `ghcr.io/void-linux/void-glibc` | `mini` images are no longer built |
| `ghcr.io/void-linux/void-linux:*-mini-*-musl` | `ghcr.io/void-linux/void-musl` | |
| | | |
| `ghcr.io/void-linux/void-linux:*-thin-bb-*` | `ghcr.io/void-linux/void-glibc-busybox` | |
| `ghcr.io/void-linux/void-linux:*-thin-bb-*-musl` | `ghcr.io/void-linux/void-musl-busybox` | |
| | | |
| `ghcr.io/void-linux/void-linux:*-mini-bb-*` | `ghcr.io/void-linux/void-glibc-busybox` | `mini` images are no longer built |
| `ghcr.io/void-linux/void-linux:*-mini-bb-*-musl` | `ghcr.io/void-linux/void-musl-busybox` | |
