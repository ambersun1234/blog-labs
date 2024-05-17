package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"time"
)

var (
	tcpPort = 6666
)

func tcpHandle(conn net.Conn) {
	defer conn.Close()

	scann := bufio.NewScanner(conn)
	for scann.Scan() {
		input := scann.Text()

		logger.Println("Receive: ", input)
		if _, err := conn.Write([]byte(fmt.Sprintf("%s\n", input))); err != nil {
			logger.Fatalln(err)
		}
	}
}

func tcpServer() {
	li, err := net.Listen("tcp", fmt.Sprintf(":%d", tcpPort))
	if err != nil {
		logger.Fatalln(err)
	}
	defer li.Close()
	logger.Printf("Listening on: localhost:%v\n", tcpPort)

	for {
		conn, err := li.Accept()
		if err != nil {
			logger.Fatalln(err)
		}
		if err := conn.SetDeadline(time.Time{}); err != nil {
			logger.Fatalln(err)
		}

		go tcpHandle(conn)
	}
}

func tcpClient() {
	host := os.Getenv("HOST")
	conn, err := net.Dial("tcp", fmt.Sprintf("%v:%d", host, tcpPort))
	if err != nil {
		logger.Fatalln(err)
	}

	ticker := time.NewTicker(2 * time.Second)
	for {
		<-ticker.C

		// send data
		msg := "Hello World!"
		logger.Println("Send: ", msg)
		if _, err := conn.Write([]byte(fmt.Sprintf("%s\n", msg))); err != nil {
			logger.Fatalln(err)
		}

		// receive data
		data, err := bufio.NewReader(conn).ReadString('\n')
		if err != nil {
			logger.Fatalln(err)
		}
		logger.Printf("Server ACK with: '%v'\n", string(data))
	}
}
