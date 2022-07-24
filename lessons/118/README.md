AWS API Gateway - EC2 Integration (Console + Terraform | Backend | Endpoint | HTTP | Tutorial)

## intro
- proxy vs regular paths in api gateway
- if path, one path per ec2
- add http healthcheck endpoint

Autoscaling

https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-private-integration.html

node js app overview for autoscalling + health checks
https://expressjs.com/en/starter/hello-world.html

## Create AMI image
- use public subnet to create ami image

## ec2 integration with ec2 directtly (public integrations) (api gateway proxy * - all paths routed to ec2) (Console)
## ec2 integration with ec2 directtly private integration with NLB and directlly attach ec2 (console)
## ec2 integration with ec2 directtly (private integrations) (one path routed to 1 microservice /clients/<id>) (autoscalling group) (Console)
## ec2 integration with nlb and autoscalling group (Console)
- health check
- intencive endpoint

## ec2 integration with nlb (Terraform)
## ec2 integration with nlb and autoscalling group (Terraform)

## Outro -> watch aws api custom domain


Find Fibonacci Number Of A Given Index


## Create AMI image

- create vpc `terraform init && terraform apply`











ssh -i ~/.ssh/devops.pem ubuntu@23.22.184.71
sudo apt update
sudo apt install nodejs
node --version
sudo apt install npm

sudo mkdir /opt/my-app
sudo vim app.js
sudo vim package.json
sudo vim package-lock.json

sudo chown -R ubuntu:ubuntu /opt/my-app

npm ci

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


## ec2 integration with ec2 directtly private integration with NLB and directlly attach ec2 (console)
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



## ec2 integration with ec2 directtly (private integrations) (one path routed to 1 microservice /clients/<id>) (autoscalling group) (Console)

- create Launch Template
- create ag

curl -i https://api.devopsbyexample.io/hello

curl -X POST \
-H "Content-Type: application/json" \
-d '{"index":4}' \
https://api.devopsbyexample.io/fib