+++
title="Switch to util-linux kill(1) and procps-ng uptime(1)"
date=2013-02-20
+++

coreutils-8.21_3 does not provide the kill(1) and uptime(1) commands anymore. We now use util-linux kill(1) and procps-ng uptime(1). When upgrading there may be some conflicts as shown below:

```
# xbps-install -Syu
Conflicting packages were found:
 util-linux-2.22.2_7 conflicts with installed pkg coreutils-8.21_2
 procps-ng-3.3.5_4 conflicts with installed pkg coreutils-8.21_2
```

Which can be fixed by updating coreutils before running a full upgrade:

```
# xbps-install -Syu coreutils
# xbps-install -Syu
```
