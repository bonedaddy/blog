---
title: "Easily Run CI For Your C/C++ Codebases With TravisCI"
date: 2020-07-21T00:27:19-07:00
draft: false
keywords: [ "c", "cpp", "cxx", "circleci", "travisci", "ci/cd", "ci", "cd", "golang", "gcc" ]
---

# Introduction

Recently I started learning the C programming language. Coming from a language such as Golang, I was a bit lost on how to do traditional code development practices, namely CI (Continuous Integration). With Golang the information is pretty easy to find for a variety of different CI providers; But C on the otherhand, not so much. 

# A First Attempt

Within the last 3-4 months I began using CircleCI for all of my Golang projects to great success. As such my first choice for CI with codebases written in C, was CircleCI. Having been familiar with their website before, I checked out the supported language documentation and C was listed there. Unfortunately it was the only supported language that didnt have a dedicated getting started guide. As one does in this situation, I went to the Oracle known as DuckDuckGo but that adventure stopped pretty quickly. I wasn't getting much luck on DuckDuckGo, so I tried Google. This provided a few more sprinklings of knowledge, but ultimately nothing concrete enough to be able to easily go off and write a CircleCI configuration that could build my C codebases.

Now if I really wanted to bust my balls and get CircleCI working with C, I could *probably* do that, but quite frankly after spending three years working with the undocumented hell known as IPFS, I've had my fair share of hours spent banging my head against a wall wondering why the hell didnt the developers document this shit.

# An Old Friend

Before moving to CircleCI I used TravisCI quite frequently, but had to move to CircleCI as an update that was made to TravisCI broke go modules support with private github repositories. CircleCI is much more configurable than TravisCI, and lets you do nice things such as change the resources of the docker nodes used to build your code. This comes at a cost however, and CircleCI is a lot more complex to configure than TravisCI. Now the one thing TravisCI beats CircleCI by a mile with, is documentation for C/C++ projects. As you can see [when it comes to C](https://docs.travis-ci.com/user/languages/c/), [or C++](https://docs.travis-ci.com/user/languages/cpp/) there is no shortage of documentation. It's also rather easy to select between multiple different compiler versions, something which on the surface at least seemed rather difficult to do with CircleCI.

# An Actual Configuration

At the most basic level, you'll want to specify the distribution to use as the base image for all your code building, the language, and whether or not sudo is required. As you can see by the following code snippet, all it takes is 8 lines and you've got that done. Contrast this with CircleCI, in about 15->16 lines of code I wasn't even able to get a similar setup done.

```yaml
dist: trusty
sudo: required
language:
  - cpp
  - c
compiler:
  - gcc
```

Now the one downside with the previous snippet, is you'll have to use whatever is the default compiler versions shipped with the distribution. Want to specify an alternate compiler? Easy, just append the following to the end of your TravisCI configuration file, and you'll have GCC-9 installed for both C, and C++:

```yaml
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - gcc-9
      - g++-9
```


Now what about building the actual project? If you check out the TravisCI documentation, the default behavior is to run to use autotools, running the command `./configure && make && make test`. But what if you use something else, say, CMake? Well it's pretty easy to install that as well in a version compatible for your compiler versions, simply change the previous code sample to

```yaml
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - gcc-9
      - g++-9
      - cmake
```

Just like that you have CMake installed, but it wont be used as the build script so you have to change the default configuration with a `script` section. The following `script` section changes the default settings to configure the new compiler versions, and run `make` to kick off your CMake build process:

```yaml
script:
  # Link gcc-9 and g++-9 to their standard commands
  - sudo ln -s /usr/bin/gcc-9 /usr/local/bin/gcc
  - sudo ln -s /usr/bin/g++-9 /usr/local/bin/g++
  # Export CC and CXX to tell cmake which compiler to use
  - export CC=/usr/bin/gcc-9
  - export CXX=/usr/bin/g++-9
  # Check versions of gcc, g++ and cmake
  - gcc -v && g++ -v && cmake --version
  # build your projcet with cmake, this does require a Makefile appropriately configured in the root directory
  - make 
  # this part is optional and is only required if you want to run unit testing as part of your CI process.
  - cd build && ctest --extra-verbose
```

And by now you've got a full TravisCI environment setup for building whatever C/C++ code you throw at it:

```yaml
dist: trusty

sudo: required

language:
  - cpp
  - c

compiler:
  - gcc

addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - gcc-9
      - g++-9
      - cmake

script:
  # Link gcc-9 and g++-9 to their standard commands
  - sudo ln -s /usr/bin/gcc-9 /usr/local/bin/gcc
  - sudo ln -s /usr/bin/g++-9 /usr/local/bin/g++
  # Export CC and CXX to tell cmake which compiler to use
  - export CC=/usr/bin/gcc-9
  - export CXX=/usr/bin/g++-9
  # Check versions of gcc, g++ and cmake
  - gcc -v && g++ -v && cmake --version
  # build your projcet with cmake, this does require a Makefile appropriately configured in the root directory
  - make 
  # this part is optional and is only required if you want to run unit testing as part of your CI process.
  - cd build && ctest --extra-verbose
```

## What About Dependencies?

If you're an astout developer, you'll have realized that I didn't cover one thing, and that's installing the dependencies needed to build your project. If all your project uses is the standard library, then the previous configuration will work. However if you use third-party repositories, or expects certain software to be installed your CI build process will fail rather quickly.

Thankfully as TravisCI makes things easy, all this requires is a simple `before_install` statement, which essentially prepares your TravisCI build image with non-default dependencies. For example the following code snippet I use to install doxygen, graphviz, valgrind, and executes two custom make targets that install CMocka and mbedtls.

```yaml
before_install:
  - sudo apt install doxygen graphviz -y
  - sudo apt install valgrind -y
  - make install-cmocka
  - make install-mbedtls
```

Combine this with the other configuration and TravisCI can now actually build anything you throw at it:

```yaml
dist: trusty

sudo: required

language:
  - cpp
  - c

compiler:
  - gcc

addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - gcc-9
      - g++-9
      - cmake

before_install:
  - sudo apt install doxygen graphviz -y
  - sudo apt install valgrind -y
  - make install-cmocka
  - make install-mbedtls

script:
  # Link gcc-9 and g++-9 to their standard commands
  - sudo ln -s /usr/bin/gcc-9 /usr/local/bin/gcc
  - sudo ln -s /usr/bin/g++-9 /usr/local/bin/g++
  # Export CC and CXX to tell cmake which compiler to use
  - export CC=/usr/bin/gcc-9
  - export CXX=/usr/bin/g++-9
  # Check versions of gcc, g++ and cmake
  - gcc -v && g++ -v && cmake --version
  # build your projcet with cmake, this does require a Makefile appropriately configured in the root directory
  - make 
  # this part is optional and is only required if you want to run unit testing as part of your CI process.
  - cd build && ctest --extra-verbose
```

# Thanks For Reading

If you've made it this far, thanks for reading! See you in the next post.