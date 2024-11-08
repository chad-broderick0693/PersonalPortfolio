import * as THREE from 'three'

export class Sunlight {
  constructor(scene, color = 0xffffff, intensity = 5, radius = 5, speed = 0.001) {
    this.sunlightSpeed = speed

    this.scene = scene
    this.sunlight = new THREE.DirectionalLight(color, intensity)
    this.angle = 0
    this.radius = radius
  }

  positionSunlight() {
    this.sunlight.position.set(3, 5, -1)
  }

  createSunlight() {
    this.positionSunlight()
    this.scene.add(this.sunlight)
  }

  update() {
    // this.angle += this.sunlightSpeed
    // this.sunlight.position.x = this.radius * Math.cos(this.angle)
    // this.sunlight.position.y = this.radius * Math.sin(this.angle)
    // this.sunlight.position.z = 0
    // this.sunlight.target.position.set(0, 0, 0)
    // this.sunlight.target.updateMatrixWorld()
  }

  useSunlightHelper() {
    const sunlightHelper = new THREE.DirectionalLightHelper(this.sunlight, 0.5)
    this.scene.add(sunlightHelper)
  }
}
