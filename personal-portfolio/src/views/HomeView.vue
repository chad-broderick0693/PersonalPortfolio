<script setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <main>
    <TresCanvas window-size>
      <TresPerspectiveCamera :position="[3, 3, 3]" :fov="45" :look-at="[0, 0, 0]" />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
      <OrbitControls />
    </TresCanvas>
  </main>
</template>
