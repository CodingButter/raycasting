import Texture from "./graphics/Texture"
import Sprite from "./graphics/Sprite"
import { Player } from "./entities/Player"
import { Enemy } from "./entities/Enemies/Enemy"
const TILE_SIZE = 32
export default class Map {
  constructor(handler) {
    this.__handler = handler
    const level = this.__handler.getLevel()
    const structures = level.getStructures()
    const textureMap = level.getTextureMap()
    this.__textures = textureMap.textures
    const player = level.getEntities().player
    this.__player = new Player(
      this.__handler,
      player.position.x * Map.TILE_SIZE,
      player.position.y * Map.TILE_SIZE,
      Map.TILE_SIZE,
      Map.TILE_SIZE,
      new Sprite(this.__textures.entities.player)
    )
    const enemies = level.getEntities().enemies.map((enemy) => {
      return new Enemy(
        this.__handler,
        enemy.position.x * Map.TILE_SIZE,
        enemy.position.y * Map.TILE_SIZE,
        Map.TILE_SIZE,
        Map.TILE_SIZE,
        new Sprite(this.__textures.entities[enemy.type])
      )
    })
    this.__entities = { enemies }
    this.__wallMap = textureMap.walls.map((row) => row.split("").map((column) => parseInt(column)))
    this.__floorMap = textureMap.floor
    this.__structures = { ...structures }
    Object.keys(structures).forEach((grid) => {
      this.__structures[grid] = structures[grid].map((row) =>
        row.split("").map((tile) => parseInt(tile))
      )
    })
  }
  get columns() {
    return this.__structures.walls[0].length
  }
  get rows() {
    return this.__structures.walls.length
  }
  getEntities() {
    return this.__entities
  }
  getPlayer() {
    return this.__player
  }
  getWallTextureAt(x, y) {
    const column = Math.floor(x / Map.TILE_SIZE)
    const row = Math.floor(y / Map.TILE_SIZE)
    return this.__textures.walls[this.__wallMap[row][column] || 1]
  }
  getWidth() {
    return this.columns * Map.TILE_SIZE
  }
  getHeight() {
    return this.rows * Map.TILE_SIZE
  }

  get grid() {
    return this.__structures.walls
  }

  get textures() {
    return this.__textures
  }
  get floorMap() {
    return this.__floorMap
  }

  hasWallAt(x, y) {
    const column = Math.floor(x / Map.TILE_SIZE)
    const row = Math.floor(y / Map.TILE_SIZE)
    if (this.__structures.walls[row][column] == 0) return false
    return true
  }
  static get TILE_SIZE() {
    return TILE_SIZE
  }
}
