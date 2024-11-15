import * as THREE from 'three'
import { Boat } from './Boat'

export class GameController {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.boat = new Boat(scene)

    this.isUp = false
    this.isDown = false
    this.isLeft = false
    this.isRight = false

    this.playAreaBoundary = new THREE.Box3(
      new THREE.Vector3(-50, -2, -50),
      new THREE.Vector3(50, 10, 50)
    )

    this.initEventListeners()
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
    if (!this.boat.boat) return

    let moveX = 0
    let moveZ = 0

    if (this.isUp) moveZ -= 1
    if (this.isDown) moveZ += 1
    if (this.isLeft) moveX -= 1
    if (this.isRight) moveX += 1

    const length = Math.sqrt(moveX * moveX + moveZ * moveZ)
    if (length > 0) {
      moveX /= length
      moveZ /= length
    }

    const newPosition = new THREE.Vector3(
      this.boat.boat.position.x + moveX * this.boat.boatSpeed,
      this.boat.boat.position.y,
      this.boat.boat.position.z + moveZ * this.boat.boatSpeed
    )

    if (this.playAreaBoundary.containsPoint(newPosition)) {
      this.boat.move({ x: moveX, z: moveZ })
    }

    const deltaX = moveX * this.boat.boatSpeed
    const deltaZ = moveZ * this.boat.boatSpeed
    this.boat.updateRotation(deltaX, deltaZ)

    this.camera.position.set(this.boat.boat.position.x, 3, this.boat.boat.position.z + 6)
    this.camera.lookAt(new THREE.Vector3(this.boat.boat.position.x, 0, this.boat.boat.position.z))
  }
}
