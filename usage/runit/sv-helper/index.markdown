---
layout: std
title: Enter the void - runit / sv-helper
---

# sv-helper

sv-helper includes a few tools which assist in managing a runit system.

#### Commands

- svls - Shows the status of all service
- sv-list - Lists all available services
- sv-start &lt;service&gt; - starts a service
- sv-stop &lt;service&gt; - stops a service
- sv-restart &lt;service&gt; - restarts a service
- sv-enable &lt;service&gt; - enables (and starts) a service.
- sv-disable &lt;service&gt; - disables (and stops) a service.

#### Log utility

For creation of custom services, a `/usr/bin/rsvlog` is included with sv-helper.
It is meant to be symlinked as the `run` script for a log service. 

Example service:

/etc/sv/my\_service
```
#!/bin/sh
exec chpst -u my_service_user:my_service_group /path/to/my_service/binary 2>&1
```

Example use of `rsvlog` as a log service `run` script:

```
mkdir -p /etc/sv/my_service/log
ln -s /usr/bin/rsvlog /etc/sv/my_service/log/run
```

Then `sv-enable my_service` to enable and start my\_service.
The log directory (by default) will be /var/log/my\_service/.

#### Log configuration

A file named `conf` can be placed in any log service directory and will control
the behavior of rsvlog. It may contain either/both of the following variable definitions.

- USERGROUP=user:group - set this to the user and group who will own the log files (and log directory). Default is rsvlog:adm.
- SV\_LOGDIR=my\_service/svlog - set this to the (relative) directory where you want log files stored. Default is /var/log/&lt;service\_name&gt;

#### Command Examples

Listing Running Services

```
bash-4.3# svls
Listing All Services
run: /var/service/agetty-console: (pid 46) 11546s
run: /var/service/agetty-tty1: (pid 44) 11546s
run: /var/service/agetty-tty2: (pid 45) 11546s
run: /var/service/agetty-tty3: (pid 51) 11546s
run: /var/service/agetty-tty4: (pid 49) 11546s
run: /var/service/agetty-tty5: (pid 43) 11546s
run: /var/service/agetty-tty6: (pid 48) 11546s
run: /var/service/dhcpcd-eth0: (pid 38) 11546s
run: /var/service/sshd: (pid 42) 11546s
run: /var/service/udevd: (pid 47) 11546s
```

Enabling a Service

```
sv-enable sshd
```

Disabling a Service

```
sv-disable sshd
```
