export default class Debuger {
  constructor(handler) {
    this.__handler = handler
    const performanceData = "fps|ticks"
    this.__performanceData = {}
    performanceData.split("|").forEach((key) => {
      this.__performanceData[key] = {
        currentValue: 0,
        show: false,
        values: [],
        average: 0,
        data: { last: Date.now() },
        round: true,
      }
    })
  }
  draw(ctx) {
    const now = Date.now()
    const dt = now - this.__performanceData.fps.data.last
    this.__performanceData.fps.data.last = now
    this.__performanceData.fps.currentValue = 1000 / dt
    if (this.__performanceData.fps.values.length < 100) this.__performanceData.fps.values.shift()

    this.__performanceData.fps.values.push(this.__performanceData.fps.currentValue)

    this.__performanceData.fps.average =
      this.__performanceData.fps.values.reduce((a, b) => a + b) /
      this.__performanceData.fps.values.length

    Object.keys(this.__performanceData).forEach((key, index) => {
      const data = this.__performanceData[key]
      if (data.show) {
        ctx.fillStyle = "white"
        ctx.textAlign = "left"
        const text = data.round
          ? `${key}: ${Math.round(data.currentValue)} (${Math.round(data.average)})`
          : `${key}: ${Math.ceil(data.currentValue * 100) / 100} (${
              Math.round(data.average * 100) / 100
            })`
        ctx.fillText(text, 10, this.__handler.getGame().height - 20 - index * 20)
      }
    })
  }

  update(dt) {
    this.__performanceData.ticks.currentValue = 1000 / (dt * 1000)
    if (this.__performanceData.ticks.values.length > 100)
      this.__performanceData.ticks.values.shift()
    this.__performanceData.ticks.values.push(this.__performanceData.ticks.currentValue)
    this.__performanceData.ticks.average =
      this.__performanceData.ticks.values.reduce((a, b) => a + b) /
      this.__performanceData.ticks.values.length
  }

  toggle(stat) {
    this.__performanceData[stat].show = !this.__performanceData[stat].show
  }
}
