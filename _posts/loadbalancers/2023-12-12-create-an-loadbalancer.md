---
layout: page
tags: [Loadbalancers]
page_title: Create a loadbalancer with webservers
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

[Create an internal network]({{ '/articles/create-an-loadbalancer' | relative_url }})


### Creating an router
We'll proceed to create an OpenStack router. In this tutorial, we'll name it **webserver-network-router**,  
indicating its connection to the **webserver-network** network. However, feel free to name the router as per your preference.

**Step 1**: Navigate to the **Network** tab and select **Routers**.  
**Step 2**: Initiate the router creation process by clicking on the **Create Router** button.  
**Step 3**: Enter details in the following fields:  
* **Router Name**: webserver-network-router
* **Admin State**: Should be marked
* **External Network**: Not required but recommended to set to floating IP network
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

## Creating the webservers
For this tutorial, we'll set up three webservers. Feel free to adjust the number of webservers according  
to your needs, or you can skip this section entirely if you already have webservers operational.  

**Step 1**: Access the **Compute** tab and select **Instances**.  
**Step 2**: Initiate instance creation by clicking on the **Launch Instance** button.  
**Step 3**: Provide the required information in the following fields:  
* **Instance Name**: webserver
* **Description**: Webserver for my cool website
* **Availability Zone**: Leave empty or choose an availability zone to your liking
* **Instance Count**: 3

**Step 4**: Navigate to the **Source** tab and enter the necessary information in the following fields:  
* **Select Boot Source**: Image
* **Create New Volume**: No
* **Image Name**: Ubuntu 22.04 LTS

**Step 5**: Choose a suitable flavor by clicking on the **Flavor** tab. For this tutorial, select the Standard 1 GB flavor.  
**Step 6**: Select your network by clicking on the **Networks** tab. Choose the recently created **webserver-network**.  
**Step 7**: Add necessary security by clicking on the **Security Groups** tab and selecting the **allow-web** security group.  
**Step 8**: Assign a key pair by clicking on the **Key Pair** tab. Select a key pair of your preference, or create or upload one here if you don't have one.  
**Step 9**: Configure your setup by clicking on the **Configuration** tab. Paste the provided code into the Customization Script field to update packages and install Apache2 on the webservers:  

```cloud-config
#cloud-config
package_upgrade: true
packages:
  - apache2
  - php
  - libapache2-mod-php
write_files:
  - path: /var/www/html/index.php
    content: |
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Loadbalancer Tutorial</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <div class="container mt-5">
              <div class="card">
                  <div class="card-header">
                      Hostname Information
                  </div>
                  <div class="card-body">
                      <h5 class="card-title">Server Hostname</h5>
                      <p class="card-text"><?php echo gethostname(); ?></p>
                  </div>
              </div>
          </div>
      </body>
      </html>
runcmd:
  - systemctl restart apache2

```

---

## Creating the loadbalancer
Now we can create the loadbalancer. We will create a loadbalancer with a listener, a pool and a healthmonitor.

### Creating the loadbalancer
**Step 1**: Navigate to the **Network** tab and select **Load Balancers**.  
**Step 2**: Initiate the process by clicking on the **Create Load Balancer** button.  
**Step 3**: Enter details in the following fields:  
* **Name**: webserver-loadbalancer
* **IP Address**: Leave empty for now
* **Description**: Loadbalancer for our webservers
* **Availability Zone**: Leave empty or choose an availability zone to your liking
* **Flavor**: Choose a flavor to your liking for this tutorial we use the Medium flavor
* **Subnet**: webserver-subnet

**Step 4**: Proceed to the **Listener** tab by clicking on **Next**.  
**Step 5**: Complete the following fields:  
* **Name**: webserver-listener-http
* **Description**: HTTP Listener for our webservers
* **Protocol**: HTTP
* **Protocol Port**: 80
* **Admin State Up**: Yes
Leave all others options as they are for now.

**Step 6**: Proceed to the **Pool Details** tab by clicking on **Next**.  
**Step 7**: Enter information in the following fields:  
* **Name**: webserver-pool-http
* **Description**: HTTP Pool for our webservers
* **Algorithm**: Least connections
* **Session Persistence**: Leave None
* **TLS Enabled** No
* **Admin State Up**: Yes

**Step 8**: Proceed to the **Pool Members** tab by clicking on **Next**.  
**Step 9**: Identify the instances you wish to include and click on **Add** for each.  
**Step 10**: Enter the designated port for the host (80) and set the weight (1). Repeat this step for all webserver hosts you're adding.  

**Step 11**: Navigate to the **Health Monitor** tab by clicking on **Next**.  
**Step 12**: Complete the following fields:  
* **Name**: webserver-healthmonitor-http
* **Type**: HTTP
* **Max Retries Down**: 3
* **Delay**: 5
* **Max Retries**: 3
* **Timeout**: 5
* **HTTP Method**: GET
* **Excepted Codes**: 200
* **URL Path**: /
* **Admin State Up**: Yes

**Step 13**: Initiate the creation of your load balancer by clicking on **Create Load Balancer**.  
**Step 14**: Locate the load balancer you've just set up and click the small arrow beside it. From the dropdown menu, select **Associate Floating IP**.  
**Step 15**: Select an available floating IP or choose the net-float pool, then confirm your choice by clicking on **Associate**.  
**Step 16**: Await the update of the load balancer's Operating Status to ONLINE. Once this status is achieved, navigate to `http://<floating-ip>` in your web browser to witness your load balancer functioning.  

If you want to customize your Loadbalancer even further we highly recommend you to read the [OpenStack Octavia Loadbalancer documentation](https://docs.openstack.org/octavia/latest/user/index.html)