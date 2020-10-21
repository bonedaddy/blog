---
title: "Better Internet Security And Privacy Through DNS"
date: 2020-10-18T17:11:21-07:00
draft: true
---

# Overview

DNS is a key component of modern day technology. Whether you are running a homelab, or simply browsing the internet, DNS will play a crucial role in how you use many internet protocols. It is however often overlooked when setting up a custom network, or when exploring different methods of using the internet in a way that affords you better privacy, and reduces the ability for tech companies, and governments to track your internet usage. This post will explore different methods by which DNS can be used to impact your privacy on the Internet, followed by describing a system that can be used to defend against these vulnerabilities, and how you can go about installing such a system.

# DNS As A Weapon

When you go to visit a website, say for example this one, you would either arrive here by typing in the name of the website, or by clicking a link which sends you to this website by name. You would rarely, if ever type in the ip address of the web server host. To accomplish this your client would reach out to a DNS resolver of some sort, and have that resolver perform the actual name resolution work. 

The resolver will eventually receive a response to its resolution request. In most default configurations this resolver is actually one ran by your ISP, or your home router, which in turn delegates to resolvers ran by your ISP.

This process opens you up to a variety of attacks that can be used to prevent you from accessing a server, have you access the wrong server, while also allowing the resolvers you use to build a profile of your internet usage.

#### Blocking Access To Websites

The easiest example to give is by talking about the Great Firewall of China (GFW), a system deployed by the CCP (Communist Party of China) to oppress the Chinese population and restrict the type of content they can access using the Internet. In fact people in China don't use the same Internet so to speak as that used by people in North America, Europe, and other countries. They are essentially accessing a filtered version of the Internet only being permitted to access content that is "Pro CCP". This is a simplified explanation, but serves the purpose of this article.

The CCP accomplishes this with many different techniques, but a big piece of this is abusing DNS. They have such control of the Internet infrastructure in China such that any DNS server you use will be controlled by the CCP, and can maintain a blacklist/whitelist of all websites. Because of this, when you go to resolve the name of a website that hosts anti-CCP content, they can return an invalid IP address, and just like that you will be unable to access the website. Unfortunately they will also know that it was you who made the resolution request, which ties into our next point.

#### Building A Profile On Your Internet Usage

Following along our previous example, in order for a DNS resolver to return a reply to a request, it needs to know where that request came from. This means that the CCP controlled DNS server will know a client with your IP address made the resolution request. A less extreme example would be your ISP, or DNS provider using this information to build a profile of the websites you visit, and then selling this information to third-parties to use in their advertising analytics.

#### Accessing Malicious Content

