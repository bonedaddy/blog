---
title: "Maximize Your Usage Of DNS For Better Privacy And Performance"
date: 2020-10-18T17:11:21-07:00
draft: true
---

# Overview

DNS is a key component of modern day technology. Whether you are running a homelab, or simply browsing the internet, DNS will play a crucial role in how you use many internet protocols. It is however often overlooked when setting up a custom network, or when exploring different methods of using the internet in a way that affords you better privacy, and reduces the ability for tech companies, and governments to track your internet usage. This post will explore different methods by which DNS can be used to impact your privacy on the Internet, followed by describing a system that can be used to defend against these vulnerabilities, and how you can go about installing such a system.

# DNS As A Weapon

When you go to visit a website, say for example this one, you would either arrive here by typing in the name of the website, or by clicking a link which sends you to this website by name. You would rarely, if ever type in the ip address of the web server host. To accomplish this your client would reach out to a DNS resolver of some sort, and have that resolver perform the actual name resolution work. The resolver will eventually receive a response to its resolution request.

This process opens you up to a variety of attacks that can be used to prevent you from accessing a server, accessing the wrong server, and provides a way for others to monitor your internet usage and build a profile of your browsing history. Part of the problem relies in the fact that your DNS resolver often delegate trust to another resolver to provide the correct response, and that DNS wasn't designed explicitly with security in mind.

## Blocking Access To Websites

The easiest example to give is by talking about the Great Firewall of China (GFW), a system deployed by the CCP (Communist Party of China) to oppress the Chinese population and restrict the type of content they can access using the Internet. In fact people in China don't use the same Internet so to speak as that used by people in North America, Europe, and other countries. They are essentially accessing a filtered version of the Internet only being permitted to access content that is "Pro CCP". This is a simplified explanation, but serves the purpose of this article.

The CCP accomplishes this with many different techniques, but a big piece of this is abusing DNS. They have such control of the Internet infrastructure in China such that any DNS server you use will be controlled by the CCP, and can maintain a blacklist/whitelist of all websites. Because of this, when you go to resolve the name of a website that hosts anti-CCP content, they can return an invalid IP address, and just like that you will be unable to access the website. Unfortunately they will also know that it was you who made the resolution request, which ties into our next point.

## Building A Profile On Your Internet Usage

Following along our previous example, in order for a DNS resolver to return a reply to a request, it needs to know where that request came from. This means that the CCP controlled DNS server will know a client with your IP address made the resolution request. A less extreme example would be your ISP, or DNS provider using this information to build a profile of the websites you visit, and then selling this information to third-parties to use in their advertising analytics.

## Accessing Incorrect Content

If the source used to answer your name resolution request is poisoned, or under control of a hostile actor, they can send you an answer which directs you to malicious content. In fact this kind of attack has been used to steal cryptocurrency from people, [using an attack leveraging DNS and BGP](https://www.theverge.com/2018/4/24/17275982/myetherwallet-hack-bgp-dns-hijacking-stolen-ethereum).