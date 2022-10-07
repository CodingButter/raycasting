import Emitter from "./utils/Emitter"

var stopped = true
const emitter = new Emitter()
export default class GameLoop {
  static start() {
    stopped = false
    var lastUpdate = Date.now()
    function update() {
      const now = Date.now()
      const dt = (now - lastUpdate) / 1000
      lastUpdate = now
      emitter.emit("update", dt)
      !stopped && setTimeout(() => update(dt), 0)
    }
    function draw() {
      emitter.emit("draw")
      !stopped && requestAnimationFrame(draw)
    }
    update(Date.now())
    requestAnimationFrame(draw)
  }
  static pause() {
    stopped = true
  }
  static on(name, listener) {
    return emitter.on(name, listener)
  }

  static remove(name, listenerToRemove) {
    emitter.remove(name, listenerToRemove)
  }
}
