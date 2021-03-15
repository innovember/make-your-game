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

class Entity {
    constructor(board, pixelSize, left, top, speed) {
		this.board = board
		this.pixelSize = pixelSize
		this.speed = speed || pixelSize / 3
		this.left = left || pixelSize * 2
		this.top = top || pixelSize * 2
		this.size = 16 * pixelSize * 0.75

		this.createHTML()
        this.draw()
    }

    createHTML = () => {
        this.div = document.createElement('div')
		this.div.style.position = 'absolute'
		this.img = document.createElement('img')
		this.div.append(this.img)
		this.board.append(this.div)
		this.div.style.height = `${this.size}px`
		this.div.style.width = `${this.size}px`
    }
    
    draw() {
		this.div.style.position = 'absolute'
		this.div.style.left = `${16 * this.pixelSize + this.left}px`
		this.div.style.top = `${16 * this.pixelSize + this.top}px`
	}

    moveLeft() {
		this.left -= this.speed
	}

	moveRight() {
		this.left += this.speed
	}

	moveUp() {
		this.top -= this.speed
	}

	moveDown() {
		this.top += this.speed
	}
}

class Enemy extends Entity {
	constructor({board, pixelSize, left, top, xp}) {
		super({board, pixelSize, left, top})
		this.speed /= 2
        this.direction = getRandomDirection()
        
		this.createHTML()
	}

	createHTML = () => {
		this.div.className = 'enemy'
		this.img.src = './img/enemy.png'
	}

	moveLeft() {
		super.moveLeft()
		this.img.className = 'enemy-walk-left'
		this.direction = 'left'
	}

	moveRight() {
		super.moveRight()
		this.img.className = 'enemy-walk-right'
		this.direction = 'right'
	}

	moveUp() {
		super.moveUp()
		this.img.className = 'enemy-walk-up'
		this.direction = 'up'
	}

	moveDown() {
		super.moveDown()
		this.img.className = 'enemy-walk-down'
		this.direction = 'down'
	}
}

class Bomberman extends Entity {
	constructor({board, pixelSize, liveCount}) {
		super({board, pixelSize})
		this.direction = 'down'
		this.liveCount = liveCount
	}

	initialize = () => {
		this.createHTML()
	}

	createHTML = () => {
		this.div.id = 'bomberman'
		this.img.src = './img/bomberman.png'
		this.liveCountDiv = document.createElement('div')
		this.liveCountDiv.id = 'live-count'
		this.board.append(this.liveCountDiv)
	}

	moveLeft() {
		super.moveLeft()
		this.img.className = 'bomberman-walk-left'
		this.direction = 'left'
	}

	moveRight() {
		super.moveRight()
		this.img.className = 'bomberman-walk-right'
		this.direction = 'right'
	}

	moveUp() {
		super.moveUp()
		this.img.className = 'bomberman-walk-up'
		this.direction = 'up'
	}

	moveDown() {
		super.moveDown()
		this.img.className = 'bomberman-walk-down'
		this.direction = 'down'
	}
}