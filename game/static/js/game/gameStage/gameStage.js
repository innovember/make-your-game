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

  // Tiles
  createDefaultTiles = () => {
    this.createDefaultRocks();
    this.createDefaultWalls();
  };

  createCustomTiles = () => {
    this.createBorderRocks();
    for (let i = 0; i < this.options.map.length; i++)
      for (let j = 0; j < this.options.map[i].length; j++) {
        switch (this.options.map[i][j]) {
          case TILES.ROCK:
            const rock = new Rock({ board: this.board, x: j + 2, y: i + 2 });
            this.rocks.set(rock.id, rock);
            break;
          case TILES.WALL:
            const wall = new Wall({ board: this.board, x: j + 2, y: i + 2 });
            this.walls.set(wall.id, wall);
            break;
        }
      }
  };

  // Blocks
  createDefaultRocks = () => {
    this.createBorderRocks();
    for (let i = 3; i < this.options.columns; i += 2)
      for (let j = 3; j < this.options.rows; j += 2) {
        const rock = new Rock({ board: this.board, x: i, y: j });
        this.rocks.set(rock.id, rock);
      }
  };

  createDefaultWalls = () => {
    const count = Math.round((this.options.rows * this.options.columns) / 8);
    const wallCount = getRandomInt(count * 0.9, count * 1.1);
    let sum = 0;
    while (sum < wallCount) {
      const x = getRandomInt(2, this.options.columns),
        y = getRandomInt(2, this.options.rows);
      if (!this.isBlock(x, y) && !(x <= 3 && y <= 3)) {
        const wall = new Wall({ board: this.board, x, y });
        this.walls.set(wall.id, wall);
        sum++;
      }
    }
  };

  createBorderRocks = () => {
    for (let i = 1; i <= this.options.columns; i++) {
      const rock1 = new Rock({ board: this.board, x: i, y: 1 }),
        rock2 = new Rock({ board: this.board, x: i, y: this.options.rows });
      this.rocks.set(rock1.id, rock1);
      this.rocks.set(rock2.id, rock2);
    }
    for (let i = 2; i < this.options.rows; i++) {
      const rock1 = new Rock({ board: this.board, x: 1, y: i }),
        rock2 = new Rock({
          board: this.board,
          x: this.options.columns,
          y: i,
        });
      this.rocks.set(rock1.id, rock1);
      this.rocks.set(rock2.id, rock2);
    }
  };
}
