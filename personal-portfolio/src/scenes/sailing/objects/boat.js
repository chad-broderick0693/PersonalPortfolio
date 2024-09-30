import * as THREE from 'three'

export function createBoat() {
  const boatGeometry = new THREE.CapsuleGeometry(0.4, 0.4, 10, 20)
  const boatMaterial = new THREE.MeshToonMaterial({ color: 0xd35400 })
  const boat = new THREE.Mesh(boatGeometry, boatMaterial)
  boat.castShadow = true
  boat.receiveShadow = true
  boat.rotation.x = Math.PI * 0.5

  return boat
}
