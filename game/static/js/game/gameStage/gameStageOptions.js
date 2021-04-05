import { IntervalTimer } from "../../utils/timers/intervalTimer.js"

export class GameStageOptions {
  constructor({
    rows,
    columns,
    enemies,
    bombCount,
    explosionSize,
    roundTime,
    score,
    powerUps,
    map,
  }) {
    this.rows = rows
    this.columns = columns
    this.enemies = enemies
    this.bombCount = bombCount
    this.explosionSize = explosionSize
    this.roundTime = roundTime
    this.passedTime = 0
    this.score = score
    this.initialScore = score
    this.powerUps = powerUps
    this.deathCount = 0

    this.initialize()
  }

  initialize = () => {
    this.initializeTimer()
    this.initializeScore()
  }

  initializeTimer = () => {
    const timerDiv = document.querySelector("#timer")
    timerDiv && timerDiv.remove()
    this.timerDiv = document.createElement("div")
    this.timerDiv.id = "timer"

    const img = document.createElement("img")
    img.src = "./assets/img/game-info/clock.png"
    img.alt = "clock"

    const span = document.createElement("span")
    span.innerText = `${this.roundTime}
    `
    this.timerDiv.append(img)
    this.timerDiv.append(span)

    document.querySelector("#game-info").append(this.timerDiv)
  }

  initializeScore = () => {
    const scoreDiv = document.querySelector("#score")
    scoreDiv && scoreDiv.remove()
    this.scoreDiv = document.createElement("div")
    this.scoreDiv.id = "score"

    const img = document.createElement("img")
    img.src = "./assets/img/game-info/star.png"
    img.alt = "star"

    const span = document.createElement("span")
    span.innerText = `${this.score}`

    this.scoreDiv.append(img)
    this.scoreDiv.append(span)

    document.querySelector("#game-info").append(this.scoreDiv)
  }

  initializeTimerChange = () => {
    this.resetRoundTime()
    this.interval && this.interval.clear()
    this.interval = new IntervalTimer(() => {
      this.roundTime--
      this.passedTime++
      if (this.roundTime <= 0) {
        this.interval.clear()
      }
    })
  }

  resetRoundTime = () => {
    this.roundTime += this.passedTime
    this.passedTime = 0
  }

  reset = (settings) => {
    this.score = 0
    this.bombCount = settings.bombCount
    this.explosionSize = settings.explosionSize
  }

  draw = () => {
    this.drawTimer()
    this.drawScore()
  }

  drawTimer = () => {
    this.timerDiv.querySelector("span").innerText = `${this.roundTime}`
  }

  drawScore = () => {
    this.scoreDiv.querySelector("span").innerText = `${this.score}`
  }
}
