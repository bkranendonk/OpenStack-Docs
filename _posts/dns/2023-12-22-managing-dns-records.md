---
layout: page
tags: [DNS]
page_title: Managing DNS Records
---

Recordsets are used to define the DNS records for a zone. A recordset is a
collection of records that share the same name. For example, a recordset named
`www.example.com` can contain multiple records (for example 192.168.1.20 and 192.168.1.26). A
recordset named `mail.example.com` may contain records for the `MX` record
type.

For this guide we assume you have already created a DNS Zone, if you haven't
done this yet please read the following article:
[Create a DNS Zone]({{ '/articles/create-a-dns-zone' | relative_url }})

If you want to manage your Reverse DNS records please read the article about
[managing reverse DNS records](
{{ '/articles/managing-reverse-dns' | relative_url }}).

---

## Create a Record Set
If you want to create a new recordset for a zone you can do this using the
OpenStack Dashboard or the OpenStack CLI. A recordset is a collection of
records that share the same name. The instructions below will guide you through
the process of creating a new recordset using the OpenStack Dashboard and the
OpenStack CLI.

To create a Record Set using the OpenStack Dashboard please follow the steps in
the
[Create a Record Set using the OpenStack Dashboard](#create-a-record-set-using-the-openstack-dashboard)
section.  
To create a Record Set using the OpenStack CLI please follow the steps in
the
[Create a Record Set using the OpenStack Dashboard](#create-a-record-set-using-the-openstack-cli)
section. 


### Create a Record Set using the OpenStack Dashboard

**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Zones`.

**Step 3**  
Click on `Create Record Set` behind the zone you want to create a recordset in.  

**Step 4**  
Select the type of record you want to create for this tutorials we create an A
record.  

**Step 5**  
Enter the `Name` for example `www.example.com.` (make sure you enter the full
FQDN and that the record ends with a dot).  

**Step 6**  
Enter the `Description` (not required).  

**Step 7**  
Enter the `TTL` which stands for Time To Live, we recommend to set this to 3600
 (one hour).  

**Step 8**  
Enter a `Record` under `Records` for example 127.0.0.1. (You can create
multiple with the `Add Record` button).  

**Step 9**  
Click on the `Submit` button after which you recordset will be created.  

Your recordset will now be created. Depending on the time to live of the record
it might take a few minutes/hours before the record is resolvable from the
outside world.

### Create a Record Set using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
When editing a recordset we need to know the zone id of the zone in which the
recordset is located. To retrieve the zone id we can use the following command:
```bash
openstack zone list
```

**Step 3**  
Now that we have the zone id we can create a recordset using the following
command. Replace the `<zone_id>`, `<record_name>`, `<type>` and
`<record>` with the values required for your recordset. When entering the
recordname make sure the include the full FQDN and that the record ends with a
dot. For example `newrecord.example.com.`.
```bash
openstack recordset create <zone_id> <record_name> --type <type> --record <record>
```

> Note: The `--record` flag can be used multiple times to add multiple
records to your recordset.

> Note: The `--type` flag can be used to specify the type of record you want to
create. For example `A`, `AAAA`, `CNAME`, `MX`, `NS`, `PTR`, `SOA`, `SRV`,
`TXT`, etc.

> Note: The `--ttl` flag can be used to specify the Time To Live for the
recordset. The default value is TTL set on your zone which is by default 3600 
(one hour).

Your recordset will now be created. Depending on the time to live of the record
it might take a few minutes/hours before the record is resolvable from the
outside world.

---

## Edit a Record Set
Editing a recordset may be needed whenever you have changed the IP address of a
server or when you have changed the target of a service. For example, when you
migrate away from you own loadbalancer to a loadbalancer provided by OpenStack
Octavia.

To edit a Record Set using the OpenStack Dashboard please follow the steps in
the
[Edit a Record Set using the OpenStack Dashboard](#edit-a-record-set-using-the-openstack-dashboard)
section.  
To edit a Record Set using the OpenStack CLI please follow the steps in
the
[Edit a Record Set using the OpenStack Dashboard](#edit-a-record-set-using-the-openstack-cli)
section. 

### Edit a Record Set using the OpenStack Dashboard
**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Zones`.

**Step 3**  
Click on the zone of which you want to edit the recordset.  
**Step 4**  
Click on the `Record Sets` tab.  

**Step 5**  
Click on the `Update` button behind the recordset you want to edit.  

**Step 6**  
Edit the fields you want to edit (`Name`, `Description`, `TTL` or `Records`).  

**Step 7**  
Click on the `Submit` button after which you recordset will be updated.

Your recordset will now be changed. Depending on the time to live of the record
it might take a few minutes/hours before the change is resolvable from the
outside world.

### Edit a Record Set using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
When editing a recordset we need to know the zone id of the zone in which the
recordset is located. To retrieve the zone id we can use the following command:
```bash
openstack zone list
```

**Step 3**
Now that we have the zone id we can list the recordsets within the zone to
retrieve the id of the recordset we want to edit. Use the following command to
list the recordsets within the zone and retrieve the id of the recordset you
want to edit.
```bash
openstack recordset list <zone_id>
```

**Step 4**
Now that we have the zone id and the recordset id we can update the recordset
using the following command. Replace the `<zone_id>`, `<recordset_id>` and 
`<record>` with the values required for your recordset.
```bash
openstack recordset set <zone_id> <recordset_id> --record <record>
```

> Note: The `--record` flag can be used multiple times to add multiple
records to your recordset.

> Note: The `--ttl` flag can be used to specify the Time To Live for the
recordset. The default value is TTL set on your zone which is by default 3600 
(one hour).

Your recordset will now be changed. Depending on the time to live of the record
it might take a few minutes/hours before the change is resolvable from the
outside world.

---

## Delete a Record Set
Deleting a recordset may be needed whenever you have removed a service or
resource that was previously associated with the recordset. For example, when
you have removed a server that was previously associated with an `A` record.

To delete a Record Set using the OpenStack Dashboard please follow the steps in
the
[Delete a Record Set using the OpenStack Dashboard](#delete-a-record-set-using-the-openstack-dashboard)
section.  
To delete a Record Set using the OpenStack CLI please follow the steps in
the
[Delete a Record Set using the OpenStack Dashboard](#delete-a-record-set-using-the-openstack-cli)
section. 

### Delete a Record Set using the OpenStack Dashboard
**Step 1**   
Login into the OpenStack Dashboard.

**Step 2**  
Navigate to the `DNS` section and click on `Zones`.

**Step 3**  
Click on the zone of which you want to delete the recordset.

**Step 4**  
Click on the `Record Sets` tab.  

**Step 5**  
Click on the small arrow button behind the recordset you want to delete.  

**Step 6**  
Click on `Delete` after which you recordset will be deleted.  

Your recordset will now be deleted. Depending on the time to live of the record
it might take a few minutes/hours before the record is no longer known to the
outside world.

### Delete a Record Set using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
When editing a recordset we need to know the zone id of the zone in which the
recordset is located. To retrieve the zone id we can use the following command:
```bash
openstack zone list
```

**Step 3**
Now that we have the zone id we can list the recordsets within the zone to
retrieve the id of the recordset we want to edit. Use the following command to
list the recordsets within the zone and retrieve the id of the recordset you
want to edit.
```bash
openstack recordset list <zone_id>
```

**Step 4**
Now that we have the zone id and the recordset id we can update the recordset
using the following command. Replace the `<zone_id>`, `<recordset_id>`, with 
the values required for your recordset.
```bash
openstack recordset delete <zone_id> <recordset_id>
```

Your recordset will now be deleted. Depending on the time to live of the record
it might take a few minutes/hours before the record is no longer known to the
outside world.