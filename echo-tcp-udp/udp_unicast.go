package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"time"
)

var (
	udpUnicastPort = 7777
)

func udpUnicastHandle(conn *net.UDPConn) {
	buf := make([]byte, 1024)

	for {
		n, adr, err := conn.ReadFromUDP(buf)
		if err != nil {
			logger.Fatalln(err)
		}

		data := string(buf[:n])
		logger.Println("Receive: ", data)
		if _, err := conn.WriteToUDP([]byte(fmt.Sprintf("%v\n", data)), adr); err != nil {
			logger.Fatalln(err)
		}
	}
}

func udpUnicastServer() {
	address := net.UDPAddr{
		Port: udpUnicastPort,
		IP:   net.ParseIP("0.0.0.0"),
	}
	li, err := net.ListenUDP("udp", &address)
	if err != nil {
		logger.Fatalln(err)
	}
	logger.Printf("Listening on: localhost:%v\n", udpUnicastPort)

	udpUnicastHandle(li)
}

func udpUnicastClient() {
	host := os.Getenv("HOST")
	conn, err := net.Dial("udp", fmt.Sprintf("%v:%d", host, udpUnicastPort))
	if err != nil {
		logger.Fatalln(err)
	}

	ticker := time.NewTicker(2 * time.Second)
	for {
		<-ticker.C

		// send data
		msg := "Hello World!"
		logger.Println("Send: ", msg)
		if _, err := conn.Write([]byte(msg)); err != nil {
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
