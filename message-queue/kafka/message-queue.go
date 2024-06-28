package main

import (
	"fmt"
	"time"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

var (
	topic            = "test"
	connectionString = "localhost:9092"
)

func producer() {
	conn, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": connectionString,
	})
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	ticker := time.NewTicker(1 * time.Second)
	for v := range ticker.C {
		err := conn.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{
				Topic: &topic, Partition: kafka.PartitionAny,
			},
			Value: []byte(fmt.Sprintf("Hello Kafka %v", v)),
		}, nil)

		if err == nil {
			fmt.Println("Produce message to topic: ", topic)
		} else if err.(kafka.Error).IsTimeout() {
			fmt.Println("Timeout")
		} else {
			fmt.Println("Producer error: ", err)
		}
	}
}

func consumer() {
	conn, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": connectionString,
		"group.id":          "test_group",
		"auto.offset.reset": "earliest",
	})
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	if err := conn.SubscribeTopics([]string{topic}, nil); err != nil {
		panic(err)
	}

	for {
		msg, err := conn.ReadMessage(5 * time.Second)
		if err != nil {
			fmt.Println("Consumer error: ", err)
			continue
		}

		fmt.Printf("Consumer(%v) message from topic(%v): %v\n", conn.String(), msg.TopicPartition, string(msg.Value))
	}
}

func main() {
	go producer()
	go consumer()

	select {}
}
