---
layout: post
title: "The Advent of Void: Day 10: nload"
comments: true
---

[nload(1)](http://www.roland-riegel.de/nload/) is a tool to display the current network usage.


nload can be installed from the Void Linux repository:

```
xbps-install nload
```

By default, `nload` monitors all available network interfaces and displays the traffic of the first interface.

```
$ nload

Device eth0 [192.168.1.10] (1/5):
=========================================================================================
Incoming:







                                          .                             Curr: 1.29 MBit/s
                                          #| .                          Avg: 859.19 kBit/s
                     |                    ##|##             .|||||      Min: 0.00 Bit/s
      |.  .  .      .#.                  |#####|....|#|||#||#######||.  Max: 3.79 MBit/s
||||||## .##.#|.|.. ####| .|#|    ..     #############################  Ttl: 7.71 GByte
Outgoing:
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################
#                                        #############################  Curr: 43.34 MBit/s
#                                        #############################  Avg: 18.70 MBit/s
#                                        #############################  Min: 0.00 Bit/s
# ||. .|  ..  |.     #.#.          #. .# #############################  Max: 83.02 MBit/s
#########.##.###||| ##### .###. .|###|##|#############################  Ttl: 378.92 MByte
```

A different interface can be displayed, either by using arrow keys to iterate over the list of interfaces,
or by passing the interface name as an argument to `nload`.

Multiple interfaces can be shown simultaneously, without graphs, by using the `-m` flag:

```
$ nload -m wlan0 eth0

Device wlan0 [10.0.0.10] (1/2):
=========================================================================================
Incoming:                                           Outgoing:
Curr: 0.00 Bit/s                                    Curr: 0.00 Bit/s
Avg: 0.00 Bit/s                                     Avg: 0.00 Bit/s
Min: 0.00 Bit/s                                     Min: 0.00 Bit/s
Max: 0.00 Bit/s                                     Max: 0.00 Bit/s
Ttl: 591.50 MByte                                   Ttl: 37.22 MByte

Device eth0 [192.168.1.10] (2/2):
=========================================================================================
Incoming:                                           Outgoing:
Curr: 45.82 kBit/s                                  Curr: 28.70 kBit/s
Avg: 13.97 kBit/s                                   Avg: 6.76 kBit/s
Min: 0.00 Bit/s                                     Min: 0.00 Bit/s
Max: 333.96 kBit/s                                  Max: 61.61 kBit/s
Ttl: 7.83 GByte                                     Ttl: 3.99 GByte
```
