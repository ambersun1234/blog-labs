package main

import (
	"context"
	"fmt"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func publishToMessageQueue(ch *amqp.Channel) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	counter := 1
	for i := 0; i < 1000; i++ {
		body := fmt.Sprintf("Hello World (iter %v) %v!", counter, i)
		if err := ch.PublishWithContext(context.Background(), "", "test", false, false, amqp.Publishing{ContentType: "text/plain", Body: []byte(body)}); err != nil {
			log.Panic("Failed to publish message", err)
		}
	}
}

func consumeSingleFromMessageQueue(ch *amqp.Channel) {
	queue, err := ch.Consume("test", "", false, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to consume from queue", err)
	}

	for msg := range queue {
		log.Printf("Received message: %s", msg.Body)
		msg.Ack(false)
		break
	}
}

func consumeFromMessageQueue(ch *amqp.Channel) {
	queue, err := ch.Consume("test", "", false, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to consume from queue", err)
	}

	for msg := range queue {
		log.Printf("Received message: %s", msg.Body)
		msg.Ack(false)
	}
}

func main() {
	conn, err := amqp.Dial("amqp://rabbitmq:rabbitmq@localhost:5672/")
	if err != nil {
		log.Panic("Failed to connect to RabbitMQ", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Panic("Failed to open a channel", err)
	}
	defer ch.Close()
	if err := ch.Qos(100, 0, false); err != nil {
		log.Panic("Failed to set QoS", err)
	}

	_, err = ch.QueueDeclare("test", false, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to declare queue", err)
	}

	go publishToMessageQueue(ch)
	time.Sleep(10 * time.Second)
	go consumeSingleFromMessageQueue(ch)
	// go consumeFromMessageQueue(ch)

	select {}
}
