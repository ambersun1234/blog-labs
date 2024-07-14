package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/spf13/viper"
)

func consumeFromMessageQueue(ch *amqp.Channel, chName string) {
	queue, err := ch.Consume(chName, "", true, false, false, false, nil)
	if err != nil {
		log.Panic("Failed to consume from queue")
	}

	for msg := range queue {
		log.Printf("Received message: %s", msg.Body)
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

	go consumeFromMessageQueue(ch, chName)

	select {}
}
