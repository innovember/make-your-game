// Board
export const PIXEL_SIZE = 2,
  TILE_SIZE = PIXEL_SIZE * 16

// Bomberman
export const BOMBERMAN_DYING_TIME = 600

// Enemy
export const ENEMY_DYING_TIME = 1100,
  ENEMY_XP_SHOW_TIME = 2000

export let ENEMY_ID = 0

export function increaseEnemyID() {
  ENEMY_ID++
}
export function resetEnemyID() {
  ENEMY_ID = 0
}
