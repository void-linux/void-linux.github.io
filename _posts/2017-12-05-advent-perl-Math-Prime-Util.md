---
layout: post
title: "The Advent of Void: Day 5: perl-Math-Prime-Util"
comments: true
---

Folks that enjoy playing with numbers and riddles probably know
[factor(1)](https://man.voidlinux.eu/factor.1), a small tool of
coreutils to factorize a number:

```
% factor {32077..32079}
32077: 32077
32078: 2 43 373
32079: 3 17 17 37
```

Likewise, we can compute random prime numbers with libressl:

```
% openssl prime -generate -bits 16
63719
% factor 63719
63719: 63719
```

This works pretty well for numbers up to a certain size, but trying to
check a 160-bit prime already takes a few seconds.

Luckily, there is
[Math::Prime::Util](https://man.voidlinux.eu/Math::Prime::Util),
a Perl library consisting of "utilities related to prime numbers,
including fast sieves and factoring".  And it also contains two
command line tools `primes.pl` and `factor.pl`, which are far more
powerful than above tools.

For example, we can find all the first siblings of the prime twins below 100:

```
% primes.pl --twin 100 | fmt
3 5 11 17 29 41 59 71
```

Or compute all primes between 2<sup>256</sup> and 2<sup>256</sup>+1000:

```
% primes.pl '2**256' +1000
115792089237316195423570985008687907853269984665640564039457584007913129640233
115792089237316195423570985008687907853269984665640564039457584007913129640237
115792089237316195423570985008687907853269984665640564039457584007913129640293
115792089237316195423570985008687907853269984665640564039457584007913129640423
115792089237316195423570985008687907853269984665640564039457584007913129640519
115792089237316195423570985008687907853269984665640564039457584007913129640693
115792089237316195423570985008687907853269984665640564039457584007913129640731
115792089237316195423570985008687907853269984665640564039457584007913129640743
115792089237316195423570985008687907853269984665640564039457584007913129640783
115792089237316195423570985008687907853269984665640564039457584007913129640867
```

`factor.pl` uses quite fancy algorithms, and has no trouble
factorizing this 3⨯64-bit number, with `--verbose` it even says what
it is trying:

```
% dc <<<'16356729367488596873 17354808482073126563 18118954313623728623 * * p' |
    factor.pl --verbose
...
small ecm (40k,40) found factor 18118954313623728623
SIMPQS found factor 16356729367488596873
...
5143389612051975703439435217628486568888382710496544633877:
    16356729367488596873 17354808482073126563 18118954313623728623
```

Finally we can look at all palindromic primes with 12 digits:

```
% primes.pl --palindr '10**12' '10**13'
1000008000001
1000017100001
1000024200001
1000027200001
...
9999961699999
9999970799999
9999980899999
9999987899999
```