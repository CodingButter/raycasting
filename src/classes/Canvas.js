export default class Canvas {
  constructor(width, height, parent) {
    this.__width = width;
    this.__height = height;
    this.__parent = parent;
    this.__canvas = document.createElement("canvas");

    this.__canvas.width = width;
    this.__canvas.height = height;
    this.__canvas.style.width = "100%";
    this.__canvas.style.height = "100%";
    this.__ctx = this.__canvas.getContext("2d");
    this.__parent.appendChild(this.__canvas);
  }
  //Getters
  getWidth() {
    return this.__width;
  }
  getHeight() {
    return this.__height;
  }
  getCanvas() {
    return this.__canvas;
  }
  getContext() {
    return this.__ctx;
  }
}
