import { DURATIONS } from "../../../utils/constants.js"
import { createID } from "../../../utils/helpers.js"
import { Timer } from "../../../utils/timers/timer.js"

export class Explosion {
  constructor({ board, x, y, size, stage }) {
    this.board = board
    this.x = x
    this.y = y
    this.id = createId(x, y)
    this.size = size
    this.stage = stage
    this.divs = new Map()

    this.createHTML()
  }
}
