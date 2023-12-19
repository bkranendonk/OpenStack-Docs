---
layout: page
tags: [Network]
page_title: Create an internal network
---

This tutorial guides you through the process of creating a load balancer with webservers functioning as backend servers.  
If you have already configured a network, a router, and webservers, you have the option to skip ahead to the  **Creating the loadbalancer** section.  
However, for a comprehensive understanding, we recommend reading through the entire tutorial.

---

## Setting up an OpenStack network
Before diving into the creation of a load balancer, it's essential to configure an internal OpenStack network.  
This involves creating an internal network, an internal subnet, and an OpenStack router. If your network is  
already set up, you can skip this initial configuration and proceed directly to the **Creating the webservers** section.

### Creating an internal network
First we need to create an internal network. For this tutorial we will name it **webserver-network**.  
However, feel free to assign a name of your choice to the network.

**Step 1**: Log in to the OpenStack dashboard and proceed to the **Network** tab.  
**Step 2**: Select **Networks** and then click on the **Create Network** button.  
**Step 3**: Enter the required details in the following fields:  
* **Network Name**: webserver-network
* **Enable Admin State**: Should be marked
* **Create Subnet**: Should be marked
* **Availability Zone Hists**: Leave empty for now
* **MTU**: Leave empty for now

**Step 4**: Click on subnet and fill in the following fields:  
* **Subnet Name**: webserver-subnet
* **Network Address Source**: Enter Network Address manually
* **Network Address**: 10.0.0.0/24
* **IP Version**: IPv4
* **Gateway IP**: 10.0.0.1
* **Disable Gateway**: Should be unmarked

**Step 5**: Navigate to Subnet Details and fill in the following information:  
* **DHCP Enabled**: Ensure this option is marked.  

Leave all other fields blank, then click on **Create**.  

### Creating a router
We'll proceed to create an OpenStack router. In this tutorial, we'll name it **webserver-network-router**,  
indicating its connection to the **webserver-network** network. However, feel free to name the router as per your preference.

**Step 1**: Navigate to the **Network** tab and select **Routers**.  
**Step 2**: Initiate the router creation process by clicking on the **Create Router** button.  
**Step 3**: Enter details in the following fields:  
* **Router Name**: webserver-network-router
* **Admin State**: Should be marked
* **External Network**: Not required but recommended to set to floating IP network (Provides all instances in the network with internet connectivity)
* **Availability Zone Hists**: Leave empty for now
Press **Create Router**.

**Step 4**: Locate the router you've just created and click on the small arrow next to it. From the dropdown menu, select **Set Gateway**.  
**Step 5**: Opt for the net-float pool and confirm by clicking on **Set Gateway**.  
**Step 6**: Select the router you created and navigate to the **Interfaces** tab.  
**Step 7**: Begin adding an interface by clicking on **Add Interface**. Enter the required information in the following fields:  
* **Subnet**: webserver-netork (webserver-subnet)
* **IP Address**: Leave empty for now
Press **Add Interface**.

---
