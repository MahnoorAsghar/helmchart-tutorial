AWS API Gateway - EC2 Integration (Console + Terraform | Backend | Endpoint | HTTP | Tutorial)

Find Fibonacci Number Of A Given Index
For intro, one screen with title and image/diagram

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
- create sg (my-app-example-1) Allow API Access
  - allow 22 from anywhere ip v4
  - allow 8080 from anywhere ip v4
- create ec2 instance in public subnet (my-app-example-1)
- create keypair devops (rsa since ED25519 not for windows)
- sudo chmod 600 ~/Downloads/devops.pem
- ssh -i ~/Downloads/devops.pem ubuntu@54.198.70.161
- sudo apt update
- sudo apt -y install nodejs npm
- cd /opt
- sudo git clone -b 118 https://github.com/antonputra/tutorials.git
- sudo chown -R ubuntu:ubuntu /opt/tutorials/
- cd tutorials/lessons/118/my-app/
- npm ci

Create 
check node with `which node`
sudo vim /etc/systemd/system/my-app.service

[Unit]
Description=My App

[Service]
Type=simple
ExecStart=/usr/bin/node /opt/tutorials/lessons/118/my-app/app.js
WorkingDirectory=/opt/tutorials/lessons/118/my-app/

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

`sudo systemctl enable my-app.service`
`sudo systemctl start my-app.service`
`sudo systemctl status my-app.service`

- if exited check errors
`journalctl -u my-app -f --no-pager`

curl -i http://<ip>:8080/health

- create api gateway
  - HTTP API
  - API name: api-gw-example-1
  - Skip routes
  - Stage name: prod

- create route `/{proxy+}`
- create integration
  - HTTP URI
  - URL: http://<ip>:8080/{proxy}

- test with curl
  `curl -i https://5e9hz9mqri.execute-api.us-east-1.amazonaws.com/prod/health`

- create ami for terraform `my-app-v1`

DELETE:
- EC2 - my-app-example-1
- SG - my-app-example-1
- API GW - api-gw-example-1

## Direct Public Integration - Example 1 - Terraform

- create `6-sg-example-1.tf`
- create `7-ec2-example-1.tf`
- create `8-api-gw-example-1.tf`
terraform apply
- run
`curl -i https://933acqsps8.execute-api.us-east-1.amazonaws.com/prod/health`
open ec2
open api gateway

## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Console

- create sg (my-app-example-2) Allow API Access
  - allow 8080 from VPC CIDR (Allow Health Checks)
- create ec2 instance in private subnet using ami (my-app-example-2)
- create target group (8080) + instance id
  - my-app-example-2
  - Protocol: TCP
  - PORT: 8080
  - Health Checks: HTTP, /health
- create nlb (8080)
  - my-app-example-2
  - internal
  - Listnere: 8080
- wait till nlb is provisioned
- create api gateway
  - HTTP API
  - API name: api-gw-example-2
  - Skip routes
  - Stage name: staging
- create vpc link
  - my-app-example-2
  - 2 private subnets
  - SG - my-app-example-2


- create routes `/{proxy+}`
- create integration
  - Private resource
- create certificate for `api.antonputra.com`
- create custom domain "api.antonputra.com"
- create api mapping
- create ALIAS record for api.antonputra.com
- dig api.antonputra.com
curl -i https://api.antonputra.com/health


DELETE:
- Load balancer - my-app-example-2
- Target Group - my-app-example-2
- EC2 - my-app-example-2
- Custom domain - api.antonputra.com
- API GW - api-gw-example-2
- VPC link - my-app-example-2
- Certificate - api.antonputra.com
- ALIAS + cert records
- SG - my-app-example-2

## Private Integration Using VPC Link and Network Load Balancer - Example 2 - Terraform

- create `9-sg-example-2.tf`
- create `10-ec2-example-2.tf`
- create `11-nlb-example-2.tf`
- create `12-api-gw-example-2.tf`
- create `13-certificate-example-2.tf`
- create `14-custom-domain-name-example-2.tf`
terrafirm apply




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




DELETE AT THE END:
- AMI - my-app-v1
- Volumes
- key pairs