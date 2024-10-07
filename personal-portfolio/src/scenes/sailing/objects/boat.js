import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class Boat {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.loader = new GLTFLoader()
    this.boat = null
    this.bobAmount = 0.1
    this.bobAngle = 0
    this.isUp = false
    this.isDown = false
    this.isLeft = false
    this.isRight = false
    this.i = 0

    this.loadModel()
    this.initEventListeners()
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

    this.boat.rotation.y = Math.PI * -0.2
    this.boat.scale.set(0.4, 0.4, 0.4)
  }

  initEventListeners() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.isUp = true
        break
      case 'ArrowDown':
        this.isDown = true
        break
      case 'ArrowLeft':
        this.isLeft = true
        break
      case 'ArrowRight':
        this.isRight = true
        break
      default:
        break
    }
  }

  onKeyUp(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.isUp = false
        break
      case 'ArrowDown':
        this.isDown = false
        break
      case 'ArrowLeft':
        this.isLeft = false
        break
      case 'ArrowRight':
        this.isRight = false
        break
      default:
        break
    }
  }

  update() {
    if (!this.boat) return

    const initialZ = this.boat.position.z
    const initialX = this.boat.position.x

    if (this.isUp) this.boat.position.z -= 0.05
    if (this.isDown) this.boat.position.z += 0.05
    if (this.isLeft) this.boat.position.x -= 0.05
    if (this.isRight) this.boat.position.x += 0.05

    const deltaZ = initialZ - this.boat.position.z
    const deltaX = initialX - this.boat.position.x

    if (deltaZ !== 0 || deltaX !== 0) {
      let targetRotation = Math.atan2(deltaX, deltaZ)

      let currentRotation = this.boat.rotation.y
      let rotationDifference = targetRotation - currentRotation

      rotationDifference = ((rotationDifference + Math.PI) % (2 * Math.PI)) - Math.PI

      this.boat.rotation.y = currentRotation + THREE.MathUtils.lerp(0, rotationDifference, 0.05)
    }

    this.bobAngle += 0.04
    this.boat.position.y = Math.sin(this.bobAngle) * this.bobAmount

    this.camera.position.set(this.boat.position.x, 3, this.boat.position.z + 6)
    this.camera.lookAt(new THREE.Vector3(this.boat.position.x, 0, this.boat.position.z))
  }
}
