export class Screen {
  constructor(id, display = "flex") {
    this.id = id
    this.display = display

    this.hide()
  }

  hide = () => {
    this.div.display = "none"
  }
  show = () => {
    this.div.display = this.display
  }
}
