package scoreboard

type ScoreBoard struct {
	Nickname string `json:"nickname"`
	Score    int64  `json:"score"`
	Time     int64  `json:"time"`
	Stage    int64  `json:"stage"`
	Lives    int64  `json:"lives"`
}

type ScoreBoardFile struct {
	Path   string
	File   []byte
	Length int
}
