package scoreboard

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"

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
			input     ScoreBoard
			newScores []byte
			scores    []ScoreBoard
		)
		if err = json.NewDecoder(r.Body).Decode(&input); err != nil {
			response.Error(w, http.StatusBadRequest, err)
			return
		}
		if err = isValid(input); err != nil {
			response.Error(w, http.StatusBadRequest, err)
			return
		}
		s.readContent()
		if err = json.Unmarshal(s.File, &scores); err != nil {
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

func isValid(input ScoreBoard) (err error) {
	trimmedName := strings.Trim(input.Nickname, " ")
	if len(trimmedName) < 3 {
		return errors.New("nickname too short")
	} else if len(trimmedName) > 10 {
		return errors.New("nickname too long")
	}
	if input.Stage < 1 || input.Stage > 3 {
		return errors.New("incorrect stage value")
	}
	if input.Lives < 0 || input.Lives > 3 {
		return errors.New("incorrect lives value")
	}
	if input.Score < 0 || input.Score > 50000 {
		return errors.New("incorrect score value")
	}
	if input.Time < 0 || input.Time > 300 {
		return errors.New("incorrect time value")
	}
	return nil
}
