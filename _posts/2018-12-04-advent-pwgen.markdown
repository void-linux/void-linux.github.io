---
layout: post
title: "The Advent of Void: Day 4: pwgen"
---

[pwgen(1)](https://man.voidlinux.org/pwgen) is a small tool to generate
passwords that can easily be memorized by humans.

In the default configuration pwgen will generate a table of 8 character
passwords.

```
$ pwgen
oePa1oox tidoo4Ig WaiK2goh Ga6yei2t Enois1ch aeraf6Ai Heafu8xa aiT4iung
Ohthoo3a siequ2Ah ied4luiS ee0daiCa ooQu8ohl ooBaiCh7 Xohng3if Phei2leo
kei4AMie ieCh6yoo OiB0Heth vaeh4Ji5 aebiY5Su Que5iQuo Aewahn6o noo5AV0e
Ahbei9ul Caigh7lo Chiez3ou Faeng2ph eiXei9ee eex2DohN shoath5N haish3Vi
aeTh9taa Cephee8o ioz8Ohta Ush8aej1 tai4eiN3 Vae3Mai7 uipaiL4l geZ7fa7E
dii9Ahng uoHui2sh Pue9Faep uchoe6Ea AhrooTh9 mohz5Eim iem6Eim8 OoGoh6oi
Iey6ahy5 thoe6Aiv Od8ye9mi eS8eeCoo Thoih1Ai zogheiB4 uChah7ce EeBai8ai
kir8ePua xohBah0b iem3Chuo tah6vuPi oi3Ukuew ohZ5aeng iec2eiTh AhGaeMo4
tuTeiG9e Shah8Oow eey2eeZi Kaicoh2e oiGie2ai cuB5da7o aesh9Kei eejeVai8
dah2iQua Ahb5eequ Wai2ood3 eTou8noo queep5Ei oong6Egh rae8auFi hee9Aiha
uiF9eego Iudu1aej Eeng0eiy lie9Ohmo Lee1ieku AhW3johz Oph0eung adu6Ohph
se3Ieviu KohBee3v Siej9iep uac6Jaip choh3Thi el9zaaDa vi0loh7E Thoush9w
ieHai0oi moP1Ohtu ieShe8ro rei9Tha1 oi0Daigh zovei3Tu Uwooj0mu eeL4Baik
phoo8aeG Ciephee5 foy1rohN Gue4vie6 Xoh7bie9 eF6feime Vi1av6ch yieNo2uv
ye1NahHa ti2eVeek OiWaeyi1 eiy4Iech kie2Giek Ui5ahjai Aehoh2go iv5vaiWu
zee3Xied Ubuo2soo eex6vahV aineM0Oo Ainoex9i Ahje7zo6 Daid0oum Fu2dooPh
Reb6fulu leLoh1qu Een4ohzo Leip8ieb eeRoht8i koCohd5d ii9Oo6zi Seem5ohS
OonaH0je ooquieK1 Daet5wae AhthieV6 EiD4wieg Oot8gohn IezoRie2 biuN4die
nishieX6 Tie3beiy uNg3zaef xeiSe2tu shei8uMo oWah0Wee eCahch1a jieL0fei
EeYo6Sha EMushoh1 ahY2Ooba Ai1iitha mo8suChe ohX4jaep PhiThef7 fee1Fain
```

If the output is not a tty pwgen will generate just one password for you. This
eases the use of pwgen in scripts:

```
$ export PASSWORD=$(pwgen)
$ echo $PASSWORD
Yah6Pho4
```

For longer (or shorter) passwords pwgen will read the password length from the
first parameter:

```
$ pwgen 32
iengiaB6ahg6Egh9awaephaeX8jobip0 kec9sha8bohmooNg4AthiShiex0ahKem
zoogeiw5eiJahthae5Aephae6aipei9i ohh1fuoQu3HeeZah2Esh5nungi8Eiruc
fash1ais3Dahr8AeTaequae8tahj4eeJ tae1ogha3ooyoqu4Eexiruk0Tah8fie4
ot5ahyaigei9ohshoothiuNeeth0laem Xohhee2cheiHohvohvaeg0Boov2theiy
autael5Emoochooqu4uRo7aigaewohzi hah8eil3oojaekaiQuae7Ar9phieFeix
thi4rei1ieNgeelohleowazai6laezah shiejoo2iepekeir9ahHeshah9aepae4
AeSho7uc5sha1foopaw9eihoh4aizoh8 pheisoo5aiteixeis4eigho7na7Ais2u
pi4Pah1tualuYeephooXie8AhNang1AG Ki8ooph8niez2aeC0yiur0The6jaZah4
wahNSA0haS1yOu5ijizifohD2Ieji6ie gah3phaiqu5aeghu4Ei6queeWei5phae
pheghe9rai6zohcaenguereiVuengaeX yohB4iu3aib2shohJoof5oof2hiz8Equ
iMoi6aixaehie2feechee1au3eayooHu ieniethohyoxiJaiTh6wo5LiTho1va5K
mahW3aaV9eyeb7vaelo6dahVui7AleoX ighaeNueFue2aigahpheuYeefaiLie1u
aerahT5aeg0aap8equ3dahphun4athoh deeg8leebooPaisie9ahv2ucai9oong2
shai3xooph8Ohwai2tur1eKaeDish0Sa uuKei5aethaiSher4Wooh7oaphies0wo
Uo5equoh5phee9beetod6phee5bohWae tumeyaeSu5paem6kohkoo4eu5ohghae3
oufaic4AhHuv8queiRopeishioVi1ega wae6IeRie0aighiek9iep7pi7ietee0u
kuhooBooW3zili0kee9aicheichohnge Keethuowa7ziB0iekoiLikei1Ahwie5a
eik6Faegh4kahnait8ve0cheithaed9S EecheeJ8rai5ech0ejeHahkooc2uhu9m
iiv8Geeg5ua1ot1yohv9eil7ueSeeth7 Teethee9zaibahbaimahjai3oJ0Aibei
uthai6UQua8eet6xook7ae8dane5XieK zee7fahHeiwooquiekiewi5laiwiek8e
```

If you like to reduce or increase the number of generated passwords you may
define that in the second argument:

```
$ pwgen 32 2
zagee2phahfah4da2ooxeif6Taaz2ohy ieChiengooh7eez6aepoPhuk9upeipah
```

If you don't depend on brain-memory you can use the `-s` flag to generate
passwords from completely random characters

```
pwgen -s 32 2
DWqsuGX7LZH4eSNLlj0ic8gaOAaJpc4o 8qQ8JGDVwkHokeJuyZP3xHsz84GhSZVV
```

pwgen support various options to define password rules. For more information on
that and all other options consult the [pwgen(1)
manpage](https://man.voidlinux.org/pwgen)
