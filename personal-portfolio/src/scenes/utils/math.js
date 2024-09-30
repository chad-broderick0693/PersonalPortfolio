import * as THREE from 'three'

export function getRandomNormalizedPosition(maxRange) {
  const x = (Math.random() * 2 - 1) * maxRange
  const z = (Math.random() * 2 - 1) * maxRange
  return new THREE.Vector3(x, 0, z)
}
