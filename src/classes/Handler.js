export default class Handler {
  constructor(game) {
    this.__game = game
    this.__rays = []
  }

  getGame() {
    return this.__game
  }
  setLevel(level) {
    this.__level = level
  }
  getLevel() {
    return this.__level
  }
  setCamera(camera) {
    this.__camera = camera
  }
  getCamera() {
    return this.__camera
  }
  setRays(rays) {
    this.__rays = rays
  }
  getRays() {
    return this.__rays
  }
}
