---
layout: page
tags: [DNS]
page_title: Create a DNS zone
---

# Create a DNS zone
DNS is an essential part of any infrastructure and system. Within the OpenStack
Environment you can use the `designate` service to create DNS zones. These
DNS zones can be used to house your DNS records for you enviroment.

If you want to learn more about DNS and how it works, you can read the
[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) Wikipedia page.

If you want to learn more about the `designate` service, you can read the
[OpenStack Designate](https://docs.openstack.org/designate/latest/)
documentation.

## Create the DNS Zone
To create a DNS zone you can use the OpenStack Dashboard or the OpenStack CLI.

To create a DNS zone using the OpenStack Dashboard please follow the steps in
the
[Create a zone using the OpenStack Dashboard](#create-a-zone-using-the-openstack-dashboard) section.  
To create a DNS zone using the OpenStack CLI please follow the steps in the
[Create a zone using the OpenStack CLI](#create-a-zone-using-the-openstack-cli) section.

### Create a zone using the OpenStack Dashboard
The following steps will guide you through the process of creating a DNS zone
within OpenStack designate using the OpenStack Dashboard.

**Step 1**  
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Zones`.

**Step 3**
Click on the `Create Zone` button right above the zone list (your zone list may
be empty).  

**Step 4**  
Enter the zone `Name` for example cloudtutorials.eu. (make sure the domain
ends with a dot).  

**Step 5**  
Enter the `Description` (not required). 
 
**Step 6**  
Enter an `Email Address` which you want to use for the zone. Please be aware
the email will be shown publicly in the SOA record. We recommend using an
email address that is not personal like hostmaster@.  

**Step 7**  
Make sure the `Type` is set to `Primary`.  

**Step 8**  
Click on the `Create Zone` button after which you zone will be created.

> Note: When creating a new zone in your project it might take a few minutes
before it is resolvable from the outside world.

You can now procceed to retrieving the nameservers for the DNS zone.
Instructions on how to do this can be found in the [Retrieve the Nameservers
for the DNS]( #retrieve-the-nameservers-for-the-dns-zone) section. If you have
already setup the nameservers or you would like to first add records to the
zone before changing your nameservers, you can read the [Managing DNS Records](
{{ '/articles/managing-dns-records' | relative_url }}) article.

### Create a zone using the OpenStack CLI
The following steps will guide you through the process of creating a DNS zone
within OpenStack designate using the OpenStack CLI.

**Step 1**
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**
Create a new DNS zone using the `openstack` command. Make sure to replace
`<zone-name>` with the name of the zone you want to create and `<email>` with
the email address you want to use for the zone. Be aware that the email will be
shown publicly in the SOA record.  We recommend using an email address that is
not personal like hostmaster@.  
```bash
openstack zone create <zone-name> --email <email>
```

> Note: When creating a new zone in your project it might take a few minutes
before it is resolvable from the outside world.

You can now procceed to retrieving the nameservers for the DNS zone.
Instructions on how to do this can be found in the [Retrieve the Nameservers
for the DNS]( #retrieve-the-nameservers-for-the-dns-zone) section. If you have
already setup the nameservers or you would like to first add records to the
zone before changing your nameservers, you can read the [Managing DNS Records](
{{ '/articles/managing-dns-records' | relative_url }}) article.

---

## Retrieve the Nameservers for the DNS Zone
Nameservers are an essential part of the DNS system. They are the servers that
hold the DNS records for a domain. When you create a DNS zone in OpenStack 
Designate, you will need to change the nameservers at your domain registrar to
the ones provided by OpenStack Designate.

To create a DNS zone using the OpenStack Dashboard please follow the steps in
the 
[Retrieve nameservers using the OpenStack Dashboard](#retrieve-nameservers-using-the-openstack-dashboard)
section.  
To create a DNS zone using the OpenStack CLI please follow the steps in the
[Retrieve nameservers using the OpenStack CLI](#retrieve-nameservers-using-the-openstack-cli)
section.

### Retrieve nameservers using the OpenStack Dashboard
The following steps will guide you through the process of retrieving the
nameservers for a DNS zone within OpenStack Designate using the OpenStack
Dashboard.

**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Zones`.

**Step 3**  
Click on the name of the zone of which you want to retrieve the Nameservers
from.  

**Step 4**  
Click on the `Record Sets` tab.  

**Step 5**  
Find the `NS - Name server` type (The `Records` of this entry are the
nameservers normally something like `ns1.*` and `ns2.*`).

**Step 6**  
Copy the `Records` of the `NS - Name server` type.

**Step 7**  
Go to your domain registrar and change the nameservers to the ones you copied
in the previous step.  

**Step 8**  
Wait for the nameserver change to propagate.

> Note: When changing the nameservers at your domain registrar it might take a
few hours before the change is propagated to the outside world.  

### Retrieve nameservers using the OpenStack CLI
The following steps will guide you through the process of retrieving the
nameservers for a DNS zone within OpenStack Designate using the OpenStack
CLI.

**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
We will first need to retrieve the ID of the zone we want to retrieve the
nameservers from. Use the `openstack` command to list the zones and retrieve
the ID of the zone you want to retrieve the nameservers from. You may
already know the ID of the zone you want to retrieve the nameservers from if
you have created the zone using the CLI.
```bash
openstack zone list
```

**Step 3**  
Retrieve the nameservers for the DNS zone using the `openstack` command. Make
sure to replace `<zone-id>` with the name of the zone you want to retrieve
the nameservers from.  
```bash
openstack record list <zone-id> --type NS --c records
```

**Step 4**  
Go to your domain registrar and change the nameservers to the ones you found
in the previous step.

**Step 5**  
Wait for the nameserver change to propagate.

> Note: When changing the nameservers at your domain registrar it might take a
few hours before the change is propagated to the outside world.  

---

Now that we have created a DNS zone and configured the nameservers for the DNS
zone, you can start adding DNS records to the zone. Instructions on how to
do this can be found in the [Managing DNS Records](
    {{ '/articles/managing-dns-records' | relative_url }}) article.

Fun fact: Did you know the DNS for cloudtutorials.eu is hosted using the
OpenStack Designate service.