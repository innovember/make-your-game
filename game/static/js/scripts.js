const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min)) * min
}

const getRandomDirection = (directions = ['top', 'left', 'right', 'down']) => {
    return directions[getRandomInt(0, directions.length)]
}

class Timer {
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