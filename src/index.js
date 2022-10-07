import "./styles.css"
import "regenerator-runtime/runtime"
import "core-js/modules/es6.promise"
import Game from "./classes/Game"
const width = 1200
const height = width / 2
const appElement = document.getElementById("app")
appElement.style.width = `${width}px`
appElement.style.height = `${height}px`
const game = new Game(appElement, width, height)
game.run()
