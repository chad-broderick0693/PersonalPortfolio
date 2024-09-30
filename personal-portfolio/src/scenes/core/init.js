import * as THREE from 'three'

export function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0x87ceeb)

  camera.position.set(0, 3, 6)

  const app = document.getElementById('app')
  app.appendChild(renderer.domElement)

  return { scene, camera, renderer }
}
