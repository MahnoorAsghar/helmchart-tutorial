AWS API Gateway - EC2 Integration (Console + Terraform | Backend | Endpoint | HTTP | Tutorial)

Find Fibonacci Number Of A Given Index

## Direct Public Integration - Example 1 - Console
## Direct Public Integration - Example 1 - Terraform
## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Console
## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Terraform
## Private Integration Using VPC Link and Network Load Balancer with Auto Scaling Group - Example 3 - Console
## Private Integration Using VPC Link and Network Load Balancer with Auto Scaling Group - Example 3 - Terraform
## Outro -> watch aws api custom domain 3 examples (terraform) ???


## Direct Public Integration - Example 1 - Console

- create vpc (0-5 terraform files)
  - cd terraform
  - terraform init
  - terraform apply
- create sg (my-app-example-1)
  - allow 22 from anywhere ip v4, Allow SSH
  - allow 8080 from anywhere ip v4, Allow API Public Access
- create ec2 instance in public subnet (my-app-example-1)
- create keypair devops (rsa since ED25519 not for windows)
- sudo chmod 600 ~/Downloads/devops.pem
- ssh -i ~/Downloads/devops.pem ubuntu@3.87.168.222
- sudo apt update
- sudo apt -y install nodejs npm
- cd /opt
- sudo git clone -b 118 https://github.com/antonputra/tutorials.git
- sudo chown -R ubuntu:ubuntu /opt/tutorials/
- cd tutorials/lessons/118/app/
- npm ci

node app.js


Create 
sudo vim /etc/systemd/system/my-app.service
check node with which node

[Unit]
Description=My App

[Service]
Type=simple
ExecStart=/usr/bin/node /opt/my-app/app.js
WorkingDirectory=/opt/my-app/

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=my-app

# Restart service after 10 seconds if node service crashes
Restart=always
RestartSec=10


[Install]
WantedBy=multi-user.target

sudo systemctl enable my-app.service
sudo systemctl start my-app.service
sudo systemctl status my-app.service

if exited check errors
journalctl -u my-app -f --no-pager


curl -i -X POST -H "Content-Type: application/json" -d '{"index":40}' localhost:8080/fib
curl -i localhost:8080/hello

create ami "my-app-v1"

delete ec2 in public subnet
create ec2 based on this instance in private subnet (sg?? keep or new one? if you need to debug and ssh, smm??)


https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html

{proxy+}

http://10.0.5.69:8080/{proxy}

curl -i https://2r5opzgzx1.execute-api.us-east-1.amazonaws.com/staging/hello


curl http://54.196.54.111:8080/hello

## Direct Public Integration - Example 1 - Terraform

## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Console

- create ec2 in private subnet (my-app-example-2)
- use new security group (my-app-example-2) (VPC CIDR as source for health check)
- create nlb (80)
- create target group (8080) + instance id
- wait till nlb is provisioned

- create vpc link
- create routes
{proxy+}

curl -i https://2r5opzgzx1.execute-api.us-east-1.amazonaws.com/staging/hello



create custom domain "api.devopsbyexample.io"

curl -i https://api.devopsbyexample.io/hello

## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Terraform

## Private Integration Using VPC Link and Network Load Balancer with Auto Scaling Group - Example 3 - Console

## Private Integration Using VPC Link and Network Load Balancer with Auto Scaling Group - Example 3 - Terraform



## ec2 integration with ec2 directtly (private integrations) (one path routed to 1 microservice /clients/<id>) (autoscalling group) (Console)

- create Launch Template
- create ag

curl -i https://api.devopsbyexample.io/hello

curl -X POST \
-H "Content-Type: application/json" \
-d '{"index":4}' \
https://api.devopsbyexample.io/fib