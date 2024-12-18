deploy:
	@docker-compose up -d

undeploy:
	@docker-compose down

server:
	@go run server.go

proxy-server:
	@go run gateway.go

data:
	@curl -X POST localhost:8888

.PHONY: deploy undeploy server data
