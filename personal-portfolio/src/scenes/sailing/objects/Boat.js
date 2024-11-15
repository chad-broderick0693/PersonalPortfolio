import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class Boat {
  constructor(scene) {
    this.scene = scene
    this.loader = new GLTFLoader()
    this.boat = null
    this.boatSpeed = 0.1
    this.bobAmount = 0.1
    this.bobAngle = 0

    this.loadModel()
  }

  loadModel() {
    this.loader.load(
      '/assets/models/Sailboat.glb',
      (gltf) => {
        this.boat = gltf.scene
        this.scene.add(this.boat)
        this.setUpBoat()
      },
      undefined,
      (error) => console.error('An error happened while loading Boat', error)
    )
  }

  setUpBoat() {
    this.boat.traverse((child) => {
      if (child.isMesh) {
        const existingMaterial = child.material
        child.material = new THREE.MeshToonMaterial({
          color: existingMaterial.color,
          map: existingMaterial.map,
          side: THREE.DoubleSide
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    this.boat.scale.set(0.4, 0.4, 0.4)
  }

  move(direction) {
    if (!this.boat) return

    this.boat.position.x += direction.x * this.boatSpeed
    this.boat.position.z += direction.z * this.boatSpeed
  }

  updateRotation(deltaX, deltaZ) {
    if (deltaZ !== 0 || deltaX !== 0) {
      let targetRotation = Math.atan2(-deltaX, -deltaZ)
      let currentRotation = this.boat.rotation.y
      let rotationDifference = targetRotation - currentRotation

      rotationDifference = ((rotationDifference + Math.PI) % (2 * Math.PI)) - Math.PI
      this.boat.rotation.y = currentRotation + THREE.MathUtils.lerp(0, rotationDifference, 0.05)
    }
  }
}
