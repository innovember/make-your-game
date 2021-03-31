package scoreboard

import (
	"errors"
	"strings"
)

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

func isUniqueValues(input ScoreBoard, scores []ScoreBoard) bool {
	for _, elem := range scores {
		if (elem.Nickname == input.Nickname) && (elem.Score == input.Score) &&
			(elem.Lives == input.Lives) && (elem.Time == input.Time) &&
			(elem.Stage == input.Stage) {
			return false
		}
	}
	return true
}

func sortByScore(scores []ScoreBoard) []ScoreBoard {
	for {
		swapped := false
		for i := 1; i < len(scores); i++ {
			if scores[i].Score > scores[i-1].Score {
				swapped = true
				temp := scores[i-1]
				scores[i-1] = scores[i]
				scores[i] = temp
			}
		}
		if !swapped {
			break
		}
	}
	return scores
}

func getScoresByPage(scores []ScoreBoard, pageNum int, scoresPerPage int) []ScoreBoard {
	start := (pageNum - 1) * scoresPerPage
	stop := start + scoresPerPage
	if start > len(scores) {
		return nil
	}
	if stop > len(scores) {
		stop = len(scores)
	}
	return scores[start:stop]
}
