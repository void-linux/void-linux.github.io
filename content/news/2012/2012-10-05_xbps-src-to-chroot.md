+++
title="xbps-src switch to linux-user-chroot"
date=2012-10-05
+++

**xbps-src** from git master and upcoming stable version v30 drops support for chrooting and mounting thru capabilities, instead I made it use **linux-user-chroot** which is a setuid helper that helps in mounting required directories into the masterdir (container/chroot) and also enables IPC and PID namespace container separation. As security measure only users of the **wheel** group will be able to build packages with **xbps-src**.
