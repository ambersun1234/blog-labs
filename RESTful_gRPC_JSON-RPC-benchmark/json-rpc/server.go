package main

import (
	"net/http"

	"json-rpc/types"

	"github.com/gorilla/rpc"
	"github.com/gorilla/rpc/json"
)

type Server struct{}

func (s *Server) Echo(r *http.Request, arg *types.EchoArg, reply *types.EchoReply) error {
	reply.Msg = arg.Msg
	return nil
}

func main() {
	r := rpc.NewServer()
	s := &Server{}

	r.RegisterCodec(json.NewCodec(), "application/json")
	if err := r.RegisterService(s, ""); err != nil {
		panic(err)
	}

	http.Handle("/rpc", r)
	if err := http.ListenAndServe(":6666", nil); err != nil {
		panic(err)
	}
}
