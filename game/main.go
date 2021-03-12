package main

import (
	"log"
	"net/http"
)

func main() {
	log.Println("Server is running ...")
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)
	log.Println("Listening on http://localhost:8081/")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal(err)
	}
}
