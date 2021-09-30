const TILE_SIZE = 32;
export default class Map {
  constructor() {
    this.__grid = `
11111111111111111111
10000000000100000001
10111111100000000001
10100000111110000001
10100000000000000001
10100000000000000001
10100101111000000001
10100100001000000001
10100100001000000001
10100111111000000001
10000000000000000001
11111111111111111111`
      .split("\n")
      .map(row => row.split(""))
      .filter(row => row.length > 0);
  }
  get columns() {
    return this.__grid[0].length;
  }
  get rows() {
    return this.__grid.length;
  }

  getWidth() {
    return this.columns * Map.TILE_SIZE;
  }
  getHeight() {
    return this.rows * Map.TILE_SIZE;
  }

  get grid() {
    return this.__grid;
  }

  hasWallAt(x, y) {
    const column = Math.floor(x / Map.TILE_SIZE);
    const row = Math.floor(y / Map.TILE_SIZE);
    if (this.__grid[row][column] == 0) return false;
    return true;
  }
  static get TILE_SIZE() {
    return TILE_SIZE;
  }
}
