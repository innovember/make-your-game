import { DURATIONS } from "../../../utils/constants.js"
import { createID } from "../../../utils/helpers.js"
import { Timer } from "../../../utils/timers/timer.js"

export class Bomb {
  constructor({ board, x, y, explosionSize, stage }) {
    this.board = board
    this.x = x
    this.y = y
    this.id = createID(x, y)
    this.explosionSize = explosionSize
    this.stage = stage

    this.initialize()
  }

  initialize = () => {
    this.createHTML()
  }

  createHTML = () => {
    this.div = document.createElement("div")
    this.img = document.createElement("img")
    this.img.alt = "bomb"
    this.div.classList.add("bomb")
    this.div.style.gridColumnStart = String(this.x)
    this.div.style.gridRowStart = String(this.y)
    this.img.classList.add("bomb-exploding")
    this.img.src = "./assets/img/bomb.png"
    this.div.append(this.img)
    this.board.append(this.div)
  }
}
