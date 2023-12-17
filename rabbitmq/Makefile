message-queue:
	docker run -d \
		-p 5672:5672 \
		-p 15672:15672 \
		-e RABBITMQ_DEFAULT_USER=rabbitmq \
		-e RABBITMQ_DEFAULT_PASS=rabbitmq \
		--name rabbitmq \
		rabbitmq:3.13-rc-management

message-queue-delete:
	docker stop rabbitmq
	docker rm rabbitmq