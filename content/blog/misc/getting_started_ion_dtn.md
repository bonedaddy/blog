---
title: "Getting Started With The Interplanetary Overlay Network (ION) "
date: 2020-08-15T20:47:51-07:00
draft: true
---

# Overview

This post will give a very brief introduction of DTN (Delay Tolerant Networking), ION (InterPlanetary Overlay Network), and then serve as a tutorial in how you can get started developing with ION. This will cover getting setup for the **linux** development environment. 

If you are using windows, I suggest you backup your data and install a Linux distribution. If that's really repulsive try MacOS. Windows is trash and has horrible privacy. The only good thing it does is play video games, but this is not a video game tutorial :)

This article will periodically reference material from the official ION documentation. [Click this link to be taken to the sourceforge repo hosting the documentation](https://sourceforge.net/projects/ion-dtn/). I'm not sure how to link to files in sourceforge, so you can alternatively try [this one hosted on github](https://github.com/bonedaddy/ion-dtn/blob/v3.7.1/ION.pdf).

Not familiar with DTN and want a noob friendly introduction? [This blog post](http://ipnsig.org/2020/08/08/dtn-for-beginners-info/) has a few different links to extremely good reference materials.


# Introduction

Over the last few months I've been taking a personal interest in how spacecraft communicate back with Earth, largely from having watched the Mars National Geographic series with my dad. Researching this in my spare time lead me to the topic of DTN (Delay Tolerant Networking). Which is a bit different than networking as is done with the modern day Internet.

It wasn't something I had consciously thought of until reading about DTN, but the modern day internet requires constant connectivity in order to function properly. If you don't have this constant connectivity, then the internet either functions very poorly, or doesn't function at all.

DTN is a suite of protocol that resolve issues when using IP in environments like those encountered by spacecraft orbiting tens of millions of miles away from Earth. The store and forward approach, combined with multiple paths throughout the network enable an Internet-like approach to interplanetary communications and data transfer. This is obviously an extremely overly simplified explanation, but it is sufficient for the purposes of this post.

ION is one such implementation of DTN, and has a lot of backing and development, which if I understand correctly dates back to mid-1990s. It appears to be an extremely robust implementation, having real world usage in space, namely through the EPOXI spacecraft.

A brief "tl;dr" is best described by the following exerpt from the "Interplanetary Overlay Network (ION) Designed and Operation" documentation.

> The Interplanetary Overlay Network (ION) software distribution is an implementation of
Delay-Tolerant Networking (DTN) architecture as described in Internet RFC 4838. It is
designed to enable inexpensive insertion of DTN functionality into embedded systems
such as robotic spacecraft.

The remainder of this document will focus on setting up a development environment for ION, as well as some toy example programs to demonstrate API usage. Really I'm just writing this as a tutorial for myself, since there appears to be pretty little information out there about developing with ION, and I cant really find an actual tutorial. So by writing this I'll hopefully gain enough knowledge to work with ION, and create a reference document that others can use to get the same.

# Installation

At present the main repository for ION source code appears to be [this sourceforge one](https://sourceforge.net/projects/ion-dtn/). Personally speaking I really dislike sourceforge, the UI is quite awful and hard to navigate. So I mirrored ION on [this github repo](https://github.com/bonedaddy/ion-dtn) and it is the one I will be referencing from here on out.

There's two releases, the [v3.7.1](https://github.com/bonedaddy/ion-dtn/releases/tag/v3.7.1) and [v4.0.0](https://github.com/bonedaddy/ion-dtn/releases/tag/v4.0.0). I'll be using v3.7.1 for this so it's probably best if you following along with that.

So a very brief installation setup is as follows:

```shell
$> https://github.com/bonedaddy/ion-dtn.git
$> cd ion-dtn
$> git checkout v3.7.1
$> ./configure
$> make -j$(nproc)
$> sudo make install -j$(nproc)
```

And just like that you've installed the ION software distribution. Now it probably wont be that simple at first and you *might* get some warnings about missing dependencies. If you do, install the dependencies and try again. Depending on the Linux distribution you use, you might get a warning about `gmake` not being found. I got this on Ubuntu and it is apparently because Ubuntu doesn't ship `gmake` anymore. If you get a warning like this the best fix is to symlink make to gmake like so:

```shell
$> sudo ln -s /usr/bin/make /usr/bin/gmake
```