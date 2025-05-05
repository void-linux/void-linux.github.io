---
layout: post
title: "The Advent of Void: Day 23: ledger"
comments: true
---

Day 23, almost the end of the year. You may consider that it's time to look
back and take stock of your month, or your year. An accounting, if you will.
Fortunately we have a package or two for that: `ledger` and `hledger`. The
second one is a rewrite of the first in Haskell, while the first is the one
that sets the spec.

I must apologize in advance: I am not an accountant, so I may confuse the
powerful concepts on which accounting depends. Please bear with me, and feel
free to let me know of any corrections.

These are accounting tools, with powerful features I never need to use, web
interfaces I don't need (but maybe others in our lives would desire), but are
easy to use with text files with a simple format.

To pass a file to ledger (or hledger), just call `ledger -f
path/to/ledger.file`, and make sure the file contains entries (or even just
one) of the format:

```
2017-12-25	My true love gave to me
	Equity:TrueLove		-1 partridge
	Assets			1 partridge
```

The notion behind the ledger format is the same as double entry accounting.
What goes in must come out, or everything must come from somewhere. If you take
$5 from one place, it has to go somewhere else, in that same transaction.

```
2017-12-26	My true love gave to me and I paid back Tom
	Equity:TrueLove		-2 turtledove
	Assets			1 turtledove
	Assets:Tom		1 turtledove
```

For instance, the following ledger entry will throw an error because nothing
matches!

```
2017-12-27	My true love gave to me
	Equity:TrueLove		-$3
	Assets			$1
	Assets:Tom		$1
```

(I switched to units where I could be certain the double entry mechanisms are
checked. They don't seem to be for french_hens.)

The [ledger manual](https://www.ledger-cli.org/3.0/doc/ledger3.html) has a lot
of information about all the things ledger supports, including inline maths and
stock prices.

May your books forever be balanced!
