NAME := myk3d

PRODUCER_IMAGE := test-producer:latest
CONSUMER_IMAGE := test-consumer:latest

image-build:
	@docker build -t $(PRODUCER_IMAGE) -f ./producer.dockerfile .
	@docker build -t $(CONSUMER_IMAGE) -f ./consumer.dockerfile .

k3d-create:
	@k3d cluster create $(NAME) -s 1
	@k3d image import -c $(NAME) $(PRODUCER_IMAGE)
	@k3d image import -c $(NAME) $(CONSUMER_IMAGE)

k3d-apply:
	@kubectl apply -f manifest/configmaps
	@kubectl apply -f manifest/secrets
	@kubectl apply -f manifest/deployments
	@kubectl apply -f manifest/services

k3d-delete:
	@k3d cluster delete $(NAME)

.PHONY: k3d-create k3d-apply k3d-delete
