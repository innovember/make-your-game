import { createID } from "../../utils/helpers.js"
import { Block } from "./block.js"

export class Wall extends Block {
  constructor({ board, x, y }) {
    super({ board, x, y })
    this.id = createID(x, y)
    this.addImage()
  }

  addClass = () => {
    this.div.classList.add("wall")
  }

  addImage = () => {
    this.addClass()

    this.img = document.createElement("img")
    this.img.src = "./assets/img/wall.png"
    this.img.alt = "wall"
    this.div.append(this.img)
  }

  explode() {
    this.img.classList.add("wall-explode")
  }
}
