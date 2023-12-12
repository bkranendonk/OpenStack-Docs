# Octavia Load balancer How To

Create an internal network (in this tutorial, the network is named "web")
Create an internal subnet (10.10.40.0/24)
Create an OpenStack router with an external network (net-float)
Add an interface to the OpenStack router on the network "web"

Create a jumphost instance on the web network
 attach a floating IP to it
Create 3 web servers on the internal network (all in a different Availability of course ;)

to create a load balancer, please use the guide below:
https://docs.openstack.org/octavia/latest/user/guides/basic-cookbook.html#deploy-a-tls-terminated-https-load-balancer

When you want redirect http to https, use the following guide:

https://docs.openstack.org/octavia/latest/user/guides/l7-cookbook.html#redirect-http-www-example-com-to-https-www-example-com