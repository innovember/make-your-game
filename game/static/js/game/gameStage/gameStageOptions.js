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
  }
}
