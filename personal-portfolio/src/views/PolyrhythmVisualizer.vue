<script setup>
import { onMounted } from 'vue'

let canvas, ctx, centerScreenX, centerScreenY
let cursorTheta = 0
const radius = 300

onMounted(() => {
  requestAnimationFrame(main)
})

function main() {
  init()
  drawCircle(centerScreenX, centerScreenY, radius)
  drawPolygon(centerScreenX, centerScreenY, radius, 3)
  drawPolygon(centerScreenX, centerScreenY, radius, 4)
  drawCursor()
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
  const speed = 0.025
  const startingAngle = -Math.PI / 2
  const x = radius * Math.cos(cursorTheta + startingAngle) + centerScreenX
  const y = radius * Math.sin(cursorTheta + startingAngle) + centerScreenY

  drawCircle(x, y, cursorRadius, true)
  cursorTheta += speed
}
</script>

<template>
  <canvas id="polyrhythm-canvas"></canvas>
</template>

<style lang="scss"></style>
