export default class Component {
  constructor(controller, x, y, width, height, callback) {
    this._controller = controller
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._callback = callback
    this._states = {
      hover: false,
    }
    this.setupEvents()
  }
  setupEvents() {
    this._controller.on("click", (e) => {
      if (this._states.hover) {
        this._callback()
      }
    })
    this._controller.on("mousemove", (x, y) => {
      if (x > this._x && x < this._x + this._width && y > this._y && y < this._y + this._height) {
        if (!this._states.hover) {
          this._states.hover = true
          this.mouseEnter(x, y)
        }
      } else {
        if (this._states.hover) {
          this._states.hover = false
          this.mouseLeave(x, y)
        }
      }
    })
  }
  mouseEnter() {}
  mouseLeave() {}
  update(dt) {}
  draw(ctx) {}
}
