---
title: "Ulog - A Lightweight And ThreadSafe Logger In C"
date: 2020-08-10T02:04:51-07:00
draft: true
---

# Introduction

When I decided to start learning the C programming language, and after I got through reading introductory material, namely [The C Programming Language 2nd Edition](https://en.wikipedia.org/wiki/The_C_Programming_Language) as well as [Effective C: An Introduction to Professional C Programming](https://nostarch.com/Effective_C) I found myself wondering what can I work on that would help sharpen my newfound skillset. I decided that a good set of projects to work on would be replicating things I use on a day to day basis when writing software using the Golang programming language. This largely included network helpers, synchronization primitives, and a command line builder. 

While working on these tasks I ended up needing to log error messages, debug information, and just general logging capabilities. By and large I prefer leveraging other software written by other people than writing yet another implementation of some desired functionality. Although I suppose it doesnt really matter for hobby projects, I wanted to go the path of least resistance so I headed on over to one of my favourite websites called ["Libs Garden"](https://libs.garden/), a search engine type website focused on software, and searched for a fairly generic "logger" query. 

I found a number of different repositories, and started experimenting with some of them. Unfortunately one of the big things I noticed was that a lot of these repositories were large and complex code bases, undocumented APIs, no usage (or out of date) examples while also containing memory leaks. Large and complex codebases really don't matter, but when you factor in undocumented APIs, and inaccurate usage examples you increase the overhead required for figuring out how to use the API. When you throw memory leaks into the mix, the situation becomes even worse.

Given all this, I figured I might as well try my hand at writing a logger library.


# First Steps

Before I actually started writing the logger library, I tried to see if there were existing solutions that could be leveraged. Although I suppose it doesn't really matter when working on a hobby project, one thing I've learned after a few years of writing software is that its better to reuse programs written by other people wherever possible. 
Searching through the C portion of the website I searched for a fairly generic "logger" query, and went through the results. While experimenting with the various libraries I noticed that a lot of them were pretty complex code bases spanning multiple files, sometimes ranging up to dozens or even two dozens of files. I also noticed something while running these through valgrind, and that was a number of the libraries suffered memory leaks. In most cases documentation and usage examples where also sparse.

Maybe this is a pet peeve of mine, but I really dislike having to pour through undocumented code figuring out how to use a new API unless there is absolutely no other option available. I would prefer writing a new (and documented) library that accomplishes the functionality I want, than to grapple with an undocumented codebase. Given this I decided I would write my own logging library.

# 