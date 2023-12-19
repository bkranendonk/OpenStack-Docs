---
layout: page
tags: [Compute]
page_title: Create an instance
---

This tutorial guides you through the process of creating a set of web servers on an existing internal network.
The instancess will run an apache2 server and host a basic webpage with the instance hostname.


---

## Prerequisites

This tutorial assumes an internal network is created that is connected to a router with an external gateway.
You can create a network like this with the [Create an internal network]({{ '/articles/create-an-loadbalancer' | relative_url }}) tutorial.

---

## Creating the webservers
For this tutorial, we'll set up three webservers. Feel free to adjust the number of webservers according  
to your needs.  

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

We recomend repeating the process for every availability zone to allow for an availability zone to fail

---
