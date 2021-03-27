import { Entity } from '../entity.js'
import {getRandomDirection} from '../../../utils/helpers.js'

export class Enemy extends Entity {
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