export default class Scene {
  constructor(name) {
    this.__name = name;
    this.__entities = [];
  }
  addEntity(entity) {
    this.__entities.push(entity);
  }
  getEntitiesByType(entityType) {
    return this.__entities.filter(entity => entity instanceof entityType);
  }
  getEntities() {
    return this.__entities;
  }
}
