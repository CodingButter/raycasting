import "./styles.css";
import Game from "./classes/Game";
const resolution = {
  width: 380,
  height: 200,
};
const appElement = document.getElementById("app");

const game = new Game(appElement, resolution.width, resolution.height);
game.run();
