export class KeyListener {
    constructor() {
        this.keyPressed = new Map()
        this.initialize()
    }

    initialize() {
        document.addEventListener('keypress', e => {
            this.keyPressed.set(e.code,true)
        })
        document.addEventListener('keydown', e => {
            this.keyPressed.set(e.code,false)
        })
    }

    isPressed = code => this.keyPressed.get(code)
}