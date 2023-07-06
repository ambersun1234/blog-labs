package main

import (
	"context"
	"fmt"
	"net"

	echopb "grpc/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type EchoServer struct {
	echopb.UnimplementedEchoServer
}

func (e *EchoServer) Echo(ctx context.Context, req *echopb.EchoRequest) (*echopb.EchoResponse, error) {
	return &echopb.EchoResponse{
		Output: req.Input,
	}, nil
}

func main() {
	address := ":6600"
	lis, err := net.Listen("tcp", address)
	if err != nil {
		panic("Failed to start gRPC server")
	}
	s := grpc.NewServer()
	reflection.Register(s)
	echopb.RegisterEchoServer(s, &EchoServer{})
	fmt.Println("gRPC server listen on", address)
	s.Serve(lis)
}
