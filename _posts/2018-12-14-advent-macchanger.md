---
layout: post
title: "The Advent of Void: Day 14: macchanger"
comments: true
---

[macchanger(1)](https://man.voidlinux.org/macchanger) is a tool that helps you
setting a random but correct MAC address on a network interface.

MAC (Media Access Control) addresses are an unique identifier assigned to
network interface controllers. They are used at the data link layer to address
NICs in a network. Every NIC has a (pseudo-)unique address burned in. This makes
it easy to recognize and identify your device if you connect to a network or
even if your WiFi adapter is only scanning for networks. To secure a device from
tracking you can change the mac address. Also changing the MAC address in high
availability setups can be helpful: Taking over a MAC address from a crashed
systems on the failover can reduce the downtime in some scenarios.

In both cases you can use macchanger to set new mac addresses on a NIC.

To show the current MAC address of `eth0` run the following:

```
$ macchanger eth0
Current MAC:   18:5e:0f:31:7f:cc (unknown)
Permanent MAC: 5a:68:a5:ca:cd:c3 (unknown)
```

To change the MAC address of the device to a completely random one add the `-a`
flag:

```
$ macchanger -a eth0
Current MAC:   18:5e:0f:31:7f:cc (unknown)
Permanent MAC: 5a:68:a5:ca:cd:c3 (unknown)
New MAC:       00:21:d5:da:a4:bd (X2E GmbH)
```

To set a static MAC address on your device use the `-m` option:

```
$ macchanger -m 02:42:99:aa:48:47 eth0
Current MAC:   18:5e:0f:31:7f:cc (unknown)
Permanent MAC: 5a:68:a5:ca:cd:c3 (unknown)
New MAC:       00:21:d5:da:a4:bd (X2E GmbH)
```

For more information about macchanger please consider the [manpage](https://man.voidlinux.org/macchanger)
