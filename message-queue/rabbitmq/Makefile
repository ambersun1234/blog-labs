message-queue:
	docker run -d \
		-p 5672:5672 \
		-p 15672:15672 \
		-e RABBITMQ_DEFAULT_USER=rabbitmq \
		-e RABBITMQ_DEFAULT_PASS=rabbitmq \
		-v ./load_definitions.json:/etc/rabbitmq/load_definitions.json \
		-v ./rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
		--name rabbitmq \
		rabbitmq:3.13-rc-management

message-queue-delete:
	docker stop rabbitmq
	docker rm rabbitmq