If the source used to answer your name resolution request is poisoned, or under control of a hostile actor, they can send you an answer which directs you to malicious content. In fact this kind of attack has been used to steal cryptocurrency from people, [using an attack leveraging DNS and BGP](https://www.theverge.com/2018/4/24/17275982/myetherwallet-hack-bgp-dns-hijacking-stolen-ethereum).

# Protecting Against DNS Abuse

There are a variety of ways that you can protect against DNS abuse, as well as minimizing the amount of information you disclose when making DNS requests. Unfortunately there is no one single tool or software service that can be used which will solve all possible attack vectors. You will need to evaluate your threat model, and the different problems you are trying to solve and pick the combination of tools that best solves your problems.

Given this lets reconsider a high-level features we want, namely better privacy, and better security. Further considering these we can break this down into a more concrete set of desired features:

* Better privacy
  * Reduce your footprint on the internet
    * Adblocking
    * Analytics blocking
  * Share less data with DNS requests
* Better security
  * Authoritative answers
  * DNSSEC
  * Prevent access to malware, ransomware, and similar sites

Given these "requirements" two immediate combinations of software become the most desirable, [PiHole](https://pi-hole.net/) and [Unbound](https://en.wikipedia.org/wiki/Unbound_(DNS_server)). PiHole is a pretty awesome product, that is a self described "black hole for internet advertisements" using blocklists that return unresolvable answers to queries that are blocked, thus preventing access to those resources. Unbound on the otherhand is a validating and recursive DNS resolver with advanced capabilities like DNSSEC validation, as well as support for DNSCrypt and DoT (however this setup will not use either of those).

By combining these two products together we decrease the likelihood that DNS can be used to censor the content you can visit on the Internet, reduce the chance for compromised DNS servers to serve you infected content, and greatly diminish the ability for our browsing history to be used to track you across the internet.

PiHole ends up being the DNS server that you would expose to your clients, and use for your network routers, switches, etc... and PiHole will delegate to a locally running unbound daemon, which will always recursively resolve requests. PiHole and Unbound both handle cached requests, so overtime you will likely spend less time processing DNS requests, despite using a recursive resolver.

# A Note On Your ISP

Even with the previously mentioned setup, there is still one middle-man that isn't cut out, and that will still be able to monitor your traffic and determine what DNS request you are performing. The two main ways to mitigate this attack vector is to modify unbound to use DNSCrypt, or DoT. By using either of this you will prevent your ISP from being able to monitor your DNS traffic. 

Unfortunately using DNSCrypt or DoT introduce complexities, and performance overhead that are somewhat undesirable. Additionally you are also only achieving a bit if misdirection, since you have to then place a bit of trust in whatever DNSCrypt or DoT resolver you use. The solution to this then becomes to host your own resolver, but once again this greatly increases the complexity of the setup.

# Prerequisites

You will want to decide on hardware to use in order to run the software. If you are simply using this for a homelab, or your home WiFi network, I'd recommend picking up a Raspberry Pi, as the "Pi" in PiHole implies using. They are cheap in terms of upfront cost and power consumption, small form factor, and easy to get. A Raspberry Pi 3 will be plenty sufficient, however for better performance I would recommend a Raspberry Pi 4 with 2GB of RAM. 

In addition to this I like to have an external USB drive to use for persistence and storing data generated by PiHole and unbound. This is desirable because the microSD cards used by Rasperry Pi's arent good for frequent writes. 

Most importantly however once you have your hardware, you need to install Docker and Docker Compose as we will be using docker containers to run PiHole and Unbound.

# Installation

For the installation process you will want to decide on the location to mount your external USB drive to. In addition you'll want to create three different directories that will be used for storing data generated by PiHole and Unbound and make configuration of these services easier. For the purpose of this tutorial we have gone with the following:

* `/ext-hdd/pihole-etc`
* `/ext-hdd/pihole-dnsmasq.d`
* `/ext-hdd/unbound`

The two pihole directories dont require us to place anything inside of them, as they will be managed by the PiHole service. Within unbound however you will want to place your unbound configuration file named `unbound.conf`.

# Configuration

Configuration is pretty simple, namely consisting of a docker compose file and unbound configuration file. You will need to determine three configuration variables set through environment variables that you will need to update in the docker compose file.

* IP address of pihole server (`ServerIP` env var)
* The ip address of the unbound server (`DNS1`)
* Password for pihole web administration console (`WEBPASSWORD` env var)
* Timezone (`TZ` env var)

Now you'll want to update the following docker compose to your environment:

```yaml
version: "3.5"
services:
    unbound:
        image: klutchell/unbound
        network_mode: host
        volumes:
            - /ext-hdd/unbound/unbound.conf:/opt/unbound/etc/unbound/unbound.conf
        restart: unless-stopped
    pihole:
        image: pihole/pihole
        network_mode: host
        depends_on: 
            - unbound
        environment:
          TZ: 'America/Vancouver'
          WEBPASSWORD: yourpasswordhere
          DNSSEC: "true"
          ServerIP: 0.0.0.0
          DNS1: yourlanip#5053
          DNS2: "no"
          IPv6: "yes"
        volumes:
            - /ext-hdd/pihole-etc/:/etc/pihole
            - /ext-hdd/pihole-dnsmasq.d/:/etc/dnsmasq.d/
        restart: unless-stopped

```

This unbound configuration you will be able to use as is, and does not need to be updated:

```conf
server:
    verbosity: 1
    logfile: ""
    interface: 0.0.0.0
    port: 5053
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    # auto-trust-anchor-file: "/var/lib/unbound/root.key"
    # Send minimum amount of information to upstream servers to enhance
    # privacy. Only sends minimum required labels of the QNAME and sets
    # QTYPE to NS when possible.

    # See RFC 7816 "DNS Query Name Minimisation to Improve Privacy" for
    # details.

    qname-minimisation: yes

    # May be set to yes if you have IPv6 connectivity
    do-ip6: yes

    # You want to leave this to no unless you have *native* IPv6. With 6to4 and
    # Terredo tunnels your web browser should favor IPv4 for the same reasons
    prefer-ip6: no

    # Use this only when you downloaded the list of primary root servers!
    # If you use the default dns-root-data package, unbound will find it automatically
    #root-hints: "/var/lib/unbound/root.hints"

    # Trust glue only if it is within the server's authority
    harden-glue: yes

    # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
    harden-dnssec-stripped: yes

    # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
    # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
    use-caps-for-id: no

    # Reduce EDNS reassembly buffer size.
    # Suggested by the unbound man page to reduce fragmentation reassembly problems
    edns-buffer-size: 1472

    # Perform prefetching of close to expired message cache entries
    # This only applies to domains that have been frequently queried
    prefetch: yes

    # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
    num-threads: 1

    # Ensure kernel buffer is large enough to not lose messages in traffic spikes
    so-rcvbuf: 1m

    # Ensure privacy of local IP ranges
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10

    access-control: 0.0.0.0/0 allow
```

# Usage


Using this setup is quite simple, you will of course need to start the docker container using `docker-compose -f /path/to/docker-compose.yml up -d`. If this command runs without error, the final step is to adjust all your networked devices to use the `ServerIP` defined in the docker compose file as your DNS server. 

Unless you will be running two different PiHole + Unbound servers on two sets of hardware, I would recommend only overriding your primary DNS server, as if you override both primary and secondary only using one server, a failure of that server means you can no longer browse the internet.

# Bonus Step: Better Blocking

PiHole lets you configure additional block lists, which can be used to block domains used by scams, ransomware, phishing, etc... While this won't protect you against 0days, it still greatly improve the security of your network, or if you have children its a low-cost method for blocking access to content innapropriate for children.

For updating the adlists you'll want to consult the [documentation](https://docs.pi-hole.net/guides/whitelist-blacklist/) about the update process. Down below I've included some blocklists focused on security:

* https://blocklistproject.github.io/Lists/scam.txt
* https://blocklistproject.github.io/Lists/ransomware.txt
* https://blocklistproject.github.io/Lists/phishing.txt		
* https://blocklistproject.github.io/Lists/malware.txt		
* https://blocklistproject.github.io/Lists/fraud.txt		