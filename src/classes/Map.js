const TILE_SIZE = 16;
export default class Map {
  constructor() {
    this.__grid = `
1111111111111111
1000000000010001
1000011110000001
1000000010011001
1000000000000001
1000000000000001
1111111111111111`
      .split("\n")
      .map(row => row.split(""))
      .filter(row => row.length > 0);
    console.log(this.__grid);
  }
  get width() {
    return this.__grid[0].length;
  }
  get height() {
    return this.__grid.length;
  }

  get grid() {
    return this.__grid;
  }

  hasWallAt(x, y) {
    const column = Math.floor(x / Map.TILE_SIZE);
    const row = Math.floor(y / Map.TILE_SIZE);
    console.log({ column, row });
    if (this.__grid[row][column] == 0) return false;
    return true;
  }
  static get TILE_SIZE() {
    return TILE_SIZE;
  }
}
