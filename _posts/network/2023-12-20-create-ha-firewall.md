---
layout: page
tags: [Network]
page_title: Create a HA Firewall
---

# Create a high available firewall

By default it is possible to create an OpenStack router that has an external IP and can route the traffic of an internal network to the internet.
To gain more control over the traffic to the internet, create VPN connectivity and allow for more fine-graned security policy's, 
it is possible to create an instance or multiple instances to replace the OpenStack router on an internal network 
This tutorial guides you through the process of creating instances, and configure OpenStack to allow proper routing and HA IP.
The tutorial does not include configuring the firewall and  

### Requirements
* A BYoIP subnet
* An internal network without a router 

### Design
![Design](/OpenStack-Docs/assets/images/2023-12-20-create-ha-firewall/ha_fw_design.png)
![Design]({{ '/assets/images/2023-12-20-create-ha-firewall/ha_fw_design.png' | relative_url }})
We have multiple firewall / router instances within the OpenStack project. 
All routers have an internal IP, and an IP address on a BYoIP subnet. 
Next to that, we have one virtual IP on the internal network and one virtual IP on the BYoIP network. 
The firewalls are configured in an active / standby configuration and through CARP or VRRP decide which instance is the master. 

