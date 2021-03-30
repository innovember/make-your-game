package scoreboard

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/innovember/make-your-game/api/middleware"
	"github.com/innovember/make-your-game/api/response"
)

type ScoreboardHandler struct {
}

func NewScoreboardHandler() *ScoreboardHandler {
	return &ScoreboardHandler{}
}

func (sh *ScoreboardHandler) Configure(mux *http.ServeMux, mw *middleware.MiddlewareManager) {
	mux.HandleFunc("/api/scoreboard/add", mw.SetHeaders(sh.AddNewScoreHandler))
	mux.HandleFunc("/api/scoreboard/get", mw.SetHeaders(sh.GetAllScoresHandler))
}

func (sh *ScoreboardHandler) GetAllScoresHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var (
			err    error
			scores []ScoreBoard
		)
		s.readContent()
		if err = json.Unmarshal(s.File, &scores); err != nil {
			response.Error(w, http.StatusInternalServerError, err)
			return
		}
		response.Success(w, "all scores", http.StatusOK, scores)
	} else {
		http.Error(w, "Only GET method allowed, return to main page", http.StatusMethodNotAllowed)
		return
	}
}

func (sh *ScoreboardHandler) AddNewScoreHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var (
			err       error
			content   []byte
			input     ScoreBoard
			newScores []byte
			scores    []ScoreBoard
		)
		if err = json.NewDecoder(r.Body).Decode(&input); err != nil {
			response.Error(w, http.StatusBadRequest, err)
			return
		}
		content, err = ioutil.ReadFile(s.Path)
		if err != nil {
			response.Error(w, http.StatusInternalServerError, err)
			return
		}
		if err = json.Unmarshal(content, &scores); err != nil {
			response.Error(w, http.StatusInternalServerError, err)
			return
		}
		scores = append(scores, input)
		if newScores, err = json.Marshal(scores); err != nil {
			response.Error(w, http.StatusInternalServerError, err)
			return
		}
		ioutil.WriteFile(s.Path, newScores, 0777)
		response.Success(w, "score added to list", http.StatusCreated, input)
	} else {
		http.Error(w, "Only POST method allowed, return to main page", http.StatusMethodNotAllowed)
		return
	}
}
