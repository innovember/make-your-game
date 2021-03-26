package scoreboard

type ScoreBoard struct {
	Nickname string `json:"nickname"`
	Score    int64  `json:"score"`
	Time     int64  `json:"time"`
	Stage    int64  `json:"stage"`
}
