import * as THREE from 'three'

export function createSunlight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
  directionalLight.position.set(0, 5, 0)

  return directionalLight
}

export function useSunlightHelper() {
  const directionalLight = createSunlight()
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5)

  return directionalLightHelper
}
