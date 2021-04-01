import { DIRECTIONS } from "./constants.js"

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min)) * min
}

export const getRandomDirection = (direction) => {
  const directions = Object.values(DIRECTIONS)
  if (direction) directions.splice(direction)
  return directions[getRandomInt(0, directions.length)]
}

export const createID = (x, y) => `${x}-${y}`

export const changeTitle = (title) => {
  document.title = title
}
