message-queue:
	docker run --name kafka -d -p 9092:9092 apache/kafka:3.7.0

message-queue-ui:
	docker run -d -p 8080:8080 \
		--network host \
		--name kafka-ui \
		-e KAFKA_BROKERS=localhost:9092 \
		docker.redpanda.com/redpandadata/console:latest

message-queue-delete:
	docker stop kafka
	docker rm kafka
