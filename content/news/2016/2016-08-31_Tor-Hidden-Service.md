+++
title="We Love Your Privacy: repo.voidlinux.eu as tor hidden service"
date=2016-08-31
+++

The Void Linux Community is pleased to announce that our main repository- and build servers are now available as tor hidden services.

The onion addresses are:

* [repo.voidlinux.eu](https://repo.voidlinux.eu):  
  onion address: [fd6dqrupy3af4xwb.onion](http://fd6dqrupy3af4xwb.onion)
* [build.voidlinux.eu](https://build.voidlinux.eu):  
  onion address: [http://s7y2awkwau4nbdpu.onion](http://s7y2awkwau4nbdpu.onion)

Feel free to test the onion addresses with xbps:

```
# torsocks xbps-install -M -i --repository=http://fd6dqrupy3af4xwb.onion/current xbps
```
