import * as THREE from 'three'
import { getRandomNormalizedPosition } from '@/scenes/utils/math'

export function createIsland() {
  const maxRange = 50 // Adjust this value to fit your scene size

  const islandGeometry = new THREE.SphereGeometry(1, 32, 16)
  const islandMaterial = new THREE.MeshToonMaterial({ color: 0x4caf50 })
  const island = new THREE.Mesh(islandGeometry, islandMaterial)

  // Get a random normalized position and set the island's position
  const position = getRandomNormalizedPosition(maxRange)
  island.position.copy(position)
  island.castShadow = true
  island.receiveShadow = true

  return island
}
