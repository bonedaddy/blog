---
title: "Ulog v0.0.3 Released"
date: 2020-12-16T15:59:09-08:00
keywords: ["valgrind", "logger", "c", "libs.garden", "memory leak", "color", "documentation", "ulog"]
series: [ "ulog" ]
draft: false
---

Earlier today I released a [new version](https://github.com/bonedaddy/ulog/releases/tag/v0.0.3) of [ulog](https://github.com/bonedaddy/ulog) which is a [lightweight and threadsafe logger](/blog/misc/ulog_lightweight_threadsafe/) with support for C/C++.  This release combines a few different changes over the last several months, most notably full support for C++ code, and simplified macro usage for file logging. Below I'll detail the various improvements

# Full Support For C++ Code 

It appears that string handling in C++ is slightly different than C, with "strings" defaulting to a `const char *` type, whereas in C defaulting to a `char *` type. This lead to issues compiling C++ code using `ulog` mainly due to the typedefs for the logging functions. 

For C we declare the typedefs for the logging functions as follows

```C++
typedef void (*log_fn)(struct thread_logger *thl, int file_descriptor, char *message,
                       LOG_LEVELS level, char *file, int line);
```

However for C++ to properly handle strings passed in like `"hello world"`, we would need to change the type of `message` to `const char *`, which looks like:

```C++
typedef void (*log_fn)(struct thread_logger *thl, int file_descriptor,
                       const char *message, LOG_LEVELS level, const char *file,
                       int line);
```

After making these changes to all parts of the codebase, you can now fully use ulog in C++ code.

# Simplified Macro Usage

Perhaps the most annoying part of ulog was the way I had macros written. In an attempt to reduce lines of code, I wrote the macros in a way that they could be reused for both the stdout logger (thread_logger) and the file + stdout logger (file_logger).

Thus the macros had a declaration like `#define LOG_DEBUG(thl, fd, msg)` where `thl` would be an instance of `thread_logger`, `fd` being the file descriptor to use for writing logs, and `msg` being the actual message to log. This meant that if you were just using the `thread_logger`, you would have to supply a `0` value for the `fd` argument. Using the file logger logger? You had to reference the embedded `thl` field.

This meant that an invocation of `LOG_DEBUG` for the file logger looks like

```C++
LOG_DEBUG(fhl->thl, fhl->fd, "this is a debug log");
```

Now an invocation of `LOG_DEBUG` for the stdout looger looks like

```C++
LOG_DEBUG(thl, 0, "this is a debug log");
```

Both of these two invocations have undesriable aspects to them. The file logging invocation requires repeated struct field referencing, which increases the typing overhead. With large codebases this proves to be tedious and annoying. Now the stdout logger is mostly personal preference, but supplying a `0` when its not actually needed looks.... not nice? I'm not sure what it is, but it bothers me.

The solution to this was to have macros specifically for stdout logging, and macros specifically for file logging. The stdout logging macros remove the `fd` parameter, while the file logging macros take in the `file_logger` type, and handle struct field referencing internally.

The change results in the file logging invocation look like

```C++
fLOG_DEBUG(fhl, "this is a debug log");
```

while the stdout logging looks like

```C++
LOG_DEBUG(thl, "this is a debug log");
````

# Colored Write Memory Allocation Removal

When writing colored logs, previously a chunk of memory was allocated for a char pointer. This would allocate enough memory to store the ANSI color code for the desired log level, the message itself, space at the end for the ANSI reset color code, and a new line character.

This was done as follows `char *write_message = calloc(1, strlen(pcolor) + strlen(reset) + strlen(message) + 2);`. Since all we're doing with this chunk of memory is storing the message, followed by passing `write_message` into the `write` function, there is actually no need to allocate a chunk of memory in the first place. Instead we can use a stack alloated array, thus avoiding heap allocations entirely.

The new code is as folllows:

```C
size_t write_msg_size = strlen(pcolor) + strlen(reset) + strlen(message) + 2; // 2 for \n
char write_message[write_msg_size];
memset(write_message, 0, write_msg_size);
```

And just like that we no longer need to allocate memory, and free the memory resulting in both memory efficiency improvements, as well as general performance improvements.