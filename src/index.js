import "./styles.css"
import "regenerator-runtime/runtime"
import "core-js/modules/es6.promise"
import Game from "./classes/Game"
const resolution = {
  width: 1024,
  height: 1024 / 2,
}
const appElement = document.getElementById("app")

const game = new Game(appElement, resolution.width, resolution.height)
game.run()
