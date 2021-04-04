import { Bomb } from "./game/entities/bomberman/bomb.js"
import { Bomberman } from "./game/entities/bomberman/bomberman.js"
import { GameStage } from "./game/gameStage/gameStage.js"

import {
  DEFAULT,
  DIRECTIONS,
  DURATIONS,
  ENEMY_TYPES,
  GAME_MENU,
  MAIN_MENU,
  POWER_UP_TYPES,
  POWER_UPS,
  resetEnemyID,
  TILE_SIZE,
  TILES,
} from "./utils/constants.js"
import { changeTitle, createID, getRandomDirection } from "./utils/helpers.js"
import { KeyListener } from "./utils/keyListener.js"
import { Timer } from "./utils/timers/timer.js"

class Game {
  constructor() {}

  run() {}
}

const game = new Game()
game.run()
