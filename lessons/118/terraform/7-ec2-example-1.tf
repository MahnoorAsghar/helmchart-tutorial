resource "aws_instance" "my-app-example-1" {
  ami           = "ami-054cdcd3fcc27e776"
  instance_type = "t2.micro"
  key_name      = "devops"
  subnet_id     = aws_subnet.public-us-east-1a.id

  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.my-app-example-1.id]

  tags = {
    Name = "my-app-example-1"
  }
}
