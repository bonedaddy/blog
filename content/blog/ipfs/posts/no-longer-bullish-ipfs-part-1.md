---
title: "I No Longer Believe In The Success Of IPFS - Part 1"
date: 2020-06-21T22:00:36-07:00
draft: true
---

This article kicks off a series of posts about why I no longer believe in the success of IPFS, and reaching its stated goals of replacing HTTP and becoming the web of tomorrow.  In this part I'll give an overview of my current opinion about IPFS, along with what I think IPFS will become. Subsequent parts will detail some of the many problems I've found, and why IPFS fails to live up to its many promises. 

# Overview

My experience with IPFS is vast, and over the last three years I've spent thousands of hours writing hundreds of thousands of lines of code that use IPFS and it's subsystems. Until very recently, I had believed in the potential of IPFS,and seriously viewed it as a contender for replacing, or supplementing HTTP. Had you told me then that IPFS was just another P2P network like Zeronet, and Freenet, or that it was trying to do too much I would've laughed and brushed you off as crazy.

I would rationalize that by pointing out how active the community is, how the developers have already done a lot of work; Talk about the powers of content addressing and the benefits of data integrity, and data integrity verification provided by it. In fact, you didn't even need me to say these things, just go to [their website](https://ipfs.io) and the benefits of IPFS are laid out clear as day. The main page of the website of IPFS has a summary that is quite captivating, and promisess a lot in such a small amount of text:

![](/images/ipfs/main_website_summary.jpg)

There's also a number of other things that IPFS lets you do; Including built-in Publish/Subscribe Messaging, a cryptographic naming system using a hash of public keys as the identifier, along with a neat data format called InterPlanetary Linked Data, or IPLD for short. When you consider these benefits, you begin to get a package that, as Protocol Labs likes to say, can replace the outdated and legacy HTTP that the modern day depends on.

However the sad reality is that many of the features provided by IPFS are either broken, non-existent, or limited in their capacity. Additionally, in a bit of irony, the same problems IPFS seeks to solve as indicated in the previously shown screenshot, it also suffers from. The marketing around iPFS gives the illusion that it is extremely unique and although unsaid, the impression is given that no other P2P network or legacy technology does what it does.

In reality the only thing unique about IPFS is it combines functionality present in nearly every other P2P and legacy technology except in a single binary you can download. Because of all this, along with what I believe is the inability for Protocol Labs to successfully coordinate a project at the scale that IPFS seeks to be, I no longer believe in the success of IPFS. At the end of the day, most of the problems I'll mention in this series are not permanent in nature and can be fixed. That being said I don't think Protocol LAbs fully realizes this, or they're in denial about how serious these problems are.

# What Will IPFS Become

Before going into the issues, I'll start by talking about will become. The entire IPFS network I think will become another P2P network like Zeronet or Freenet but slightly more popular. It will have users, people will build things that use the network, but it wont become the new HTTP, or a massively popular network like the modern day Internet. At the end of the day IPFS is simply too impractical, and too heavy for everyone to use. It requires additional resources that aren't required to open up a web browser and look at your favourite memes, or read the news. It will never get to a point where technically illiterate people that can use web browsers, and use facebook, will be able to use IPFS.

There's a number of great things within the package of IPFS, such as the LibP2P library which is a P2P networking stack, self-describing hashes, amongst other subsystems of IPFS that I think will reach mainstream usage in a sense. They will likely never be used by everyone who uses the Interne, instead they will be used in the background by various other technologies that end-users interact with indirectly. 

In short, 10 years from now I think most people will have forgotten about IPFS, while the network continues to exist in the same vein that Zeronet or Freenet continue to exist. The technologies created by the creation of IPFS will in one form or another be used by other technologies, but as has been seen to date IPFS is far to impractical, and the development of it too chaotic for it to ever become the next HTTP.


----START WIP----
Although IPFS as a whole uses many existing concepts and technologies, creating IPFS lead to the development of a few subsystems

creating IPFS spawned a couple of "independent" (I quote independent as they aren't really independent and whose development are currently funded by Protocol Labs, the creators of IPFS) projects that provide value usable in many different technologies, whether thats P2P networks, traditional HTTP clients, etc...

there are a few components/subsystems that are particularly interesting and unique. It is these subsystems that I think will continue to be used 10, 20 years from now; Maybe not in their current implementations, but these subsystems provide value that is usable across any system centralized, decentralized, or federated.

The following subsystems that I think will be used are:
* [multiformats](https://multiformats.io/)
* [libp2p](https://libp2p.io/)
* [cid](https://github.com/multiformats/cid)
----END WIP----

# Next In Part 2


The next part to this article will conduct an indepth analysis of the problems that IPFS currently has. Thanks for reading!