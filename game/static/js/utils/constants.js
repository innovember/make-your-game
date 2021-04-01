// Board
export const PIXEL_SIZE = 2,
  TILE_SIZE = PIXEL_SIZE * 16

export const DEFAULT = {
  ROWS: 13,
  COLUMNS: 31,
  ROUND_TIME: 200,
}

export const DIRECTIONS = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
}

export const DURATIONS = {
  BOMBERMAN_DYING_TIME: 600,
  ENEMY_DYING_TIME: 1100,
  ENEMY_XP_SHOW_TIME: 2000,
}

// Enemy
export let ENEMY_ID = 0

export const ENEMY_TYPES = [
  "balloom",
  "oneal",
  "doll",
  "minvo",
  "kondoria",
  "ovapi",
  "pass",
  "pontan",
]

export const createEnemyID = () => {
  ENEMY_ID++
  return ENEMY_ID
}
export function resetEnemyID() {
  ENEMY_ID = 0
}

// Power ups
export const POWER_UPS = {
  SPEED_BOOST: 0.25,
  INVINCIBLE_DURATION: 30000,
}

export const POWER_UP_TYPES = [
  "bombs",
  "flames",
  "speed",
  "wall-pass",
  "detonator",
  "bomb-pass",
  "flame-pass",
  "mystery",
]
