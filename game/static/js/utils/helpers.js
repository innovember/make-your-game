export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min)) * min
}

export const getRandomDirection = (directions = ['top', 'left', 'right', 'down']) => {
    return directions[getRandomInt(0, directions.length)]
}

export const createID = (x, y) => `${x}-${y}`

export const changeTitle = title => {
	document.title = title
}