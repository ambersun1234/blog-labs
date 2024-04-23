package types

type EchoArg struct {
	Msg string `json:"msg"`
}

type EchoReply struct {
	Msg any
}