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
* A public IPv4 subnet where you can set allowed address pairs with at least three available IP addresses 
  * For example [Rent an IPv4 range]({{ '/articles/create-byoip-network' | relative_url }})
* An internal network without a router and with at least three available IP addresses
  * [Create an internal network]({{ '/articles/create-an-internal-network' | relative_url }})
* A Firewall image in OpenStack (for example OPNsense AMD64 nano image from https://opnsense.org/download/)  


### Design
![Design]({{ '/assets/images/2023-12-20-create-ha-firewall/ha_fw_design.png' | relative_url }})
  We have multiple firewall / router instances within the OpenStack project. 
  All routers have an internal IP, and an IP address on a BYoIP subnet. 
  Next to that, we have one virtual IP on the internal network and one virtual IP on the BYoIP network. 
  The firewalls are configured in an active / standby configuration and through CARP or VRRP decide which instance is the master. 

### Modify subnet allocation pools
Adjust the DHCP allocation pool to provide at least one IP addres for the Virtual IP of the firewall cluster (in this example 10.10.50.254)
**Step 1**: Log in to the OpenStack dashboard and proceed to the **Network** tab.  
**Step 2**: Select **Networks** and then select your internal network
**Step 3**: Select **Subnets** and click **Edit Subnet** on the subnet where your Virtual IP should live
**Step 4**: Go to **Subnet Details** and modify the **Allocation Pools** to remove 10.10.50.254 from the allocation pool
**Step 5**: Clikc **Save**

Repeat the same process for the rented IP range

### Create instances to use as a firewall / router
For this tutorial assumes two instances are created, both in a different availability zone. you can use the following tutorial combined with the specs below:

[Create instances]({{ '/articles/create-instances' | relative_url }})


On the **Details** tab:  
* **Instance Name**: FW01 / FW02
* **Description**: Firewall for internal network
* **Availability Zone**: Choose an availability zone to your liking
* **Instance Count**: 1

On the **Source** tab:  
* **Select Boot Source**: Image
* **Create New Volume**: No
* **Image Name**: Use the firewall image for this instance (For example OPNsense)

On the **Flavor** tab:  
* **Flavor**: Small HD 4GB

On the **Networks** tab:  
* **Network**: Add the rented range as well as your internal network

On the **Security Groups** tab:  
* **Security Group**: allow-all

### Disable port security for FW01 and FW02

**Step 1** Go to compute > Instances > FW01 > Interfaces tab
**Step 2** Click on edit port for the WAN interface
**Step 3** Deselect "Port Security" and click update
![Design]({{ '/assets/images/2023-12-20-create-ha-firewall/edit_port.png' | relative_url }})
**Step 4** Do the same for the LAN interface
