# resource "aws_apigatewayv2_api" "main" {
#   name          = "main"
#   protocol_type = "HTTP"
# }

# resource "aws_apigatewayv2_stage" "prod" {
#   name        = "prod"
#   api_id      = aws_apigatewayv2_api.main.id
#   auto_deploy = true
# }
