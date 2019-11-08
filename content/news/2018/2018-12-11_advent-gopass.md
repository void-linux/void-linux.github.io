+++
title="The Advent of Void: Day 11: gopass"
date=2018-12-11
+++

One very important aspect of our work, until a fully passwordless future can be
upon us, is password management. Some people choose to use tools like LastPass,
or other online password management schemes. But what do you do if you are
really paranoid? Enter, `pass`, and it's written-in-go companion with more
features: `gopass`.

We can start our journey with the help of a wizard.

```
[nakasone@gibson ~]$ gopass
It seems you are new to gopass. Do you want to run the onboarding wizard? [Y/n/q]:
[init] No useable crypto keys. Generating new key pair
[init] [crypto] Key generation may take up to a few minutes
[init] [crypto] Creating key pair ...
[init] [crypto] WARNING: We are about to generate some GPG keys.
[init] [crypto] However, the GPG program can sometimes lock up, displaying the following:
"We need to generate a lot of random bytes."
If this happens, please see the following tips:
https://github.com/gopasspw/gopass/blob/master/docs/entropy.md
Continue? [Y/n/q]:
gpg (GnuPG) 2.2.11; Copyright (C) 2018 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Note: Use "gpg2 --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: John Smith
Email address: John.Smith@example.com
You selected this USER-ID:
    "John Smith <John.Smith@example.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key F90F4F27E8F3BCBE marked as ultimately trusted
gpg: directory '/home/nakasone/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/nakasone/.gnupg/openpgp-revocs.d/1D9F3C091EB8211439B9F80BF90F4F27E8F3BCBE.rev'
public and secret key created and signed.

pub   rsa2048 2018-12-11 [SC] [expires: 2020-12-10]
      1D9F3C091EB8211439B9F80BF90F4F27E8F3BCBE
uid                      John Smith <John.Smith@example.com>
sub   rsa2048 2018-12-11 [E] [expires: 2020-12-10]

 -> OK

Error: failed to run onboarding wizard: failed to create new private key: failed to create a useable key pair
[nakasone@gibson ~]$
```

Well, that was weird. But I can do this, let's try again.

```
[nakasone@gibson ~]$ gopass init
[init] Initializing a new password store ...
Please select a private key for encrypting secrets:
[0] gpg - 0x6EB42A8FCB19121B - John Smith <John.Smith@example.com>
Please enter the number of a key (0-0, [q]uit) [0]:
[init] Initializing git repository (gitcli) ...
Use John Smith (John.Smith@example.com) for password store git config? [Y/n/q]:
[init] Git initialized
[init] Password store /home/nakasone/.password-store initialized for:
[init]   0x6EB42A8FCB19121B - John Smith <John.Smith@example.com>
[nakasone@gibson ~]$
```

Now that we have a password store, let's look at this.

```
[nakasone@gibson ~]$ gopass
gopass

```

Anti-climactic to be sure, but let's try using it a bit. We have a front gate,
let's put in my code.

```
[nakasone@gibson ~]$ gopass insert front-gate
Enter password for front-gate:
Retype password for front-gate:
Warning: Password is too short
```

Well, duh, I've been telling the guards that 1234 is not a reasonable code! But
we have a back gate too.

```
[nakasone@gibson ~]$ gopass insert back-gate
Enter password for back-gate:
Retype password for back-gate:
Warning: Password is too short
```

Yes, it's not acceptable. Cry me a river.

```
[nakasone@gibson ~]$ gopass
gopass
├── back-gate
└── front-gate

[nakasone@gibson ~]$ gopass audit
Auditing passwords for common flaws ...
Checking 2 secrets. This may take some time ...

2 of 2 secrets checked                                      [################################################] 100.00%
Detected a shared secret for:
        - back-gate
        - front-gate
Password is too short:
        - back-gate
        - front-gate
2018/12/11 00:16:28 found weak passwords or duplicates
[nakasone@gibson ~]$
```

We need a better gate code. Let's get one. Security says we can't have more
than 5 characters...

```
[nakasone@gibson ~]$ gopass generate new-front-gate
How long should the password be? [24]: 5
Do you have strict rules to include different character classes? [y/N/q]:
[nakasone@gibson ~]$ gopass
gopass
├── back-gate
├── front-gate
└── new-front-gate

[nakasone@gibson ~]$ gopass  show new-front-gate
nMzke
[nakasone@gibson ~]$
```

Well, that should do. We don't have any time based logins, so we can't generate
otp or totp or hotp tokens to show you, but that's what there is.

```
[nakasone@gibson ~]$ gopass rm back-gate
Are you sure you would like to delete back-gate? [y/N/q]: y
[nakasone@gibson ~]$ gopass mv new-front-gate front-gate
front-gate already exists. Overwrite it? [y/N/q]: y
Warning: git has no remote. Ignoring auto-push option
Run: gopass git remote add origin ...
[nakasone@gibson ~]$ gopass
gopass
└── front-gate
```

As you can see, gopass reminds us our password store isn't backed up. Well,
let's do that really quickly.

```
[nakasone@gibson ~]$ gopass git remote add origin git@github.com:void-linux/fortress-pws.git
[nakasone@gibson ~]$ git sync
Sync starting ...
[<root>]
   git pull and push ...
All done
[nakasone@gibson ~]$
```

Maybe we can also record some of those useful passwords we have learned.

```
[nakasone@gibson ~]$ gopass insert github/torvalds
Enter password for github/torvalds:
Retype password for github/torvalds:
[nakasone@gibson ~]$ gopass insert github/bob-beck
Enter password for github/bob-beck:
Retype password for github/bob-beck:
[nakasone@gibson ~]$ gopass
gopass
├── github
│   ├── bob-beck
│   └── torvalds
└── front-gate
[nakasone@gibson ~]$ gopass sync
Sync starting ...
[<root>]
   git pull and push ...
All done
[nakasone@gibson ~]$
```

Tada, we have now created some passwords, and syncronized them with a backup!
Like all the people with LastPass, our passwords are safe from a destruction of
our computer, and protected with the finest gpg has to offer! So fine, in fact,
we can push valuable assets to github, and be assured they will not be read. Of
course, the names of those assets, and our organization of them, is still
publicly visible:

```
[nakasone@gibson ~]$ find .password-store
.password-store/.git/ # snip
.password-store/front-gate.gpg
.password-store/github/
.password-store/github/jeremy.gpg
.password-store/github/torvalds.gpg
.password-store/.gpg-id
.password-store/.public-keys
.password-store/.public-keys/0x6EB42A8FCB19121B
```

Obviously, it might be best to store usernames on one line, and passwords on
the second (you can have multiline secrets in gopass). In such a scheme, the
identity of the assets or usernames you hold can be better protected. But all
of that can be handled with gopass, on your computer, trusting nobody else, and
can be scripted however you please. There are gopass plugins for firefox and
chrome, but the author has not had any success with testing those.

`gopass`: With a little bit more work, you can be paranoid and have a password
manager too!
