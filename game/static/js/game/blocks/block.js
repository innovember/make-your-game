export class Block {
  constructor({ board, x, y }) {
    this.board = board
    this.x = x
    this.y = y
  }
  initialize = () => {
    this.createHTML()
  }
  createElement() {
    this.div = document.createElement("div")
    this.div.style.gridColumnStart = String(this.x)
    this.div.style.gridRowStart = String(this.y)
    this.board.append(this.div)
  }
}
