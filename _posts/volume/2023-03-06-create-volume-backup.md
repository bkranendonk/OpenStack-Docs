---
layout: page
tags: [Volume]
page_title: Create a volume backup
---

# Create a volume backup

Backups are an essential part of any infrastructure and system. Within the 
OpenStack Environment you can use the `cinder` service to create backups of
volumes. These can be used to restore a volume in case of data loss or
corruption.

This article will guide you through the process of creating a backup of a
volume using the OpenStack Dashboard and the OpenStack CLI. If you do not yet
have a volume which you want to backup then please refer to the
[Create a volume]({{ '/articles/create-a-volume' | relative_url }}) article.

## Using the OpenStack Dashboard
Create a volume backup using the OpenStack Dashboard is quite simple. With
the following steps you can create a backup of a volume.

**Step 1**  
Log in to the OpenStack Dashboard.

**Step 2**  
Navigate to the `VOLUMES` section and click on `Volumes`.

**Step 3**  
Click on the small arrow next to the volume you want to backup and click on
`Create Backup`.

**Step 4**  
Fill in the required fields and click on `Create Backup`.

 - **Name**: A name for the backup
 - **Description**: A description for the backup
 - **Container Name**: Leave empty
 - **Backup Snapshot**: _Keep the default value_
 - **Incremental Backup**: Leave unchecked

> Note: The `Incremental Backup` option is only available if the volume is 
already backuped once. 

> Note: The `Incremental Backup` checkbox can be used if you want to create an
incremental backup. This means that only the changes since the last backup are
saved. This can save a lot of storage space and time when creating the backup.
Please note that restoring an incremental backup can take longer than
restoring a full backup.

> Note: The `Backup Snapshot` option can be used if you want to create a backup
of the snapshot of the volume. This can be useful if you want to create a
backup of the volume at a specific point in time.

---

## Using the OpenStack CLI
Create a backup of a volume using the OpenStack CLI is quite simple. With
the following steps you can create a backup of a volume. The benefit of using
the CLI is that you can automate the backup process and have more options then
using the OpenStack Dashboard.

**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**  
List all volumes to get the ID of the volume you want to backup.

```bash
openstack volume list
```

**Step 3**  
Create a backup of the volume using the following command. Replace
`<volume-id>` with the ID of the volume you want to backup.

```bash
openstack volume backup create <volume-id> --name <backup-name> --description <backup-description>
```

> Note: If you want to create an incremental backup, you can add `--incremental`
argument to the command above the make the backup.

> Note: If you want to create the backup in an other availability zone, you can
add `--availability-zone <availability-zone>` argument to the command above.

---

All done! You have now created a backup of a volume. Altough we hope you never
have to use the backup, it is best to have them in case of an emergency.
You can use the backup to restore the volume in case of data loss or
corruption. For more information please refer to the [Restore a volume backup](
{{ '/articles/restore-volume-backup' | relative_url }}) article.
