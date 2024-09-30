import * as THREE from 'three'

export function createOcean() {
  const oceanGeometry = new THREE.PlaneGeometry(100, 100)
  const oceanMaterial = new THREE.MeshToonMaterial({ color: 0x0077be, side: THREE.DoubleSide })
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
  ocean.receiveShadow = true
  ocean.rotation.x = Math.PI * 0.5

  return ocean
}
