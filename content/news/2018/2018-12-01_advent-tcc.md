+++
title="The Advent of Void: Day 1: tcc"
date=2018-12-01
+++

[tcc(1)](https://man.voidlinux.org/tcc) is a small and fast C compiler that
allows to run C source code as script. So when bash doesn't cut it and python or
ruby is too fancy, tcc may be what you want.

```C
#include <stdio.h>

int main()
{
	printf("Hello %s\n", argv[1]);
	return 0;
}
```

Given this simple Hello World C *script* you can simply run it via the following
call:

```bash
$ tcc -run hello.c Void
Hello Void
```

After the `-run <FILE>` argument all following parameters will be passed to the
script as `argv`.

tcc even supports shebangs so you'll get the full scripting experience:

```C
#!/usr/bin/tcc -run
#include <stdio.h>

int main(int argc, char *argv[])
{
	printf("Hello %s\n", argv[0]);
	return 0;
}
```

Afterwards, just like any other scripting language, add executable permission
and call it:

```bash
$ chmod +x hello.c
$ ./hello.c Void
Hello Void
```

Unfortunately, tcc doesn't cover the full C standard yet. For most small
scripting like tasks tcc is more than enough.

You can find more informations about tcc on its
[website](https://bellard.org/tcc/) or on the [tcc(1)
manpage](https://man.voidlinux.org/tcc)
