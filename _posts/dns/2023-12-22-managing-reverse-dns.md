---
layout: page
tags: [DNS]
page_title: Managing Reverse DNS
---

When creating a Floating IP or a Port with an external network a reverse DNS
entry is automatically created.  
The default reverse DNS entry might not be what you want, so you have the
ability to change it in the OpenStack Dashboard.

---

## Floating IP
Floating IP's are managed seperately from the other IP's in OpenStack.
If you want to change your reverse DNS for a floating IP, you can do this in
the OpenStack Dashboard or using the OpenStack CLI.

To edit the Reverse DNS of Floating IP using the
OpenStack Dashboard please follow the steps in the
[Edit a Floating IP Reverse DNS using the OpenStack Dashboard](#edit-a-record-set-using-the-openstack-dashboard)
section.  
To edit the Reverse DNS of Floating IP using the
OpenStack CLI please follow the steps in the
[Edit a Floating IP Reverse DNS using the OpenStack CLI](#edit-a-record-set-using-the-openstack-cli)
section. 

### Edit a Floating IP Reverse DNS using the OpenStack Dashboard
If you want to change your reverse DNS for a floating IP, you can do this in
the OpenStack Dashboard.

**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Reverse DNS`.

**Step 3**  
Click on the `Set` button behind the Floating IP you want the change the
Reverse DNS for.  

**Step 4**  
Enter the new Reverse DNS and click on the `Submit` button. (The new Reverse
DNS will be active within 5 minutes)

> Note: When allocating a new Floating IP to your project, you can also set the
 `DNS Domain` and `DNS Name` to configure the Reverse DNS. (Please make sure
 the DNS Domain ends with a dot)

Your Reverse DNS for your FloatingIP will now be changed, it might take a few
minutes before the change is resolvable from the outside world.

### Edit a Floating IP Reverse DNS using the OpenStack CLI
If you want to change your reverse DNS for a floating IP, you can do this in
the OpenStack CLI.

**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**
Run the following command to retrieve all the current reverse DNS entries for
Floating IP's in your project:
```bash
openstack ptr record list
```
**Step 3**
Run the following command to change the reverse DNS for a Floating IP. Make
sure to replace `<ptr_record_id>` with the ID of the reverse DNS entry and
`<record-name>` with the new reverse DNS you want to set (make sure it ends
with a dot).
```bash
openstack ptr record set <ptr_record_id> <record-name>
```

Your Reverse DNS for your FloatingIP will now be changed, it might take a few
minutes before the change is resolvable from the outside world.

---

## Public / Rented Range / BYoIP IP range
If you want to change your reverse DNS for an IPv4/IPv6 address, you can do
this in the OpenStack Dashboard.  
Changing the Reverse DNS is a bit more complicated for IPv4 or IPv6 addresses
since they are not shown in the Reverse DNS tab like Floating IP's.

To edit the Reverse DNS for a Public / Rented Range / BYoIP IP using the
OpenStack Dashboard please follow the steps in the
[Edit a Reverse DNS for an IPv4/IPv6 address using the OpenStack Dashboard](#edit-a-reverse-dns-for-an-ipv4ipv6-address-using-the-openstack-dashboard)
section.  
To edit the Reverse DNS for a Public / Rented Range / BYoIP IP using the
OpenStack CLI please follow the steps in the
[Edit a Reverse DNS for an IPv4/IPv6 address using the OpenStack CLI](#edit-a-reverse-dns-for-an-ipv4ipv6-address-using-the-openstack-cli)
section. 

### Edit a Reverse DNS for an IPv4/IPv6 address using the OpenStack Dashboard
**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `NETWORK` section and click on `Networks`.

**Step 3**  
Click on the network in which the target IP address is located. (for example
`net-public`)

**Step 4**  
Click on the `Ports` tab.

**Step 5**  
Click on the `Edit Port` button behind the port you want the change the Reverse
DNS for.

**Step 6**  
Change the `Name` of the port to the new Reverse DNS you want to set and click
on the `Save` button. (The new Reverse DNS will be active within 5 minutes)

> Note: When creating a new Port in your project, you can also set the
`DNS Domain` and `DNS Name` to configure the Reverse DNS. (Please make sure the
 DNS Domain ends with a dot)

Your Reverse DNS for your port will now be changed, it might take a few minutes before the change is resolvable from the outside world.

### Edit a Reverse DNS for an IPv4/IPv6 address using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**
We will first need to retrieve the ID of the port on which the IP address is
located for which we want to change the reverse DNS. Run the following command
to retrieve a list of all the ports in your project:
```bash
openstack port list
```

> Note: Add the `--network <network-id/network-name>` argument to the command
to only list the ports in a specific network.

> Note: Add the `--server <server-id/server-name>` argument to the command to
only list the ports attached to a specific server (instance).

Your Reverse DNS for your port will now be changed, it might take a few minutes before the change is resolvable from the outside world.

**Step 3**
Now that we have the ID of the port we can change the reverse DNS for the port.
We can do this be renaming the port to the wanted reverse DNS. Make sure to
replace `<port-id>` with the ID of the port and `<record-name>` with the new
reverse DNS you want to set.
```bash
openstack port set <port-id> --name <record-name>
```

---

## Private Address Range
Setting the reverse DNS for private IP ranges is not supported, if you would
like to create a DNS zone for you private range we recommend creating an
internal DNS server and setting the reverse DNS there. If you would like to
know more about what the private address ranges are then you can find it in [RFC1918](https://tools.ietf.org/html/rfc1918).

