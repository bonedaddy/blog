---
title: "Ulog - A Lightweight And ThreadSafe Logger In C"
date: 2020-08-10T02:04:51-07:00
draft: false
keywords: ["valgrind", "logger", "c", "libs.garden", "memory leak", "color", "documentation", "ulog"]
series: [ "ulog" ]
images: ["/images/misc/valgrind_pls.img"]
---

![](/images/misc/valgrind_pls.png)

# Introduction

When I decided to start learning the C programming language, and after I got through reading introductory material, namely [The C Programming Language 2nd Edition](https://en.wikipedia.org/wiki/The_C_Programming_Language) as well as [Effective C: An Introduction to Professional C Programming](https://nostarch.com/Effective_C) I found myself wondering what can I work on that would help sharpen my newfound skillset. 

I figured that a good way to spend my time learning C, and one that would help me become more familiar with the language was to recreate common functionality that I use on a near day to day basis when programming with Golang. Primarily I figured that networking, synchronization and command line builder helpers.

While working on these tasks I ended up needing to log error messages, debug information, and just general logging capabilities. Unlike Golang which includes a pretty decent logger in the standard library, there is no such thing for C. Faced with this I had two options, write my own logger or use one written by someone else. 

By and large I prefer leveraging other software written by other people than writing yet another implementation of some desired functionality unless absolutely required. Although I suppose it doesnt really matter for hobby projects, I wanted to go the path of least resistance so I headed on over to one of my favourite websites called ["Libs Garden"](https://libs.garden/), a search engine type website focused on software, and searched for a fairly generic "logger" query. 

I found a number of different repositories, and started experimenting with some of them. Unfortunately one of the big things I noticed was that a lot of these repositories suffered from some combination of being a large and complex code base,  having undocumented APIs, no usage (or out of date) examples, even containing memory leaks. 

Large and complex codebases generally aren't too big of an issue most of the time, but when you factor in undocumented APIs, and inaccurate usage examples you increase the overhead required for figuring out how to use the API. When you throw memory leaks into the mix, the situation becomes even worse.

The biggest issue for me were the memory leaks, as I was trying to learn how to write quality C code free from memory leaks. Using a library that has memory leaks makes finding your own memory leaks a lot harder. Theoretically the memory leaks in these libraries could be patched, but that requires pouring through sometimes dozens of files, or extremely undocumented APIs. Quite quickly the path of least resistance became clear, and that was trying to write my own logger library.

# First Steps

Before starting to write the actual code, I figured that it would be best to settle on some short term goals. After a bit of thinking, and looking through other code bases I decided that I wanted a logger that was:

* Lightweight
* Free of memory leaks
* Easy to use
* Documented code along with usage examples
* Color coded output
* Standard out (stdout) and file based logging
* Didnt use global variables

Within about a day or two I had the first initial implementation of my logger that accomplished all my desired goals. Well almost all of them, it was actually pretty fucking annoying to use. Let me give an example of how I were to use the logger directly to emit an `DEBUG` log:

```C
thl->log(thl, 0, "this is a debug log", LOG_LEVELS_DEBUG);
```

Want to send logs to a file and stdout? It got even worse

```C
fhl->thl->log(fhl->thl, fhl->file_descriptor, "this is an debug log", LOG_LEVELS_DEBUG);
```

While this might've been lightweight, free of memory leaks, and documented its not exactly easy to use. That's a lot of typing to do just for a simple log and that's coming from someone who can type up to 130 words per minute. Well I didn't want to spend too much time on this as I had some other code I wanted to write. To be honest I also wasn't sure how exactly to fix this problem without using global variables.

So I tabled refactor to later and had a logger that I was reasonable comfortable using for hobby projects. However given my experience with C loggers, I felt like having a better version that I made explicitly available as an individual package others could use would be helpful. So I spent a bit of time thinking about possible improvements whenever I had some downtime from the other tasks I was workiung on.

# One Month Later

About a month went by when I was starting to get tired of using this logger. The typing was getting pretty annoying, and it was clear that for this to be used in the long run by myself, and perhaps others that the method of emitting logs needed to be refactored. 

Quickly I became stuck on not using globals, so I decided to go back to some of the other logging libraries I had seen, and noticed that they were prodimantly using macros as the method of calling the functions to emit logs. I was a bit dumbfounded as it was such a simple solution but for whatever reason I had not thought of it before, likely being new to C and having been scared away from macro hell.

So I wrote some macros that dealt with all the struct pointer member referencing, etc... and the solution ended up being extremely easy to use with minimal typing. In stdout logging ended up requiring approximately 2x less typing, while file logging ended up requiring approximatey 3x less typing. Given this, lets show what the previous examples look like now using macros:


```C
LOG_DEBUG(thl, 0, "this is a debug log");
```

And the file logger:

```C
LOG_DEBUG(fhl->thl, fhl->fd, "this is a debug log");
```

And with this, the current version of `ulog` was born, one that was lightweight, free of memory leaks, documented *and* easy to use. Now if you're like me, you'll notice something about the file logging macro. It's still kind of annoying to use, since you need to reference the `thl` and `fd` struct members. A solution to this would be additional macros targets towards the file logger that deal with the struct member reference internally so you would end up with something like

```C
FLOG_DEBUG(fhl, "this is a debug log");
```

I'm still not sure if this is the correct path forward, and will likely simmer on it for sometime until I can (or cant) think of a better idea, or if I get any angry github issues. 


# Thanks For Reading

Thanks for reading! Interested in using `ulog` in your own projects, or throwing it a star on github? Head on over to [bonedaddy/ulog](https://github.com/bonedaddy/ulog).