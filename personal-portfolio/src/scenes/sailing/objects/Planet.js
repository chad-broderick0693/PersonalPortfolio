import * as THREE from 'three'

export class Planet {
  constructor(scene, color = 0x0077be) {
    this.scene = scene
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(30, 30, 30),
      new THREE.MeshToonMaterial({ color })
    )
  }

  addToScene() {
    this.scene.add(this.mesh)
  }

  enableShadows(cast = false, receive = true) {
    this.mesh.castShadow = cast
    this.mesh.receiveShadow = receive
  }

  createPlanet() {
    this.enableShadows()
    this.addToScene()
  }
}
