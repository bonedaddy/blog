---
title: "The Impending Failure Of IPFS - Part 1"
date: 2020-06-21T22:00:36-07:00
draft: true
---

This article kicks off a series of posts about why I no longer believe in the success of IPFS, and reaching its stated goals of replacing HTTP and becoming the web of tomorrow. In this part I'll give an overview of my current opinion about IPFS, along with what I think IPFS will become. Subsequent parts will detail some of the many problems I've found, and why IPFS fails to live up to its many promises.

# Overview

My experience with IPFS is vast, and over the last three years I've spent thousands of hours writing hundreds of thousands of lines of code that use IPFS and it's subsystems. Until very recently, I had believed in the potential of IPFS,and seriously viewed it as a contender for replacing, or supplementing HTTP. Had you told me then that IPFS was just another P2P network like Zeronet, and Freenet, or that it was trying to do too much I would've laughed and brushed you off as crazy.

I would rationalize that by pointing out how active the community is, how the developers have already done a lot of work; Talk about the powers of content addressing and the benefits of data integrity, and data integrity verification provided by it.

In fact, you don't even need me to say these things, just go to [their website](https://ipfs.io) and the benefits of IPFS are laid out clear as day. The main page of the website of IPFS has a summary that is quite captivating, and promises a lot in such a small amount of text:

![](/images/ipfs/main_website_summary.jpg)

There's also a number of other things that IPFS lets you do; Including built-in Publish/Subscribe Messaging, a cryptographic naming system using a hash of public keys as the identifier, along with a neat data format called InterPlanetary Linked Data, or IPLD for short. When you consider these benefits, you begin to get a package that, as Protocol Labs likes to say, "can surpass HTTP in order to build a better web for all of us"

However the sad reality is that many of the features provided by IPFS are partially broken, improperly implemented, or limited in their capacity. Ironically many of the issues IPFS seeks to solve with HTTP and the modern day web it also suffers from, and in most cases orders of magnitude worse than HTTP and the modern day web.

# What Will IPFS Become

10 years from now I think the world will have largely forgotten about IPFS, while the IPFS network continues to exist in the same vein as Zeronet, Freenet, and other similar decentralized networks. They exist, but the usage and knowledge of these networks is largely limited to small groups of technically inclined individuals.

I don't think that IPFS will become the new HTTP, or a massively popular decentralized network for some of the same reasons that Zeronet, Freenet, and others. The usability of these protocols and networks are much too difficult for the majority of Internet users. Their ability to scale to support billions of users, and hundreds of millions of users simultaneously is unrealistic. Furthermore the physical costs of participating and interacting with these networks is often not realistic for most people.

While IPFS as a whole is to impractical for replacing HTTP, the development of IPFS created a few interesting specifications and implementations of these specifications, which while largely only being used by IPFS, provide extremely valuable functionality that is useful to a variety of different applications.

The following specifications and their associated implementations are the only parts of IPFS and it's ecosystem that I think will realistically achieve mainstream usage:

- [multiformats](https://multiformats.io/)
- [libp2p](https://libp2p.io/)
- [ipld](https://ipld.io/)
- [cid](https://github.com/multiformats/cid)

Multiformats and it's various specifications, and to extension the Content Identifier specification make it very easy to future proof technology choices (hash algorithms, network addresses, etc...) and make them self-describing. This assists the creation of robust applications, and upgrade these applications over the long term.

LibP2P is perhaps the most interesting product to have come out of the development of IPFS. It is an extremely modular networking stack, allowing you to build traditional client-server applications, while also being able to build P2P application. It provides methods to leverage multiple different transport protocols, and more all within a single framework. It does suffer from some of the same issues that IPFS does, and the poor management of IPFS also extends to LibP2P in some aspects, but overall it has been executed with much more precision and care then IPFS.

Additionally LibP2P is being used by a wide variety of different projects, including the up and coming ETH 2.0 network, where the protocol is being leveraged by all clients in a variety of languages.

# Summary

In short I think the future outlook for IPFS as a better HTTP and even a replacement of it is extremely bleak, however it will have an impact on the technology world by having created products such as libp2p, multiformats, etc...

Subsequent posts in this series will expand the statements I have made as well as given new ones. If you stayed around this long thanks for reading. See you in the next one.