import Texture from "./renderers/raycast/Texture"
const TILE_SIZE = 32
export default class Map {
  constructor(level) {
    const structure = level.getStructure()
    const textureMap = level.getTextureMap()
    this.__wallTextures = textureMap.textures.walls
    Object.keys(textureMap.textures.walls).forEach((asset) => {
      this.__wallTextures[asset] = new Texture(textureMap.textures.walls[parseInt(asset)])
    })
    this.__wallMap = textureMap.level.map((row) => row.split("").map((title) => parseInt(title)))
    console.log(this.__wallMap)
    this.__grid = structure.map((row) => row.split("").map((tile) => parseInt(tile)))
  }
  get columns() {
    return this.__grid[0].length
  }
  get rows() {
    return this.__grid.length
  }
  getWallTextureAt(column, row) {
    //console.log({ column, row })
    return this.__wallTextures[this.__wallMap[row][column] || 1]
  }
  getWidth() {
    return this.columns * Map.TILE_SIZE
  }
  getHeight() {
    return this.rows * Map.TILE_SIZE
  }

  get grid() {
    return this.__grid
  }

  hasWallAt(x, y) {
    const column = Math.floor(x / Map.TILE_SIZE)
    const row = Math.floor(y / Map.TILE_SIZE)
    if (this.__grid[row][column] == 0) return false
    return true
  }
  static get TILE_SIZE() {
    return TILE_SIZE
  }
}
