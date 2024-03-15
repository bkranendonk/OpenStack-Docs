---
layout: page
tags: [Volume]
page_title: Volume groups
---

# Volume groups
In this article we will go through the process of creating a volume group and
adding volumes to it. We will also go through the process of removing volumes
from a volume group and deleting a volume group.

If you want to skip through the article, you can use the following links to 
navigate to the section you are interested in:
 - [Creating a volume group](#creating-a-volume-group)
 - [Deleting a volume group](#deleting-a-volume-group)
 - [Adding volumes to a volume group](#adding-volumes-to-a-volume-group)
 - [Removing volumes from a volume group](
    #removing-volumes-from-a-volume-group)
 - [Creating a volume group snapshot](
    #creating-a-volume-group-snapshot)
 - [Restoring a volume group snapshot](
    #restoring-a-volume-group-snapshot)

---

## Creating a volume group
Creating a volume group is a simple process and can be done using the
OpenStack Dashboard or the OpenStack CLI. In this article we will go through
both methods.

 - [Create a volume group using the OpenStack Dashboard](
    #create-a-volume-group-using-the-openstack-dashboard)
 - [Create a volume group using the OpenStack CLI](
    #create-a-volume-group-using-the-openstack-cli)

### Create a volume group using the OpenStack Dashboard
**Step 1**  
Log in to the OpenStack Dashboard.

**Step 2**  
Navigate to the `VOLUMES` section and click on `Groups`.

**Step 3**  
Click on the `+ CREATE GROUP` button right above the volume group list.

**Step 4**  
Fill in the fields with the information you want to use for the volume group.
 - **Name**: _A name for the volume group_
 - **Description**: _A description for the volume group_
 - **Group Type**: Generic
 - **Availability Zone**: _The availability zone in which the volume group
should be created_

**Step 5**  
Click on the `Manage Volume Types` text at the top of the pop-up window.
On this page you can select the volume type you want to use within the
volume group.

**Step 6**  
Click on the `Create Group` button at the bottom of the pop-up window. This
will start the creation of your volume group.

Now we have created a volume group we can proceed to adding volumes to the
volume group. For more information on how to add volumes to a volume group
please refer to the
[Adding volumes to a volume group](#adding-volumes-to-a-volume-group) section.

### Create a volume group using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**
List all volume types to get the ID of the volume type you want to use within
the volume group.

```bash
openstack volume type list
```

**Step 3**  
Next, we will gather find the volume group types available in the OpenStack
environment. This can be done with the following command:

```bash
openstack volume group type list --os-volume-api-version 3.51
```

**Step 4**  
Now we will create the volume group, make sure to replace the `<group-type>`,
`<availability-zone>`, `<volume-type>` and `<group-name>` with the correct
values.
```bash
openstack volume group create --os-volume-api-version 3.51 --volume-group-type <group-type> --availability-zone <availability-zone> --volume-type <volume-type> --name <group-name>
```

> Note: If you do not know which availability zones are available you can use
> the following command to list them:
> ```bash
> openstack availability zone list
> ```

> Note: If you do not know which volume types are available you can use the
> following command to list them:
> ```bash
> openstack volume type list
> ```

Now we have created a volume group we can proceed to adding volumes to the
volume group. For more information on how to add volumes to a volume group
please refer to the
[Adding volumes to a volume group](#adding-volumes-to-a-volume-group) section.


---

## Adding volumes to a volume group
Adding volumes to a volume group is a simple process and can be done using the
OpenStack Dashboard.

 - [Add volumes to a group using the OpenStack Dashboard](
    #add-volumes-to-a-group-using-the-openstack-dashboard)

### Add volumes to a group using the OpenStack Dashboard
**Step 1**  
Log in to the OpenStack Dashboard.

**Step 2**  
Navigate to the `VOLUMES` section and click on `Groups`.

**Step 3**  
Click on the small arrow button behind the volume group you want to add volumes
to and click on `MANAGE VOLUMES`.

**Step 4**  
Click on the `+` button next to the volumes you want to add.

**Step 5**  
Click on the `SUBMIT` button at the bottom of the pop-up window. your volumes
will now be added to the volume group.

Now that we have added volumes to the volume group we can exit this article
or proceed to the
[Removing volumes from a volume group](#removing-volumes-from-a-volume-group)
section where we will undo the process we just did.

### Add volumes to a group using the OpenStack CLI
At the time of writing this article 03-2024 the OpenStack CLI does not 
support adding volumes from a volume group. We recommend using the OpenStack
Dashboard to add volumes from a volume group or using the
[Cinder CLI client](
https://docs.openstack.org/python-cinderclient/latest/cli/details.html
){:target="_blank"}
to add volumes from a volume group.

---

## Removing volumes from a volume group
Removing volumes from a volume group is a simple process and can be done using\
the OpenStack Dashboard.

 - [Remove volumes from a group using the OpenStack Dashboard](
    #remove-volumes-from-a-group-using-the-openstack-dashboard)

### Remove volumes from a group using the OpenStack Dashboard
**Step 1**  
Log in to the OpenStack Dashboard.

**Step 2**  
Navigate to the `VOLUMES` section and click on `Groups`.

**Step 3**  
Click on the small arrow button behind the volume group you want to remove
the volumes from and click on `MANAGE VOLUMES`.

> Note: If you want to remove all volumes from a volume group you can also
> chose to click on `REMOVE VOLUMES FROM GROUP` instead of `MANAGE VOLUMES`.
> In the pop-up menu that opens click on `SUBMIT` to remove all volumes from
> the volume group. This is not required but its faster then manually removing
> all volumes from the group.

**Step 4**  
Click on the `-` button next to the volumes you want to remove.

**Step 5**  
Click on the `SUBMIT` button at the bottom of the pop-up window. your volumes
will now be removed to the volume group.



### Remove volumes from a group using the OpenStack CLI
At the time of writing this article 03-2024 the OpenStack CLI does not 
support removing volumes from a volume group. We recommend using the OpenStack
Dashboard to remove volumes from a volume group or using the
[Cinder CLI client](
https://docs.openstack.org/python-cinderclient/latest/cli/details.html
){:target="_blank"}
to remove volumes from a volume group.

---

## Deleting a volume group
Deleting a volume group is a simple process and can be done using the
OpenStack Dashboard or the OpenStack CLI. In this article we will go through
both methods.

 - [Delete a volume group using the OpenStack Dashboard](
    #delete-a-volume-group-using-the-openstack-dashboard)
 - [Delete a volume group using the OpenStack CLI](
    #delete-a-volume-group-using-the-openstack-cli)


### Delete a volume group using the OpenStack Dashboard
**Step 1**  
Log in to the OpenStack Dashboard.

**Step 2**  
Navigate to the `VOLUMES` section and click on `Groups`.

**Step 3**  
Click on the small arrow button behind the volume group you want to add volumes
to and click on `DELETE GROUP`.

> Note: If the `DELETE GROUP` button is not available you might have Group 
> Snapshots for the volume group. You will need to delete all group snapshots
> before this option will reappear.

**Step 4**  
In the pop-up window that opens select the `Delete Volumes` checkbox but
**only** if you want to **delete all volumes** which are part of the volume
group you are trying to delete.

**Step 5**  
Click on the `DELETE GROUP` button at the bottom of the pop-up window. Your
volume group will now be deleted.

### Delete a volume group using the OpenStack CLI
**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
List all volume groups to get the ID of the volume group you want to delete.
```bash
openstack volume group list --os-volume-api-version 3.51
```

**Step 3**  
> Note: Before deleting your volume group make sure you do not have any
> volumes in the group and all group snapshots have been removed.

Now we will delete the volume group, make sure to replace the `<group-id>`
with the ID of the volume group you want to remove.
```bash
openstack volume group delete <group-id> --os-volume-api-version 3.51
```

> Note: If you still have volumes attached and want to delete them as well you
can add the `--force` argument to the command. This will delete all volumes
attached to the volume group together with the Volume Group.

Your volume group will now be deleted.

---

## Creating a volume group snapshot
Creating a snapshot for a volume group is a simple process and can be done
using the OpenStack Dashboard or the OpenStack CLI. In this article we will go
through both methods.

 - [Create a volume group snapshot using the OpenStack Dashboard](
    #create-a-volume-group-snapshot-using-the-openstack-dashboard)
 - [Create a volume group snapshot using the OpenStack CLI](
    #create-a-volume-group-snapshot-using-the-openstack-cli)

### Create a volume group snapshot using the OpenStack Dashboard
**Step 1**
Log in to the OpenStack Dashboard.

**Step 2**
Navigate to the `VOLUMES` section and click on `Groups`.

**Step 3**
Click on the `CREATE SNAPSHOT` button behind the volume group you want to
create a snapshot for.

The snapshots will now be created. This process can take a while depending on
the size of the volumes in the volume group.

### Create a volume group snapshot using the OpenStack CLI
**Step 1**
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**
First we will list all volume groups to get the ID of the volume group you
want to create a snapshot for.
```bash
openstack volume group list --os-volume-api-version 3.51
```

**Step 3**
We will now proceed to create the volume group snapshot, make sure to replace
the `<group-id>` with the ID of the volume group you want to create a snapshot
and `<name>` with the name you want to give the snapshot.
```bash
openstack volume group snapshot create --os-volume-api-version 3.51 <group-id> --name <name> 
```

## Restoring a volume group snapshot
Sadly at the time of writing this article 03-2024 the OpenStack does not
provide a way to restore a volume group snapshot. The snapshots are only 
restorable individually. We recommend using the OpenStack Dashboard to restore
a volume group snapshot or using the OpenStack CLI to restore the snapshots
individually.

You can find the OpenStack Snapshot in the OpenStack Dashboard by going to the
`VOLUMES` section and then clicking on `Snapshots`.

<!-- TODO: Add a link to a snapshot restore article -->