import Texture from "./renderers/raycast/Texture"
const TILE_SIZE = 32
export default class Map {
  constructor(level) {
    const structures = level.getStructures()
    const textureMap = level.getTextureMap()
    this.__entities = level.getEntities()
    this.__textures = { ...textureMap.textures }
    this.__wallMap = textureMap.walls.map((row) => row.split("").map((column) => parseInt(column)))
    console.log(this.__wallMap)
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
