package main

import (
	"log"
	"net/http"

	"github.com/innovember/make-your-game/api/middleware"
	s "github.com/innovember/make-your-game/api/scoreboard"
)

func main() {
	s.SetupScoreBoard()
	mux := http.NewServeMux()
	mw := middleware.NewMiddlewareManager()
	scoreboardHandler := s.NewScoreboardHandler()
	scoreboardHandler.Configure(mux, mw)
	log.Println("Server is listening... http://localhost:8082/")
	if err := http.ListenAndServe(":8082", mux); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
