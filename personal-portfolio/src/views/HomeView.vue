<script setup>
import { init } from '@/scenes/core/init'
import { Boat } from '@/scenes/sailing/objects/Boat'
import { IslandManager } from '@/scenes/sailing/objects/IslandManager'
import { Ocean } from '@/scenes/sailing/objects/Ocean'
import { Sun } from '@/scenes/sailing/objects/Sun'
import { Sunlight } from '@/scenes/sailing/lighting/Sunlight'

const { scene, camera, renderer } = init()

const boat = new Boat(scene, camera)

const islandManager = new IslandManager(scene)
islandManager.createIslands()

const ocean = new Ocean(scene)
ocean.createOcean()

const sunlight = new Sunlight(scene)
sunlight.createSunlight()

const sun = new Sun(scene)
sun.createSun()

function animate() {
  boat.update()
  sunlight.update()

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
</script>

<template>
  <main></main>
</template>
