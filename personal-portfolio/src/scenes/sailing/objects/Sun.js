import * as THREE from 'three'

export class Sun {
  constructor(scene, color = 0xffd700) {
    this.scene = scene
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 16),
      new THREE.MeshToonMaterial({ color })
    )
  }

  setPosition() {
    this.mesh.position.set(100, 50, -500)
  }

  createSun() {
    this.setPosition()
    this.scene.add(this.mesh)
  }
}
