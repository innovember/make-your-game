import { DEFAULT, TILE_SIZE, TILES } from "../../utils/constants.js";
import { createID, getRandomInt } from "../../utils/helpers.js";
import { ExitDoor } from "../blocks/exitDoor.js";
import { PowerUp } from "../blocks/powerUp.js";
import { Rock } from "../blocks/rock.js";
import { Wall } from "../blocks/wall.js";
import { Enemy } from "../entities/enemy/enemy.js";
import { GameStageOptions } from "./gameStageOptions.js";

export class GameStage {
  constructor({ data, bombCount, explosionSize }) {
    const roundTime = data.roundTime || 200,
      enemies = data.enemies || {},
      powerUps = data.powerUps || {},
      map = data.map;
    let rows = data.rows || DEFAULT.ROWS,
      columns = data.columns || DEFAULT.COLUMNS;
    this.board = document.querySelector("#board");
    this.bombCount = bombCount;
    if (map) {
      rows = map.length + 2;
      columns = map[0].length + 2;
    }

    this.options = new GameStageOptions({
      rows,
      columns,
      enemies,
      bombCount,
      powerUps,
      explosionSize,
      roundTime,
      score: 0,
      map,
    });

    this.rocks = new Map();
    this.walls = new Map();
    this.bombs = new Map();
    this.powerUps = new Map();
    this.consumedPowerUps = new Map();
    this.enemies = new Map();
    this.explosions = new Map();
  }

  initialize = () => {
    this.createStage();
    this.addStyles();
    this.changeStyles();
  };

  createStage = () => {
    if (!this.options.map) this.createDefaultTiles();
    else this.createCustomTiles();
    this.createExitDoor();
    this.createEnemies();
    this.createPowerUps();
  };

  addStyles = () => {
    const style = document.createElement("style");
    style.id = "board-style";
    document.querySelector("head").append(style);
  };

  changeStyles = () => {
    const style = document.querySelector("#board-style");
    style.innerHTML = `
			#board {
				grid-template-rows: repeat(${this.options.rows}, ${TILE_SIZE}px);
				grid-template-columns: repeat(${this.options.columns}, ${TILE_SIZE}px);
			}`;
    this.board.style.width = `${TILE_SIZE * this.options.columns}px`;
    this.board.style.height = `${TILE_SIZE * this.options.rows}px`;
  };
}
