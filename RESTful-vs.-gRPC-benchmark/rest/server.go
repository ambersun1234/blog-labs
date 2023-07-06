package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type PostData struct {
	Input string `json:"input"`
}

func Echo(w http.ResponseWriter, req *http.Request) {
	data := new(PostData)
	if err := json.NewDecoder(req.Body).Decode(&data); err != nil {
		fmt.Println(err)
	}

	// echo response
	res := make(map[string]string)
	res["output"] = data.Input
	echoResponse, err := json.Marshal(res)
	if err != nil {
		panic("Error marshalling json")
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, string(echoResponse))
}

func main() {
	address := ":6000"
	http.HandleFunc("/", Echo)
	fmt.Println("http server listen on", address)
	http.ListenAndServe(address, nil)
}
