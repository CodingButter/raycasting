import Component from "./GUI"
const defaultStyle = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  background: "#fff",
  padding: 0,
  border: {
    color: "#000",
    width: 1,
  },
  text: {
    font: "20px Arial",
    color: "#000",
    align: "center",
  },
  hover: {
    color: "#000",
    background: "#fff",
    border: {
      color: "#000",
      width: 1,
    },
    text: {
      font: "20px Arial",
      color: "#000",
      align: "center",
    },
  },
}
export default class Button extends Component {
  constructor(controller, style, text, callback) {
    style.hover = { ...defaultStyle.hover, ...style.hover }
    style.text = { ...defaultStyle.text, ...style.text }
    style.border = { ...defaultStyle.border, ...style.border }
    style = { ...defaultStyle, ...style }
    const { x, y, width, height } = style
    super(
      controller,
      x - style.padding,
      y - style.padding,
      width + style.padding * 2,
      height + style.padding * 2,
      callback
    )
    this._style = style
    this._hoverStyle = { ...defaultStyle, ...style, ...style.hover }
    this._drawStyle = this._style
    this._text = text
  }
  mouseEnter(mouseX, mouseY) {
    this._drawStyle = this._hoverStyle
  }
  mouseLeave() {
    this._drawStyle = this._style
  }
  draw(ctx) {
    const { background, padding, border, text } = this._drawStyle
    ctx.fillStyle = background
    ctx.fillRect(this._x, this._y, this._width, this._height)
    ctx.strokeStyle = border.color
    ctx.lineWidth = border.width
    ctx.strokeRect(this._x, this._y, this._width, this._height)
    ctx.fillStyle = text.color
    ctx.font = text.font
    ctx.textAlign = text.align
    ctx.textBaseline = "middle"
    ctx.fillText(
      this._text,
      this._x + this._width / 2 + padding,
      this._y + this._height / 2 + padding
    )
  }
}
