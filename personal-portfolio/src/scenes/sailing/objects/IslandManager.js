import { Island } from './Island'
import { getRandomNormalizedPosition } from '@/scenes/utils/math'

export class IslandManager {
  constructor(scene, maxRange = 50, numberOfIslands = 30) {
    this.scene = scene
    this.MAX_RANGE = maxRange
    this.NUMBER_OF_ISLANDS = numberOfIslands
  }

  createIslands() {
    const islands = []
    for (let i = 0; i < this.NUMBER_OF_ISLANDS; i++) {
      const island = new Island(this.scene)
      const position = getRandomNormalizedPosition(this.MAX_RANGE)
      island.setPosition(position)
      island.enableShadows()
      island.addToScene()
      islands.push(island)
    }
    return islands
  }
}
