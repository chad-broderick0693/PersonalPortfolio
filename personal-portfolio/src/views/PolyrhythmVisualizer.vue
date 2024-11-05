<script setup>
import { onMounted, ref } from 'vue'
import clickSoundFile from '@/assets/sounds/click.mp3'

let canvas, ctx, centerScreenX, centerScreenY
let cursorTheta = 0
let firstPolygonNumberOfSides = ref(2)
let secondPolygonNumberOfSides = ref(4)

const radius = 300
const clickSound = new Audio(clickSoundFile)

onMounted(() => {
  requestAnimationFrame(main)
})

function main() {
  init()
  drawCircle(centerScreenX, centerScreenY, radius)
  const firstShapeVertexes = drawPolygon(
    centerScreenX,
    centerScreenY,
    radius,
    firstPolygonNumberOfSides.value
  )
  const secondShapeVertexes = drawPolygon(
    centerScreenX,
    centerScreenY,
    radius,
    secondPolygonNumberOfSides.value
  )

  const cursorPosition = drawCursor()

  detectOverlap(cursorPosition, firstShapeVertexes)
  detectOverlap(cursorPosition, secondShapeVertexes)
  requestAnimationFrame(main)
}

function init() {
  canvas = document.getElementById('polyrhythm-canvas')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  ctx = canvas.getContext('2d')
  ctx.fillStyle = '#696969'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  centerScreenX = canvas.width / 2
  centerScreenY = canvas.height / 2
}

function drawCircle(centerX, centerY, radius, fill = false) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'
  fill ? ctx.fill() : ctx.stroke()
}

function drawPolygon(centerX, centerY, radius, sides) {
  let vertexes = []
  const angleStep = (Math.PI * 2) / sides
  const startingAngle = -Math.PI / 2

  ctx.beginPath()
  ctx.strokeStyle = 'white'

  for (let i = 0; i < sides; i++) {
    const x = centerX + radius * Math.cos(i * angleStep + startingAngle)
    const y = centerY + radius * Math.sin(i * angleStep + startingAngle)

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    vertexes.push({ x, y })
  }

  ctx.closePath()
  ctx.stroke()
  return vertexes
}

function drawCursor() {
  const cursorRadius = 10
  const speed = 0.015
  const startingAngle = -Math.PI / 2
  const x = radius * Math.cos(cursorTheta + startingAngle) + centerScreenX
  const y = radius * Math.sin(cursorTheta + startingAngle) + centerScreenY

  drawCircle(x, y, cursorRadius, true)
  cursorTheta += speed

  return { x, y }
}

let activeOverlaps = new Set()
const detectionRadius = 10

function detectOverlap(cursorPosition, vertexes) {
  vertexes.forEach((vertex, index) => {
    const distance = Math.hypot(cursorPosition.x - vertex.x, cursorPosition.y - vertex.y)

    if (distance < detectionRadius && !activeOverlaps.has(index)) {
      playClickSound()
      activeOverlaps.add(index)
    } else if (distance >= 10 && activeOverlaps.has(index)) {
      activeOverlaps.delete(index)
    }
  })
}

function playClickSound() {
  clickSound.currentTime = 0
  clickSound.play()
}
</script>

<template>
  <div class="document">
    <h1>Polyrhythm Visualizer</h1>
    <div class="controls">
      <input id="first-polygon" type="text" maxlength="1" v-model="firstPolygonNumberOfSides" />
      <span>against</span>
      <input id="second-polygon" type="text" maxlength="1" v-model="secondPolygonNumberOfSides" />
    </div>
  </div>

  <canvas id="polyrhythm-canvas"></canvas>
</template>

<style lang="scss">
.document {
  position: absolute;
  width: 100%;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}

h1 {
  font-size: 3rem;
  color: white;
  font-family: sans-serif;
  text-align: center;
}

span {
  font-size: 1.5rem;
  font-family: sans-serif;
  color: white;
}

input {
  outline: none;
  height: 3rem;
  width: 3rem;
  font-size: 1.8em;
  text-align: center;
  background-color: #909090;
  color: white;
  border-radius: 0.5rem;
  font-family: sans-serif;
  border: none;
}
</style>
