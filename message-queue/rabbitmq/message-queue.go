package main

import (
	"context"
	"fmt"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func publishToMessageQueue(ch *amqp.Channel) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	counter := 1
	for {
		body := fmt.Sprintf("Hello World %v!", counter)
		err := ch.PublishWithContext(ctx, "", "test", false, false, amqp.Publishing{ContentType: "text/plain", Body: []byte(body)})
		if err != nil {
			log.Panic("Failed to publish message")
		}
		time.Sleep(1 * time.Second)
		counter += 1
	}
}

func consumeFromMessageQueue(ch *amqp.Channel) {
	queue, err := ch.Consume("test", "", true, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to consume from queue")
	}

	for msg := range queue {
		log.Printf("Received message: %s", msg.Body)
	}
}

func main() {
	conn, err := amqp.Dial("amqp://rabbitmq:rabbitmq@localhost:5672/")
	if err != nil {
		log.Panic("Failed to connect to RabbitMQ")
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Panic("Failed to open a channel")
	}
	defer ch.Close()

	_, err = ch.QueueDeclare("test", false, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to declare queue")
	}

	go publishToMessageQueue(ch)
	go consumeFromMessageQueue(ch)

	select {}
}
