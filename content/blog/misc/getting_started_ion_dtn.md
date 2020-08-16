---
title: "Getting Started With The InterPlanetary Overlay Network (ION) "
date: 2020-08-15T20:47:51-07:00
draft: true
---

# Overview

This post will give a very brief introduction of DTN (Delay Tolerant Networking), ION (InterPlanetary Overlay Network), and then serve as a tutorial in how you can get started developing with ION.

Note: If you're familiar with IPFS, this is completely different. Theo nly 

# Introduction

ION is best described by the following taken from page 6 of section 1 Design of the "Interplanetary Overlay Network (ION) Design and Operation" documentation". [Click this link to be taken to the sourceforge repo hosting the documentation](https://sourceforge.net/projects/ion-dtn/)

> The Interplanetary Overlay Network (ION) software distribution is an implementation of
Delay-Tolerant Networking (DTN) architecture as described in Internet RFC 4838. It is
designed to enable inexpensive insertion of DTN functionality into embedded systems
such as robotic spacecraft.

Over the last few months I've been taking a personal interest in how spacecraft communicate back with Earth, largely from having watched the Mars National Geographic series with my dad. Researching this in my spare time lead me to the topic of DTN (Delay Tolerant Networking). Which is a bit different than networking as is done with the modern day Internet.

It wasn't something I had consciously thought of until reading about DTN, but the modern day internet requires constant connectivity in order to function properly. If you don't have this constant connectivity, then the internet either functions very poorly, or doesn't function at all.

DTN is a suite of protocols that enable IP-like protocols capable of dynamically responding to environmental conditions and failures without it causing a failure or loss of overall data transmission (this is probably a poor way of explaining DTN but its sufficient for the purpose of this article).