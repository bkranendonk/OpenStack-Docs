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
To change your Floating IP Reverse DNS using the OpenStack Dashboard please
follow the steps in the
[Edit a Floating IP Reverse DNS using the OpenStack Dashboard](#edit-a-record-set-using-the-openstack-dashboard)
section.  
To edit a Record Set using the OpenStack CLI please follow the steps in
the
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

## Public / Rented Range / BYoIP
If you want to change your reverse DNS for an IPv4/IPv6 address, you can do
this in the OpenStack Dashboard.  
Changing the Reverse DNS is a bit more complicated for IPv4 or IPv6 addresses
since they are not shown in the Reverse DNS tab like Floating IP's.

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

> Note: After changing the Reverse DNS for a port, it might take a few minutes
before the change is resolvable from the outside world.

---

## Private Address Range
Setting the reverse DNS for private IP ranges is not supported at this moment, if you would like to
do this we recommend creating an internal DNS server and setting the reverse DNS there. 
If you want to know what the private address ranges are then you can find it in [RFC1918](https://tools.ietf.org/html/rfc1918).

