import {
  ENEMY_DYING_TIME,
  ENEMY_ID,
  increaseEnemyID,
} from "../../../utils/constants.js"
import { getRandomDirection } from "../../../utils/helpers.js"
import { Timer } from "../../../utils/timers/timer.js"
import { Entity } from "../entity.js"

export class Enemy extends Entity {
  constructor({ board, left, top, xp }) {
    super({ board, left, top })
    this.id = ENEMY_ID
    increaseEnemyID()
    this.xp = xp
    this.direction = getRandomDirection()
    this.dead = false
    this.createHTML()
  }

  createHTML = (src) => {
    this.div.className = "enemy"
    this.img.src = src
  }

  moveLeft(speed) {
    super.moveLeft(speed)
    this.img.className = "enemy-walk-left"
    this.direction = "left"
  }

  moveRight(speed) {
    super.moveRight(speed)
    this.img.className = "enemy-walk-right"
    this.direction = "right"
  }

  moveUp(speed) {
    super.moveUp(speed)
    this.img.className = "enemy-walk-up"
    this.direction = "up"
  }

  moveDown(speed) {
    super.moveDown(speed)
    this.img.className = "enemy-walk-down"
    this.direction = "down"
  }

  die() {
    this.img.className = "enemy-die"
    this.dead = true
    this.timer = new Timer(() => {
      this.img.className = "enemy-dead"
      this.div.remove()
    }, ENEMY_DYING_TIME)
  }
}
