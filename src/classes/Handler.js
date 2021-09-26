export default class Handler {
  constructor(game) {
    this.__game = game;
  }

  getGame() {
    return this.__game;
  }
}
