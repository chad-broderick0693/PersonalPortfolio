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
    this.boundsX = 64
    this.boundsZ = 61

    this.playAreaBoundary = new THREE.Box3(
      new THREE.Vector3(-this.boundsX, -2, -this.boundsZ),
      new THREE.Vector3(this.boundsX, 10, this.boundsZ)
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

    let forward = 0
    let turn = 0

    if (this.isUp) forward += 1
    if (this.isDown) forward -= 1
    if (this.isLeft) turn += 1
    if (this.isRight) turn -= 1

    const turnSpeed = 0.01
    const lagSpeed = 0.015
    this.boat.boat.rotation.y += turn * turnSpeed

    const forwardVector = new THREE.Vector3(0, 0, -1)
    forwardVector.applyQuaternion(this.boat.boat.quaternion)

    const movementVector = forwardVector.multiplyScalar(forward * this.boat.boatSpeed)

    const newPosition = new THREE.Vector3().addVectors(this.boat.boat.position, movementVector)

    if (this.playAreaBoundary.containsPoint(newPosition)) {
      this.boat.boat.position.copy(newPosition)
    }

    const bobAmount = 0.05
    const bobSpeed = 0.02
    this.boat.bobAngle = (this.boat.bobAngle || 0) + bobSpeed
    this.boat.boat.position.y = Math.sin(this.boat.bobAngle) * bobAmount

    const cameraOffset = new THREE.Vector3(0, 3, 6)
    const rotatedOffset = cameraOffset.applyQuaternion(this.boat.boat.quaternion)
    const targetCameraPosition = new THREE.Vector3(
      this.boat.boat.position.x + rotatedOffset.x,
      3,
      this.boat.boat.position.z + rotatedOffset.z
    )

    this.camera.position.lerp(targetCameraPosition, lagSpeed)

    this.camera.lookAt(
      new THREE.Vector3(
        this.boat.boat.position.x,
        this.boat.boat.position.y,
        this.boat.boat.position.z
      )
    )
  }
}
