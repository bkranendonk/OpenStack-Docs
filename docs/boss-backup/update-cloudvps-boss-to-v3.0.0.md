# Tutorial: Updating CloudVPS Boss Backup Script for Keystone V3 Compatibility  

This tutorial guides you through updating the CloudVPS-Boss Backup script to make it compatible with OpenStack Keystone V3.  

**Note**: This script enables you to create backups to your ObjectStore project using the **Restic** backup tool instead of **Duplicity**. Please be aware that the CloudVPS-Boss script is **not officially supported**.

---

## Notice  

In this tutorial, we will install **CloudVPS-Boss version 3.0.0**, a newer version of the script that is compatible with the latest OpenStack Keystone V3.  

### Important!  
When you upgrade to the new V3 implementation using the Restic-backup method, your backups will restart. This means:  
- Your old backups **will still exist** but cannot be restored using Restic.  
- We recommend creating a **new backup immediately** after installing the new version to ensure you have a backup that can be restored with Restic.  
- Old backups created with a previous version of CloudVPS-Boss cannot be restored and will **not** be removed automatically. To avoid paying for stale backups, manually remove them after **1–2 weeks**.

---

## Installing CloudVPS-Boss v3.0.0  

Follow these steps to install CloudVPS-Boss:  

1. **Clone the repository and run the installer**:  
   ```bash
    git clone https://github.com/CloudVPS/CloudVPS-Boss.git --branch support-v3-and-use-restic
    cd CloudVPS-Boss
    bash install.sh
   ```

2. **Source the credentials**:  
   These credentials are required to create the Restic repository in your ObjectStore project.  
   *(You will not receive any feedback from the CLI client; this is expected)*:  
   ```bash
   source /etc/cloudvps-boss-v3/v3-auth.conf
   ```

3. **Create a Restic repository**:  
   Use the following command to initialize the repository. Choose a secure password and store it safely.  
   *(You will need this password to restore backups or in the next step)*:  
   ```bash
   restic init -r swift:cloudvps-boss-v3:/
   ```

4. **Store the restic password**:  
   Save the password used for the Restic repository in the configuration file:  
   ```bash
   nano /etc/cloudvps-boss-v3/restic-password.conf
   ```
   Save the file by pressing `CTRL + X` and then `Y`.

5. **Start the backup**:  
   Once configured, you can start the backup process. By default, backups run **daily**. For more configuration options, refer to the optional steps:  
   ```bash
   cloudvps-boss
   ```

---

## Credits  

Special thanks to [Cream Commerce B.V.](https://www.cream.nl/) for implementing Restic backup in their own fork, we have used this implementation in the v3.0.0 version of the CloudVPS-Boss script.  
You can find their CloudVPS-Boss fork [here](https://github.com/creamcloud/backup).  
