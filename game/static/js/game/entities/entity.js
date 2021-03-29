import { PIXEL_SIZE, TILE_SIZE } from "../../utils/constants.js"

export class Entity {
  constructor(board, left, top) {
    this.board = board
    this.pixelSize = pixelSize
    this.speed = 1
    this.left = left || PIXEL_SIZE * 2
    this.top = top || PIXEL_SIZE * 2
    this.size = TILE_SIZE * 0.75
    this.wallPass = false

    this.createHTML()
    this.draw()
  }

  createHTML = () => {
    this.div = document.createElement("div")
    this.div.style.position = "absolute"
    this.img = document.createElement("img")
    this.div.append(this.img)
    this.board.append(this.div)
    this.div.style.height = `${this.size}px`
    this.div.style.width = `${this.size}px`
  }

  draw() {
    this.div.style.transform = `translate3d(${
      TILE_SIZE + Math.floor(this.left)
    }px, ${TILE_SIZE + Math.floor(this.top)}px, 0)`
  }

  moveLeft(speed) {
    if (speed) this.left -= speed
    else this.left -= this.speed
  }

  moveRight(speed) {
    if (speed) this.left += speed
    else this.left += this.speed
  }

  moveUp(speed) {
    if (speed) this.top -= speed
    else this.top -= this.speed
  }

  moveDown(speed) {
    if (speed) this.top += speed
    else this.top += this.speed
  }
}
