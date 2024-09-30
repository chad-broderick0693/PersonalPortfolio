import * as THREE from 'three'

export function createSun() {
  const sunGeometry = new THREE.SphereGeometry(10, 32, 16)
  const sunMaterial = new THREE.MeshToonMaterial({ color: 0xffd700 })
  const sun = new THREE.Mesh(sunGeometry, sunMaterial)
  sun.position.set(100, 50, -500)

  return sun
}
