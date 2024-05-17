package main

import (
	"log"
	"os"
)

var (
	logger = log.Default()
)

func main() {
	switch os.Getenv("TYPE") {
	case "server":
		switch os.Getenv("PROTOCOL") {
		case "tcp":
			go tcpServer()

		case "udpu":
			go udpUnicastServer()

		case "udpm":
			go udpMulticastServer()
		}

	case "client":
		switch os.Getenv("PROTOCOL") {
		case "tcp":
			go tcpClient()

		case "udpu":
			go udpUnicastClient()

		case "udpm":
			go udpMulticastClient()
		}
	}

	select {}
}
