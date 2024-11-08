import * as THREE from 'three'

export function getRandomNormalizedPosition(maxRange) {
  const x = (Math.random() * 2 - 1) * maxRange
  const z = (Math.random() * 2 - 1) * maxRange
  return new THREE.Vector3(x, 30, z)
}

export function determineSphericalCoordinates(radius, phi, theta) {
  const phiRadians = convertToRadians(phi)
  const thetaRadians = convertToRadians(theta)

  const x = radius * Math.sin(phiRadians) * Math.cos(thetaRadians)
  // Normally z and y are flipped here, but THREE has z as the vertical
  const y = radius * Math.cos(phiRadians)
  const z = radius * Math.sin(phiRadians) * Math.sin(thetaRadians)

  return new THREE.Vector3(x, y, z)
}

export function convertToRadians(degrees) {
  return degrees * (Math.PI / 180)
}
