export default class Emitter {
  constructor() {
    this.events = {};
  }
  on(name, listener) {
    if (!this.events[name]) this.events[name] = [];
    this.events[name].push(listener);
    return listener;
  }
  emit(name, params) {
    this.events[name] &&
      this.events[name].forEach(listener => {
        listener(params);
      });
  }
  remove(name, listenerToRemove) {
    if (!this.events[name]) throw new Error(`${name} event doesn't exist`);
    if (!this.events[name][this.events[name].indexOf(listenerToRemove)])
      throw new Error(`${name} listener doesn't exist`);
    this.events[name] = this.events[name].filter(
      listener => listener !== listenerToRemove
    );
  }
}
