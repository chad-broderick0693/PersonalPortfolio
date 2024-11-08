import * as THREE from 'three'

export class Ocean {
  constructor(scene, color = 0x0077be) {
    this.scene = scene
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshToonMaterial({
        color,
        side: THREE.DoubleSide
      })
    )
  }

  setRotation() {
    this.mesh.rotation.x = Math.PI * 0.5
  }

  enableShadows(cast = false, receive = true) {
    this.mesh.castShadow = cast
    this.mesh.receiveShadow = receive
  }

  addToScene() {
    this.scene.add(this.mesh)
  }

  createOcean() {
    this.setRotation()
    this.enableShadows()
    this.addToScene()
  }
}
