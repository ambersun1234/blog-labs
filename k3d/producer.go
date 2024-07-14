package main

import (
	"context"
	"fmt"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/spf13/viper"
)

func publishToMessageQueue(ch *amqp.Channel, chName string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	counter := 1
	for {
		body := fmt.Sprintf("Hello World %v!", counter)
		err := ch.PublishWithContext(ctx, "", chName, false, false, amqp.Publishing{ContentType: "text/plain", Body: []byte(body)})
		if err != nil {
			log.Panic("Failed to publish message")
		}

		log.Printf("Published message: %s", body)

		time.Sleep(1 * time.Second)
		counter += 1
	}
}

func main() {
	viper.AutomaticEnv()

	conn, err := amqp.Dial(viper.GetString("MQ_URL"))
	if err != nil {
		log.Panic("Failed to connect to RabbitMQ")
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Panic("Failed to open a channel")
	}
	defer ch.Close()

	chName := viper.GetString("MQ_CH")
	_, err = ch.QueueDeclare(chName, false, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to declare queue")
	}

	go publishToMessageQueue(ch, chName)

	select {}
}
