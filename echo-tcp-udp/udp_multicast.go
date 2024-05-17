package main

import (
	"bufio"
	"fmt"
	"net"
	"time"
)

var (
	udpMulticastPort = 5555
	udpMulticastHost = "224.0.0.0"
)

func udpMulticastHandle(conn *net.UDPConn) {
	address, err := net.ResolveUDPAddr("udp", fmt.Sprintf("%v:%v", udpMulticastHost, udpMulticastPort))
	if err != nil {
		logger.Fatalln(err)
	}
	buf := make([]byte, 1024)

	for {
		n, _, err := conn.ReadFromUDP(buf)
		if err != nil {
			logger.Fatalln(err)
		}

		data := string(buf[:n])
		logger.Println("Receive: ", data)
		if _, err := conn.WriteTo([]byte(fmt.Sprintf("%v\n", data)), address); err != nil {
			logger.Fatalln(err)
		}
	}
}

func udpMulticastServer() {
	address, err := net.ResolveUDPAddr("udp", fmt.Sprintf("%v:%v", udpMulticastHost, udpMulticastPort))
	if err != nil {
		logger.Fatalln(err)
	}
	li, err := net.ListenMulticastUDP("udp", nil, address)
	if err != nil {
		logger.Fatalln(err)
	}
	logger.Printf("Listening on: localhost:%v\n", udpMulticastPort)

	udpMulticastHandle(li)
}

func udpMulticastClient() {
	address, err := net.ResolveUDPAddr("udp", fmt.Sprintf("%v:%v", udpMulticastHost, udpMulticastPort))
	if err != nil {
		logger.Fatalln(err)
	}

	conn, err := net.ListenMulticastUDP("udp", nil, address)
	if err != nil {
		logger.Fatalln(err)
	}

	ticker := time.NewTicker(2 * time.Second)
	for {
		<-ticker.C

		// send data
		msg := "Hello World!"
		logger.Println("Send: ", msg)
		if _, err := conn.WriteTo([]byte(msg), address); err != nil {
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
