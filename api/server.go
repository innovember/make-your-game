package main

import (
	"log"
	"net/http"
	//handlers "github.com/innovember/make-your-game/api/scoreboard"
)

func main() {
	mux := http.NewServeMux()
	log.Println("Server is listening... http://localhost:8082/")
	if err := http.ListenAndServe(":8082", mux); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
