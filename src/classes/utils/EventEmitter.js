export default class EventEmitter {
  constructor() {
    this.__events = {}
  }
  on(event, callback) {
    if (!this.__events[event]) {
      this.__events[event] = []
    }
    this.__events[event].push(callback)
  }
  emit(event, ...args) {
    if (this.__events[event]) {
      this.__events[event].forEach((callback) => {
        callback(...args)
      })
    }
  }
  deconstruct() {
    this.__events = null
  }
}
