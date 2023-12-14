---
layout: page
tags: [Loadbalancers]
page_title: Create an loadbalancer
---

# Creating an loadbalancer

## Setting up your OpenStack network
Before we start creating a loadbalancer, we need to setup an internal OpenStack network. We need to create an internal network, an internal subnet and an OpenStack router. If you have already setup your network, please skip this setup and scroll down to the **Creating the loadbalancer** section.

### Creating an internal network
First we need to create an internal network. In this tutorial, the network is named "webserver-network" but you can call it however you want.

### Creating an router
Now we need to create an OpenStack router. In this tutorial, the router is named "webserver-network-router" to make it clear that this router is connected to the "webserver-network" network. You can call the router however you want.

## Creating the loadbalancer
Now we can create the loadbalancer. We will create a loadbalancer with a listener, a pool and a healthmonitor.

### Creating a listener

### Creating a pool

### Creating a healthmonitor

