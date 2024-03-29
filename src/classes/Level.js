import Map from "./Map.js"
import Texture from "./graphics/Texture.js"
import ImageLoader from "./graphics/ImageLoader.js"
import AssetLoader from "./utils/AssetLoader.js"
const levelsJson = "./levels/levels.json"
export default class Level {
  constructor(level) {
    this.__name = level.name
    this.__path = `levels/${level.path}`
    this.createEmmitters()
  }

  createEmmitters() {
    this.__emmitters = {
      status_change: [],
      load_complete: [],
    }
  }

  on(event, callback) {
    if (this.__emmitters[event]) {
      this.__emmitters[event].push(callback)
    }
  }

  async load() {
    this.updateStatus("loading level structure")
    this.__structures = await Level.getLevelStructure(this.__path)
    this.updateStatus("loading texture map")
    this.__textureMap = await Level.getTextureMap(this.__path)
    this.updateStatus("loading Entities")
    this.__entities = await Level.getEntities(this.__path)
    this.updateStatus("loading textures")
    this.__textureMap.textures = await this.loadTextures()
    this.updateStatus("stitching floor textures")
    this.__textureMap.floor = await this.stitchFloorTextures()
    this.loadComplete()
  }
  async stitchFloorTextures() {
    this.__floorMap = this.__textureMap.floor.map((row) =>
      row.split("").map((column) => parseInt(column))
    )
    const floorCanvas = document.createElement("canvas")
    floorCanvas.width = Map.TILE_SIZE * this.__structures["floor"][0].length
    floorCanvas.height = Map.TILE_SIZE * this.__structures["floor"].length
    const floorContext = floorCanvas.getContext("2d")

    this.__floorMap.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        if (tile == 0) return
        const texture = this.__textureMap.textures.floor[tile]
        texture.drawImage(
          floorContext,
          columnIndex * Map.TILE_SIZE,
          rowIndex * Map.TILE_SIZE,
          Map.TILE_SIZE,
          Map.TILE_SIZE
        )
      })
    })
    return new Texture(floorCanvas)
  }
  async loadTextures() {
    const textures = this.__textureMap.textures
    return new Promise((resolve) => {
      const loadedTextures = { ...textures }
      Object.keys(textures).map(async (textureType) => {
        await Promise.all(
          Object.keys(textures[textureType]).map(async (textureKey) => {
            const imagename = textures[textureType][textureKey]
            this.updateStatus(`loading texture ${this.__path}/${textureType}/${imagename}`)
            const imagePath = `${this.__path}/textures/${textureType}/${imagename}`
            const image = await ImageLoader.loadImage(imagePath)
            const texture = new Texture(image)
            loadedTextures[textureType][textureKey] = texture
            return texture
          })
        )
        setTimeout(() => {
          resolve(loadedTextures)
        }, 500)
      })
    })
  }

  getStructures() {
    return this.__structures
  }
  getEntities() {
    return this.__entities
  }
  getTextureMap() {
    return this.__textureMap
  }
  loadComplete() {
    this.__emmitters.load_complete.forEach((callback) => {
      callback()
    })
  }
  updateStatus(status) {
    this.__status = status
    this.__emmitters.status_change.forEach((callback) => {
      callback(status)
    })
  }

  static async getLevelStructure(path) {
    return await AssetLoader.loadJson(`${path}/maps/structure.json`)
  }
  static async getTextureMap(path) {
    return await AssetLoader.loadJson(`${path}/maps/textures.json`)
  }
  static async getEntities(path) {
    return await AssetLoader.loadJson(`${path}/maps/entities.json`)
  }
  static async getLevels() {
    return await AssetLoader.loadJson(levelsJson)
  }
}
