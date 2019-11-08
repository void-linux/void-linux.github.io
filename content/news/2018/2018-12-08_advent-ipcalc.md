+++
title="The Advent of Void: Day 8: ipcalc"
date=2018-12-08
+++

[ipcalc](http://jodies.de/ipcalc) is a perl script that helps planning and
analyzing IPv4 networking and subnets. It takes an IP address and netmask and
calculates various metrics from it.  It detects CIDR notation as well as
dotted decimals. The latter recognizes even inversed bitmasks as used in Cisco
products.

ipcalc can be installed from the Void Linux repository:

```
xbps-install ipcalc
```

To analyze an IP in CIDR notation just supply it as first argument

```
$ ipcalc 192.168.23.12/24
Address:   192.168.178.12       11000000.10101000.10110010. 00001100
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255            00000000.00000000.00000000. 11111111
=>
Network:   192.168.178.0/24     11000000.10101000.10110010. 00000000
HostMin:   192.168.178.1        11000000.10101000.10110010. 00000001
HostMax:   192.168.178.254      11000000.10101000.10110010. 11111110
Broadcast: 192.168.178.255      11000000.10101000.10110010. 11111111
Hosts/Net: 254                   Class C, Private Internet
```

Without a given subnetmask the subnet is automaticly detected using the address
range:

```
$ ipcalc 148.251.199.112/24
Address:   148.251.199.112      10010100.11111011.11000111. 01110000
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255            00000000.00000000.00000000. 11111111
=>
Network:   148.251.199.0/24     10010100.11111011.11000111. 00000000
HostMin:   148.251.199.1        10010100.11111011.11000111. 00000001
HostMax:   148.251.199.254      10010100.11111011.11000111. 11111110
Broadcast: 148.251.199.255      10010100.11111011.11000111. 11111111
Hosts/Net: 254                   Class B
```

If the first bit of the netmask in dotted notation is a zero it assumes an
inversed netmask:

```
$ ipcalc 148.251.199.112 0.0.0.255
WILDCARD
Address:   148.251.199.112      10010100.11111011.11000111. 01110000
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255            00000000.00000000.00000000. 11111111
=>
Network:   148.251.199.0/24     10010100.11111011.11000111. 00000000
HostMin:   148.251.199.1        10010100.11111011.11000111. 00000001
HostMax:   148.251.199.254      10010100.11111011.11000111. 11111110
Broadcast: 148.251.199.255      10010100.11111011.11000111. 11111111
Hosts/Net: 254                   Class B
```

It even can detect invalid netmask. Then ipcalc assumes the default netmask for
the IP range:

```
$ ipcalc 148.251.199.112 0.255.255.0
WILDCARD
INVALID NETMASK
INVALID MASK1:   0.255.255.0

Address:   148.251.199.112      10010100.11111011.11000111. 01110000
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255            00000000.00000000.00000000. 11111111
=>
Network:   148.251.199.0/24     10010100.11111011.11000111. 00000000
HostMin:   148.251.199.1        10010100.11111011.11000111. 00000001
HostMax:   148.251.199.254      10010100.11111011.11000111. 11111110
Broadcast: 148.251.199.255      10010100.11111011.11000111. 11111111
Hosts/Net: 254                   Class B
```

ipcalc is a neat script that helps with debugging complex subnet setups and plan
your network. If you like to learn more about ipcalc visit the
[website](http://jodies.de/ipcalc).
