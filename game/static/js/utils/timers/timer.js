export class Timer {
    constructor(callback, delay) {
        this.callback = callback
        this.remaining = delay
        this.resume()
    }
    resume() {
        this.start = new Date().getTime()
        this.clear()
        this.timerID = setTimeout(this.callback, this.remaining)
    }
    clear() {
        clearTimeout(this.timerID)
    }
    pause() {
        clearTimeout(this.timerID)
        this.remaining -= new Date().getTime() - this.start
    }
}