import Map from "./Map.js"
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
    this.__structure = await Level.getLevelStructure(this.__path)
    this.updateStatus("loading texture map")
    this.__textureMap = await Level.getTextureMap(this.__path)
    this.updateStatus("loading textures")
    this.__textureMap.textures = await this.loadTextures()
    this.loadComplete()
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
            const texture = await ImageLoader.loadImage(
              `${this.__path}/textures/${textureType}/${imagename}`
            )
            loadedTextures[textureType][textureKey] = texture
            return texture
          })
        )
        resolve(loadedTextures)
      })
    })
  }

  getStructure() {
    return this.__structure
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

  static async getLevels() {
    return await AssetLoader.loadJson(levelsJson)
  }
}
