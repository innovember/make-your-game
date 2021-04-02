package scoreboard

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strconv"

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
	mux.HandleFunc("/api/scoreboard/get/page/", mw.SetHeaders(sh.GetScoresByPageHandler))
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
		sortedScoresByTime := sortByTime(scores)
		sortedScores := sortByScore(sortedScoresByTime)
		response.Success(w, "all scores", http.StatusOK, sortedScores)
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
		if isUniqueValues(input, scores) {
			scores = append(scores, input)
		} else {
			response.Error(w, http.StatusBadRequest, errors.New("values already exist in scoreboard"))
			return
		}
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

func (sh *ScoreboardHandler) GetScoresByPageHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		var (
			err           error
			scores        []ScoreBoard
			pageNum       int
			scoresPerPage = 10
			scoresByPage  []ScoreBoard
		)
		_id := r.URL.Path[len("/api/scoreboard/get/page/"):]
		if pageNum, err = strconv.Atoi(_id); err != nil {
			response.Error(w, http.StatusBadRequest, errors.New("page number not valid"))
			return
		}
		if pageNum < 1 {
			response.Error(w, http.StatusBadRequest, errors.New("page number should be higher than 0"))
			return
		}
		s.readContent()
		if err = json.Unmarshal(s.File, &scores); err != nil {
			response.Error(w, http.StatusInternalServerError, err)
			return
		}
		sortedScoresByTime := sortByTime(scores)
		sortedScores := sortByScore(sortedScoresByTime)
		if scoresByPage = getScoresByPage(sortedScores, pageNum, scoresPerPage); scoresByPage == nil {
			response.Error(w, http.StatusInternalServerError, errors.New("there is no data for this page"))
			return
		}
		response.Success(w, "scores by page", http.StatusOK, scoresByPage)
	} else {
		http.Error(w, "Only GET method allowed, return to main page", http.StatusMethodNotAllowed)
		return
	}
}
