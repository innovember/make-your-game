import { Screen } from "./screen.js"
export class GameScreens {
  constructor() {
    this.stageStart = new Screen("stage-start")
    this.gameOver = new Screen("game-over")
    this.stage = new Screen("board", "grid")
    this.ending = new Screen("ending")
    this.info = new Screen("game-info")
    this.incorrectArguments = new Screen("incorrect-arguments")
    this.gameScore = new Screen("game-score")
    this.controls = new Screen("game-controls")
    this.help = new Screen("game-help")
    this.leaderboard = new Screen("game-leaderboard")
    this.prehistory = new Screen("bomberman-prehistory")
  }

  showStage = () => {
    this.stage.show()
    this.info.show()
  }

  hideStage = () => {
    this.stage.hide()
    this.info.hide()
  }

  hideMainMenuScreens = () => {
    this.controls.hide()
    this.help.hide()
    this.leaderboard.hide()
  }

  setGameScore = (score) => {
    this.gameScore.div.querySelector("span").innerText = String(score)
  }

  removeIncorrectArguments = () => {
    this.incorrectArguments.div.remove()
    this.incorrectArguments = null
  }
}
