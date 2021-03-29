import {
  ENEMY_DYING_TIME,
  ENEMY_ID,
  increaseEnemyID,
} from "../../../utils/constants.js"
import { getRandomDirection } from "../../../utils/helpers.js"
import { Timer } from "../../../utils/timers/timer.js"
import { Entity } from "../entity.js"
import { EnemyXP } from "./enemyXP.js"

export class Enemy extends Entity {
  constructor({ board, left, top, xp, type }) {
    super({ board, left, top })
    this.id = ENEMY_ID
    increaseEnemyID()
    this.xp = xp
    this.direction = getRandomDirection()
    this.dead = false
    this.type = type
    this.handleType()
  }

  handleType() {
    switch (this.type) {
      case "balloom":
        this.xp = 100
        this.speed = 0.5
        this.createHTML("./img/enemies/balloom.png")
        break
      case "oneal":
        this.xp = 200
        this.speed = 1
        this.createHTML("./img/enemies/oneal.png")
        break
      case "doll":
        this.xp = 400
        this.speed = 1.25
        this.createHTML("./img/enemies/doll.png")
        break
      case "minvo":
        this.xp = 800
        this.speed = 1.5
        this.createHTML("./img/enemies/minvo.png")
        break
      case "kondoria":
        this.xp = 1000
        this.speed = 0.25
        this.wallPass = true
        this.createHTML("./img/enemies/kondoria.png")
        break
      case "ovapi":
        this.xp = 2000
        this.speed = 0.5
        this.wallPass = true
        this.createHTML("./img/enemies/ovapi.png")
        break
      case "pass":
        this.xp = 4000
        this.speed = 1.5
        this.createHTML("./img/enemies/pass.png")
        break
      case "pontan":
        this.xp = 8000
        this.speed = 1.5
        this.wallPass = true
        this.createHTML("./img/enemies/pontan.png")
        break
    }
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
      new EnemyXP({
        board: this.board,
        left: this.left,
        top: this.top,
        amount: this.xp,
      })
    }, ENEMY_DYING_TIME)
  }
}
