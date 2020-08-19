---
title: "The Failure Of IPFS, Filecoin, And Protocol Labs - Part 1"
date: 2020-08-18T18:02:03-07:00
draft: false
keywords: [ "ipfs", "protocol labs", "filecoin", "axios", "fil", "ico", "blueyard capital", "textile" ]
---

I've been sitting on this blog post for quite some time now, and was unsure of whether or not to publish it. In part I felt a bit crazy, mostly due to the fact that outside of a few rare circumstances, not a lot of people were talking about the same problems I was. If they were, it was very brief and no one was being persistent in the same way I was.

Earlier today however a very interesting article was released by axios titled [Investor revolt and legal dispute delay Filecoin plans](https://www.axios.com/filecoin-blockchain-delay-3b5e6b9a-bcc8-41cf-81cf-563f6cebb2c4.html). It describes some much more serious allegations than I have made, namely that the CEO of Protocol Labs allocating FIL token to himself and employees for much cheaper than what they were sold for during the ICO, and much cheaper than what private investors got.

This finally gave me some outside clarification that the problems aren't just with IPFS. The problems are systemic within Protocol Labs as a company. Given this, I figured I would make public this blog post. 

It's a bit shorter than I would like, and is missing receipts to some of the claims I have made, but I will eventually get around to a follow-up post including the receipts. I'm a bit lazy, and figured I'd capitalize on the momentum from the axios article.

Note that the rest of the article is strictly focused on IPFS and Protocol Labs. It's intended to give a brief overview as to my current opinion about IPFS, and why it's failure is primarily due to the management by Protocol Labs. Subsequent parts will describe in greater detail the various problems I have found.

# Overview

When I first started developing with IPFS three years ago, I was extremely bullish on the long-term prospects of IPFS, and seriously viewed it as a contender for replacing, or supplementing HTTP. Had you told me then that IPFS was just another P2P network like Zeronet, or Freenet, I would've laughed and brushed you off as crazy. 

I would've rationalized that by pointing out how active the community is, how the developers have already done a lot of work; Talk about the powers of content addressing and the benefits of data integrity, and data integrity verification provided by it. In fact, you didn't even need me to say these things, just go to [their website](https://ipfs.io) and the benefits of IPFS are laid out clear as day:

![](/images/ipfs/main_website_summary.jpg)

There's also a number of other things that IPFS lets you do; Including built-in Publish/Subscribe Messaging, a cryptographic naming system using a hash of public keys as the identifier, along with a neat data format called InterPlanetary Linked Data, or IPLD for short. When you consider these benefits, you begin to get a package that, as Protocol Labs likes to say, can replace the outdated and legacy HTTP that the modern day Internet depends on.

However the sad reality is that many of the features provided by IPFS are either broken, non-existent, or limited in their capacity. Additionally, in a bit of irony, the same problems IPFS seeks to solve as indicated in the previously shown screenshot, it also suffers from. Additionally IPFS also tries to make itself appear extremely unique and as if it does things no other P2P network has done. In reality the only thing unique about IPFS is it combines things present in nearly every other P2P and legacy technology except in a single binary you can download. Because of all this, along with what I believe is the inability for Protocol Labs to successfully coordinate a project at the scale that IPFS seeks to be, I no longer believe in the success of IPFS.

At the end of the day, most of the problems I'll mention in this series are not permanent in nature and can be fixed, however I don't think Protocol Labs fully realizes the issues and how serious they are, while also being in denial. A later part in the series will detail what I perceive are significant problems when it comes to Protocol Labs dealing with these issues.

# What Will IPFS Become

Before going into the problems, I figured I would start off describing what I think the IPFS network will become, which is just another P2P network like Zeronet or Freenet, but slightly more popular. It will have users, people will build things that use the network, but it wont become the new HTTP, or a massively popular network like the modern day Internet.

At the end of the day IPFS is simply too impractical, and too heavy for everyone to use. It requires additional resources that aren't required to open up a web browser and look at your favourite memes, or read the news. While these problems *can* be resolved, they require a competent company at the helm, one that is coordinated and can quickly execute fixes, which is far from what Protocol Labs is.

There's a number of great things within the package of IPFS, such as the LibP2P library which is a P2P networking stack, self-describing hashes, amongst other subsystems of IPFS that I think will reach mainstream usage in a sense. They will likely never be used by everyone who uses the Internet, instead they will be used in the background by various other technologies that end-users interact with indirectly. 

In short, 10 years from now I think most people will have forgotten about IPFS, while the network continues to exist in the same vein that Zeronet or Freenet continue to exist. The technologies created by the creation of IPFS will in one form or another be used by other technologies, but as has been seen to date IPFS is far to impractical, and the development of it too chaotic for it to ever become the next HTTP.

# The Problems

Future articles will go into much more detail about the problems, however I'll list the bullet points bellow:

* Protocol Labs is extremely uncoordinated
* Protocol Labs has an unclear communication structure
* Protocol Labs suffers from "not invented here syndrome"
* Protocol Labs has too many developers working on the same thing
* Protocol Labs doesn't listen to outside criticism
* Cross-team communication is extremely slow
* Simple issues that should take days to resolve take weeks, sometimes months
* IPFS is extremely inefficient and unreliable

Notice something? Most of these problems lie within Protocol Labs itself. Anyways, thanks for reading. Future posts will go into these claims in detail.