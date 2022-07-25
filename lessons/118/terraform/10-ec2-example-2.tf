resource "aws_instance" "my-app-example-2" {
  ami           = "ami-054cdcd3fcc27e776"
  instance_type = "t2.micro"
  key_name      = "devops"
  subnet_id     = aws_subnet.private-us-east-1a.id

  vpc_security_group_ids = [aws_security_group.my-app-example-2.id]

  tags = {
    Name = "my-app-example-2"
  }
}
