export default class Menu {
  constructor(canvas) {
    this.__canvas = canvas
    this.__mousePosition = [0, 0]
    this.__emitListeners = {
      mouseClick: [],
      keydown: [],
      keyup: [],
      mousemove: [],
    }
    this.__eventListeners = {
      mousemove: (e) => this.setMousePostion(e),
      click: (e) => this.mouseClick(e),
      keydown: (e) => this.keyDown(e),
      keyup: (e) => this.keyUp(e),
    }
    Object.keys(this.__eventListeners).forEach((event) => {
      this.__canvas.addEventListener(event, this.__eventListeners[event])
    })
  }
  deconstruct() {
    Object.keys(this.__eventListeners).forEach((event) => {
      this.__canvas.removeEventListener(event, this.__eventListeners[event])
    })
  }
  mouseClick(e) {
    this.__emitListeners.click.forEach((callback) => {
      callback(...this.__mousePosition)
    })
  }
  keydown(e) {
    this.__emitListeners.keydown.forEach((callback) => {
      callback(e)
    })
  }
  keyup(e) {
    this.__emitListeners.keyup.forEach((callback) => {
      callback(e)
    })
  }
  setMousePostion({ clientX, clientY }) {
    const { left, top } = this.__canvas.getBoundingClientRect()
    this.__mousePosition = [clientX - left, clientY - top]
    this.__emitListeners.mousemove.forEach((callback) => {
      callback(...this.__mousePosition)
    })
  }
  getMousePosition() {
    return this.__mousePosition
  }
  on(event, callback) {
    if (!this.__emitListeners[event]) {
      this.__emitListeners[event] = []
    }
    this.__emitListeners[event].push(callback)
  }
}
