import { Block } from './block.js'
import { createID } from '../../utils/helpers.js'

export class PowerUp extends Block {
    constructor({board, x, y, type}) {
		super({board, x, y})
		this.id = createID(x, y)
		this.type = type

		this.addClass()
	}

	addClass = () => {
		this.div.classList.add('power-up', `power-up-${this.type}`)
	}
}