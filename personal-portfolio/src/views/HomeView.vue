<script setup>
import * as THREE from 'three'
import { init } from '@/scenes/core/init'
import { createBoat } from '@/scenes/sailing/objects/boat'
import { createIsland } from '@/scenes/sailing/objects/island'
import { createSunlight, useSunlightHelper } from '@/scenes/sailing/lighting/sunlight'
import { createOcean } from '@/scenes/sailing/objects/ocean'
import { createSun } from '@/scenes/sailing/objects/sun'

const { scene, camera, renderer } = init()

const boat = createBoat()
scene.add(boat)

const numberOfIslands = 30
for (let i = 0; i < numberOfIslands; i++) {
  const island = createIsland()
  scene.add(island)
}

const sunlight = createSunlight()
scene.add(sunlight)

const useLightHelper = false
if (useLightHelper) {
  const sunlightHelper = useSunlightHelper()
  scene.add(sunlightHelper)
}

const ocean = createOcean()
scene.add(ocean)

const sun = createSun()
scene.add(sun)

let angle = 0
const radius = 5
let bobAmount = 0.1
let bobAngle = 0

function animate() {
  if (isDown) {
    boat.position.z += 0.05
  }
  if (isUp) {
    boat.position.z -= 0.05
  }
  if (isLeft) {
    boat.position.x -= 0.05
  }
  if (isRight) {
    boat.position.x += 0.05
  }

  camera.position.set(boat.position.x, 3, boat.position.z + 6)
  camera.lookAt(new THREE.Vector3(boat.position.x, 0, boat.position.z))

  angle += 0.001
  sunlight.position.x = radius * Math.cos(angle)
  sunlight.position.y = radius * Math.sin(angle)
  sunlight.position.z = 0

  sunlight.target.position.set(0, 0, 0)
  sunlight.target.updateMatrixWorld()

  bobAngle += 0.04
  boat.position.y = Math.sin(bobAngle) * bobAmount

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

let isDown = false
let isUp = false
let isRight = false
let isLeft = false

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      isUp = true
      break
    case 'ArrowDown':
      isDown = true
      break
    case 'ArrowRight':
      isRight = true
      break
    case 'ArrowLeft':
      isLeft = true
      break
    default:
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      isUp = false
      break
    case 'ArrowDown':
      isDown = false
      break
    case 'ArrowRight':
      isRight = false
      break
    case 'ArrowLeft':
      isLeft = false
      break
    default:
      break
  }
})
</script>

<template>
  <main></main>
</template>
