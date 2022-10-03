var currentState
export default class State {
  /**
   * @Override
   * @param {2d Context} ctx
   */
  draw(ctx) {}

  /**
   * @override
   * @param {delta time} dt
   */
  update(dt) {}

  static getState() {
    return currentState
  }
  static setState(state) {
    if (currentState) currentState.deconstruct()
    currentState = state
    currentState.setup()
  }
}
