export default class AssetLoader {
  static async loadJson(path) {
    const response = await fetch(path)
    return await response.json()
  }
}
