<script setup>
import { init } from '@/scenes/core/init'
import { IslandManager } from '@/scenes/sailing/objects/IslandManager'
import { Ocean } from '@/scenes/sailing/objects/Ocean'
import { Sun } from '@/scenes/sailing/objects/Sun'
import { Sunlight } from '@/scenes/sailing/lighting/Sunlight'
import { GameController } from '@/scenes/sailing/objects/GameController'

const { scene, camera, renderer } = init()

const gameController = new GameController(scene, camera)

const islandManager = new IslandManager(scene)
islandManager.createIslands()

new Ocean(scene)

const sunlight = new Sunlight(scene)
sunlight.createSunlight()

const sun = new Sun(scene)
sun.createSun()

function animate() {
  gameController.update()

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
</script>

<template>
  <main></main>
</template>
