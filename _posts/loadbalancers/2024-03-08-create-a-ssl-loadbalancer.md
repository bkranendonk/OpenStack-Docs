---
layout: page
tags: [Loadbalancers]
page_title: Create a SSL loadbalancer
---

This tutorial guides you through the process of creating a load balancer with SSL encryption. 
The article assumes there is an internal network present with working http web servers listening on 
port 80. When you still need to create webservers and an internal network, please use the first part 
of article [Create a loadbalancer with webservers]({{ '/articles/create-a-loadbalancer-with-webservers' | relative_url }})


---

## SSL certificate
Before creating the load balancer, we need to store our SSL certificaten in OpenStack. We are using 
Keymanager to do so. To read more about Keymanaer, refer to the article 
[Introduction into Keymanager]({{ '/articles/Introduction-into-Keymanager' | relative_url }}).
Currently it is not possible to upload the certificate through Horizon so we will be using the CLI

### Uploading the SSL certificate to keymanager

**Step 1**  
First make sure you have setup the OpenStack CLI and that you are able to
execute commands using the `openstack` command. For more information please
refer to the
[Using the OpenStack CLI article](
    {{ '/articles/using-the-cli-linux' | relative_url }}
).

**Step 2**

We store all certificates on the OpenStack CLI server. We need the following files":
 - certificate.pem (the certificate file for the load balancer)
 - private.key (the private key for the load balancer, password protected)
 - intermediate.pem (intermediate certificate in proper order of your SSL supplier)
We also need a passphrase to decrypt the private key

**Step 3**
Store the certificate in barbican
```bash
certificate=certificate.pem
domain="$(openssl x509 -noout -subject -in "$certificate"|cut -d= -f 3| tr -d ' ')"
name="${domain}_certificate"
openstack secret store --name="${name}" -t 'application/octet-stream' -e 'base64' --payload="$(base64 < "$certificate")" --expiration $(date --date="$(openssl x509 -enddate -noout -in "$certificate"|cut -d= -f 2)" --iso-8601)
```
Make sure to save the returned secret_href as variable, we need that later
```bash
certificate_url="https://keymanager.domain.tld:/v1/secrets/uuid"
```

**Step 4**
Store the passhprase for the private key in barbican.

```bash
name="${domain}_passphrase"

 openstack secret store --secret-type passphrase --name ${name} --payload $(read -sp "Password: ";echo ${REPLY})
```
Answer the password question and press enter

Make sure to save the returned secret_href as variable, we need that later
```bash
passphrase_url="https://keymanager.domain.tld:/v1/secrets/uuid"
```



**Step 5**
Store the private key in barbican

```bash
name="${domain}_private_key"
certificate=private.key
openstack secret store --name="${name}" -t 'application/octet-stream' -e 'base64' --payload="$(base64 < "$certificate")"
```
Make sure to save the returned secret_href as variable, we need that later
```bash
private_key_url="https://keymanager.domain.tld:/v1/secrets/uuid"
```

**Step 5**
Store all intermediate certificates in barbican

```bash
certificate=intermediate.pem
name="${domain}_intermediates"
openstack secret store --name="${name}" -t 'application/octet-stream' -e 'base64' --payload="$(base64 < "$certificate")" --expiration $(date --date="$(openssl x509 -enddate -noout -in "$certificate"|cut -d= -f 2)" --iso-8601)
```
Make sure to save the returned secret_href as variable, we need that later
```bash
intermediates_url="https://keymanager.domain.tld:/v1/secrets/uuid"
```

**Step 6**
Create a certificate container containing the certificate, all intermediates
the passphrase and the private key.

```bash
name="${domain}_container"
openstack secret container create --name "${name}" --type certificate -s "certificate=${certificate_url}" -s "intermediates=${intermediates_url}" -s "private_key=${private_key_url}" -s "private_key_passphrase=${passphrase_url}"

```
Make sure to save the returned secret_href as variable, we need that later
```bash
container_url="https://keymanager.domain.tld:/v1/containers/uuid"
```


