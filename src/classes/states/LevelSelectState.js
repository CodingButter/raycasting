import Level from "../Level"
import MenuController from "../controller/Menu"
import Button from "../graphics/GUI/Button"
export default class LevelSelectState {
  constructor(handler) {
    this.__handler = handler
    this.__canvas = this.__handler.getGame().canvas
  }
  deconstruct() {}

  async setup() {
    this.__controller = new MenuController(this.__canvas.getCanvas())
    this.__buttons = []
    this.__levels = await Level.getLevels()
    this.__buttons = this.__levels.map((level, index) => {
      const width = 150
      const height = 30
      return new Button(
        this.__controller,
        {
          x: this.__canvas.getWidth() / 2 - width / 2,
          y: this.__canvas.getHeight() / 2 + height / 2 + index * 100,
          width,
          height,
        },
        level.name,
        () => {
          const lvl = new Level(level)
          lvl.load()
          this.__handler.setLevel(lvl)
          lvl.on("status_change", console.log)
          lvl.on("load_complete", () => {
            this.__controller.deconstruct()
            this.__handler.getGame().setState("game")
          })
        }
      )
    })
  }

  update(dt) {}

  draw(ctx) {
    this.__buttons.forEach((button) => button.draw(ctx))
  }
}
