---
title: "An Introduction To Home Labs"
date: 2020-06-19T13:26:43-07:00
draft: false
keywords: ["overview", "homelab", "raspberry-pi", "cost", "esxi", "docker", "developer", "technology"]
---

# Overview

When I was in college for computer systems administration, one of my instructors mentioned that the best way to become familiar with technology, and be a proficient systems administrator, was having a homelab. The homelab allows you to get your hands dirty with real technology in ways similar to on the job experience, but without the pressure about of accidentally taking down a mission critical system. 

It's also a great environment for trying out new technologies, and staying up to date on existing ones. Another benefit to the homelab that I dont think people talk about much, is it provides an opportunity for you to relieve yourself of dependency on cloud services, and enhance your privacy by using self-hostable versions of common cloud based applications.

With the advice of my college instructor, I built my first homelab in 2013, and have been running one ever since then. Using a homelab was one of the best decisions I've made, and I highly recommend anyone in the technology field to create one. It helped me be one of the top students in the college program I was in by being able to recreate in-class lab environments, and has allowed me to become a better systems administrator, and developer in ways that would not be possible without direct on-the-job experience.

# Cost

There's a misconception that running a homelab is expensive since it usually means getting access to servers, enterprise networking equipment, etc... Thankfully unless you want to get the latest and greatest in enterprise hardware, you can actually pick up pretty cheap second-hand hardware. Websites like [craigslist](https://craigslist.org), [servermonkey](https://www.servermonkey.com/), and [labgopher](https://labgopher.com/) can all be used to get great second-hand hardware on a budget. 

The first server I ever got for my homelab was a tower purchased off craigslist for $200 CAD, packed with a hardware RAID card, 6TB of storage, 8GB DDR3 RAM, and a 4-core xeon processor, lasting several years of extremely heavy usage. Typically it requires a bit of hunting around to find a good deal, and sometimes even waiting a few weeks for the right offer to show up; As such dont get discourage if you find it takes a bit of time to get the hardware.

# Space

If you are short on space, or even want a cheaper budget, you can build a homelab using SBCs (Single Board Computer) like the Raspberry Pi, and be able to fit a homelab into a shoebox! At the time of me writing article, I live in a small house with 5 people so I don't have too much room to run my normal homelab in consisting of tower and rack servers. As such I condensed my server based homelab, into one entirely composed of Raspberry Pi's, and it has worked amazingly. I'm able to run a plethora of services which I'll detail in a following post.

# Management

When it comes to managing infrastructure in your homelab, my personal preference is virtualization via tools like ESXi, virtualbox, and proxmox. You can always use container technology, however for stateful applications I find virtualization reduces the management overhead. Additionally tools like ESXi give you extremely fine-grained levels of control of resource allocation and consumption in ways that containers don't have, or that require significant modifications to achieve. Combine this with orchestration tools like Ansible, you'll be able to manage your entire infrastructure at ease. 

The downside with docker and ansible however is that it's not the easiest setup, and requires installing several dependencies onto the docker hosts you want to manage, whereas with virtualization in all but the most rare circumstances you can use Ansible out of the box.

# Monitoring

Another very important aspect to a homelab is system monitoring. Just like with production services, you want to make sure that you have adequate insight into the historical, and current state of your lab. As with service management, there's a plethora of tooling out there for system monitoring, but unfortunately a lot of it is quite heavy, and requires a number of different components. 

Lately however projects like Prometheus and Grafana have arisen, that make it incredibly easy to spin up robust monitoring solutions, without having to spin up a bunch of secondary services. That being said however, I find that while Prometheus and Grafana are really great for application monitoring but when it comes to system monitoring, they are a bit lacking in terms of features and ability to monitor anything.

If you dont want to deal with a monitoring system management overhead, then Prometheus + Grafana are a great choice, but I'd highly recommend using [Zabbix](https://www.zabbix.com/). Zabbix is widely used for system monitoring, and has been for many years; As such it as an extremely lively ecosystem, and packages that let you monitor all aspects of a system.

# Networking

One of the key pieces of a performant homelab is a well planned network infrastructure. It is very inadvisable to build your homelab using WiFi networking, which while great for browsing the internet, and streaming movies, it is piss poor for the primary network infrastructure used by a homelab. That doesn't mean you can't ever use WiFi, in fact I use WiFi as a secondary method of connecting devices, and services in case the primary network infrastructure goes down.

For primary network infrastructure, nothing beats the good ol' copper wiring, and gigabit switches. The main downside with ethernet, is that if you want to connect computers, servers, and other networked devices in many different rooms, it requires running a ton of copper wire everywhere, right? Not at all! Thanks to the magical powerline ethernet, you can leverage the electrical wiring of your house as a method of transmitting ethernet packets. With the right powerline ethernet hardware, you can get speeds as if you were running ethernet cables directly between your devices.

# Remote Access

Any homelab without a way of remotely accessing your homelab, isn't really a homelab at all. When done correctly, it's a great way of enabling access to your homelab from anywhere in the world. Have a massive collection of movies, and tv-shows, but don't want to carry a portable hard drive around with you? Remote access! It also means that if you need access to sensitive information while remote, you can leave that information in the safety of your home, and be able to access it remotely.