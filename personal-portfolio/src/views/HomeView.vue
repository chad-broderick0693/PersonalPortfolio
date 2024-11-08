<script setup>
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { init } from '@/scenes/core/init'
import { Planet } from '@/scenes/sailing/objects/Planet'
import { Boat } from '@/scenes/sailing/objects/Boat'
import { IslandManager } from '@/scenes/sailing/objects/IslandManager'
// import { Ocean } from '@/scenes/sailing/objects/Ocean'
// import { Sun } from '@/scenes/sailing/objects/Sun'
import { Sunlight } from '@/scenes/sailing/lighting/Sunlight'

const { scene, camera, renderer } = init()

const controls = new OrbitControls(camera, renderer.domElement)

// Optional settings to tweak the controls:
controls.enableDamping = true // for smoother orbiting
controls.dampingFactor = 0.05 // how "smooth" the movement should feel
controls.screenSpacePanning = false // pan along ground, not screen space
controls.minDistance = 5 // minimum distance camera can zoom in
controls.maxDistance = 100 // maximum distance camera can zoom out
controls.maxPolarAngle = Math.PI / 2

camera.position.z = 70
camera.position.y = 20
const planet = new Planet(scene)
planet.createPlanet()

const boat = new Boat(scene, camera)

const islandManager = new IslandManager(scene)
islandManager.createIslands()

// const ocean = new Ocean(scene)
// ocean.createOcean()

const sunlight = new Sunlight(scene)
sunlight.createSunlight()

// const sun = new Sun(scene)
// sun.createSun()

function animate() {
  boat.update()
  sunlight.update()
  // controls.update()

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
</script>

<template>
  <main></main>
</template>
