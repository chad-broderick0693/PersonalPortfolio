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
export function createOcean() {
  const oceanGeometry = new THREE.PlaneGeometry(100, 100)
  const oceanMaterial = new THREE.MeshToonMaterial({ color: 0x0077be, side: THREE.DoubleSide })
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
  ocean.receiveShadow = true
  ocean.rotation.x = Math.PI * 0.5

  return ocean
}
