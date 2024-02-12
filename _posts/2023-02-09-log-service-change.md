---
title: Minor breaking change in service logging for several packages
layout: post
---

As of [this change](https://github.com/void-linux/void-packages/pull/42026) in void-packages,
all services provided by packages should start to include `log` sub-services that use
[`vlogger(8)`](https://man.voidlinux.org/vlogger.8) as they are updated, if they did not already.
This means that service logs for all services should go to syslog now, where they can be captured
by a [syslog daemon](https://docs.voidlinux.org/config/services/logging.html).

However, there are a few services that manually log to `/var/log/$SERVICE_NAME`:

- `dnscrypt-proxy`
- `dqcache` (from `dq`)
- `preload`
- `radicale`
- `discosrv` and `relaysrv` (from `syncthing`)

These services have been updated to use this new system, so they will no longer log to that directory.
If you wish to retain the previous behavior, you can set up `/etc/vlogger` like
[shown here](https://man.voidlinux.org/vlogger.8#EXAMPLES):

```sh
#!/bin/sh
exec svlogd /var/log/$1
```
