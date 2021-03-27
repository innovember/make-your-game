export class IntervalTimer {
    constructor(callback) {
        this.callback = callback
        this.resume()
    }
    
    resume() {
        this.clear()
        this.timerID = setInterval(this.callback, 1000)
    }
    
    clear() {
        clearInterval(this.timerID)
    }
}