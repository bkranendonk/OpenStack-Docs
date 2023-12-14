---
layout: page
tags: [Loadbalancers]
page_title: Create an loadbalancer with webservers
---

This tutorials show you how to create an Loadbalancer with webservers behind it as backend servers.
If you have already setup a network, router and webservers you can skip directly to the **Creating the loadbalancer** section.

---

## Setting up an OpenStack network
Before we start creating a loadbalancer, we need to setup an internal OpenStack network. We need to create an internal network, an internal subnet and an OpenStack router. If you have already setup your network, please skip this setup and scroll down to the **Creating the loadbalancer** section.

### Creating an internal network
First we need to create an internal network. In this tutorial, the network is named "webserver-network" but you can call it however you want.

Step 1: Login to the OpenStack dashboard and go to the **Network** tab.
Step 2: Click on **Networks** and then click on the **Create Network** button.
Step 3: Fill in the following fields:
* **Network Name**: webserver-network
* **Enable Admin State**: Should be marked
* **Create Subnet**: Should be marked
* **Availability Zone Hists**: Leave empty for now
* **MTU**: Leave empty for now

Step 4: Click on subnet and fill in the following fields:
* **Subnet Name**: webserver-subnet
* **Network Address Source**: Enter Network Address manually
* **Network Address**: 10.0.0.0/24
* **IP Version**: IPv4
* **Gateway IP**: 10.0.0.1
* **Disable Gateway**: Should be unmarked

Step 5: Click on Subnet Details and fill in the following fields:
* **DHCP Enabled**: Should be marked
All other fields can be left empty, click on **Create**.


### Creating an router
Now we need to create an OpenStack router. In this tutorial, the router is named "webserver-network-router" to make it clear that this router is connected to the "webserver-network" network. You can call the router however you want.

Step 1: Go to the **Network** tab and click on **Routers**.
Step 2: Click on the **Create Router** button.
Step 3: Fill in the following fields:
* **Router Name**: webserver-network-router
* **Admin State**: Should be marked
* **External Network**: Not required but recommended to set to floating IP network
* **Availability Zone Hists**: Leave empty for now
Press **Create Router**.

Step 4: Click on the small arrow next to the router you just created and click on **Set Gateway**.  
Step 5: Choose the net-float pool and click on **Set Gateway**.  
Step 6: Click on the router you just created and click on the **Interfaces** tab.  
Step 7: Click on **Add Interface** and fill in the following fields:  
* **Subnet**: webserver-netork (webserver-subnet)
* **IP Address**: Leave empty for now
Press **Add Interface**.

---

## Creating the webservers
Now we can create the webservers. We will create 3 webservers for this tutorial. You can create as many as you want or skip this step if you already have webservers running.

step 1: Go to the **Compute** tab and click on **Instances**.
Step 2: Click on the **Launch Instance** button.
Step 3: Fill in the following fields:
* **Instance Name**: webserver
* **Description**: Webserver for my cool website
* **Availability Zone**: Leave empty or choose an availability zone to your liking
* **Instance Count**: 3

Step 4: Click on the **Source** tab and fill in the following fields:
* **Select Boot Source**: Image
* **Create New Volume**: No
* **Image Name**: Ubuntu 22.04 LTS

Step 5: Click on the **Flavor** tab and select a flavor to your likings. For this tutorial we use the Standard 1 GB flavor.  
Step 6: Click on the **Networks** tab and select the network we have just created **webserver-network**  
Step 7: Click on the **Security Groups** tab and add the **allow-web** security group.  
Step 8: Click on the **Key Pair** tab and select a key pair to your likings if you don't have one already you can create or upload one here.  
Step 9: Click on the **Configuration** tab and paste the following code into the Customization Script field this will update the packages and install apache2 on the webservers:  

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
          <title>Hostname Page</title>
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
Step 1: Go to the **Network** tab and click on **Load Balancers**.
Step 2: Click on the **Create Load Balancer** button.
Step 3: Fill in the following fields:
* **Name**: webserver-loadbalancer
* **IP Address**: Leave empty for now
* **Description**: Loadbalancer for our webservers
* **Availability Zone**: Leave empty or choose an availability zone to your liking
* **Flavor**: Choose a flavor to your liking for this tutorial we use the Medium flavor
* **Subnet**: webserver-subnet

Step 4: Click on Next to go to the **Listener** tab.
Step 5: Fill in the following fields:
* **Name**: webserver-listener-http
* **Description**: HTTP Listener for our webservers
* **Protocol**: HTTP
* **Protocol Port**: 80
* **Admin State Up**: Yes
Leave all others options as they are for now.

Step 6: Click on Next to go to the **Pool Details** tab.
Step 7: Fill in the following fields:
* **Name**: webserver-pool-http
* **Description**: HTTP Pool for our webservers
* **Algorithm**: Least connections
* **Session Persistence**: Leave None
* **TLS Enabled** No
* **Admin State Up**: Yes

Step 8: Click on Next to go to the **Pool Members** tab.
Step 9: Click on **Add** behind the instances you want to add
Step 10: Fill in the port for the host (80) and the weight (1) (Do this for all webserver hosts you add)

Step 11: Click on Next to go to the **Health Monitor** tab.
Step 12: Fill in the following fields:
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

Step 13: Click on **Create Load Balancer** to create the loadbalancer.  
Step 14: Click on the small arrow next to the loadbalancer you just created and click on **Associate Floating IP**.  
Step 15: Choose a floating IP or select the net-float pool and click on **Associate**.  
  
Step 16: Wait until the loadbalancer Operating Status is set to ONLINE. after which you can go to `http://<floating-ip>` in your webbrowser and see the loadbalancer in action.  
