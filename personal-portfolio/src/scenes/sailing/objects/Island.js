import * as THREE from 'three'

export class Island {
  constructor(scene, size = 1, color = 0x4caf50) {
    this.scene = scene
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 16),
      new THREE.MeshToonMaterial({ color })
    )
  }

  setPosition(position) {
    this.mesh.position.copy(position)
  }

  enableShadows(cast = true, receive = true) {
    this.mesh.castShadow = cast
    this.mesh.receiveShadow = receive
  }

  addToScene() {
    this.scene.add(this.mesh)
  }
}
