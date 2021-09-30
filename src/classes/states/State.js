var currentState;
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

  getState() {
    return currentState;
  }
  setState(state) {
    currentState = state;
  }
}
