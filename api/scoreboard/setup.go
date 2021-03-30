package scoreboard

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

var s *ScoreBoardFile

func SetupScoreBoard() {
	s = &ScoreBoardFile{Path: "./scoreboard/scoreboard.json"}
	s.isExist()
	s.readContent()
	if s.isEmpty() {
		s.updateContent()
	}
}

func (s *ScoreBoardFile) isExist() {
	if _, err := os.Stat(s.Path); os.IsNotExist(err) {
		if _, err = os.Create(s.Path); err != nil {
			log.Fatal("Server error, cant create file ", err)
		}
	}
}

func (s *ScoreBoardFile) readContent() {
	content, err := ioutil.ReadFile(s.Path)
	if err != nil {
		log.Fatal("cant read file ", err)
	}
	s.File = content
	s.Length = len(content)
}

func (s *ScoreBoardFile) isEmpty() bool {
	return s.Length == 0
}

func (s *ScoreBoardFile) updateContent() {
	var (
		scores    []ScoreBoard
		score     ScoreBoard
		err       error
		newScores []byte
	)
	score = ScoreBoard{Nickname: "bot", Score: 500, Time: 100, Stage: 1, Lives: 0}
	scores = append(scores, score)
	if newScores, err = json.Marshal(scores); err != nil {
		log.Fatal("json marshal error ", err)
		return
	}
	ioutil.WriteFile(s.Path, newScores, 0777)
}
