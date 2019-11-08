+++
title="The Advent of Void: Day 9: mdbook"
date=2018-12-09
+++

Writing documentation often isn't as much fun as writing code, but in
many cases its more important than writing code.  Increasingly common
it is expected for project documentation to be available online.  A
well-known tool for converting markdown to html is gitbook, however
gitbook is written in nodejs, is slow, and has lots of edge cases
where it can break in obscure ways.

Similar to the OpenBSD community, the Rust community likes to
re-implement tools at a higher standard.  To replace gitbook, the Rust
community has written an excellent tool called
[mdbook](https://github.com/rust-lang-nursery/mdBook).

When you create a new mdbook, a small wizard guides you through the
process:

```
$ mdbook init

Do you want a .gitignore to be created? (y/n)
n
What title would you like to give the book?
Advent of Void
2018-12-08 22:09:54 [INFO] (mdbook::book::init): Creating a new book with stub content

All done, no errors...
```

The resulting stub book looks like this:

```
.
├── book
├── book.toml
└── src
    ├── SUMMARY.md
    └── chapter_1.md

2 directories, 3 files
```

If we were to render this book with `mdbook build` then the `book/`
subdirectory would be populated.

```
$ mdbook build
2018-12-08 22:13:08 [INFO] (mdbook::book): Book building has started
2018-12-08 22:13:08 [INFO] (mdbook::book): Running the html backend
$ tree .
.
├── book
│   ├── FontAwesome
│   │   ├── css
│   │   │   └── font-awesome.css
│   │   └── fonts
│   │       ├── FontAwesome.ttf
│   │       ├── fontawesome-webfont.eot
│   │       ├── fontawesome-webfont.svg
│   │       ├── fontawesome-webfont.ttf
│   │       ├── fontawesome-webfont.woff
│   │       └── fontawesome-webfont.woff2
│   ├── ayu-highlight.css
│   ├── book.js
│   ├── chapter_1.html
│   ├── clipboard.min.js
│   ├── css
│   │   ├── chrome.css
│   │   ├── general.css
│   │   ├── print.css
│   │   └── variables.css
│   ├── elasticlunr.min.js
│   ├── favicon.png
│   ├── highlight.css
│   ├── highlight.js
│   ├── index.html
│   ├── mark.min.js
│   ├── print.html
│   ├── searcher.js
│   ├── searchindex.js
│   ├── searchindex.json
│   └── tomorrow-night.css
├── book.toml
└── src
    ├── SUMMARY.md
    └── chapter_1.md

6 directories, 29 files
```

The book is now ready for serving and we could copy the `book/`
subdirectory anywhere we please for serving, even an AWS S3 bucket to
be served as a fully static bundle.

Of course, all of the files in `book/` are driven by the source files
in `src/`.  The `SUMMARY.md` file is a listing of the structure of the
book, and the `chapter_1.md` is a stub for a single chapter within the
book.

All of these files are easy to read markdown.  For example, here's the content of the summary file:

```
$ cat src/SUMMARY.md
# Summary

- [Chapter 1](./chapter_1.md)
```

And here's the content of the stub chapter file:

```
$ cat src/chapter_1.md
# Chapter 1
```

The ease of generating documentation books with mdbook means that you
can quickly and easily document almost anything.  Want to see a more
complex example?  Check out the [Void Documenation](https://docs.voidlinux.org)
which is built with `mdbook`.
