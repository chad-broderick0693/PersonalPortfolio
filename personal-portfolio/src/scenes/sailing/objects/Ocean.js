import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class Ocean {
  constructor(scene) {
    this.scene = scene
    this.loader = new GLTFLoader()
    this.ocean = null
    this.loadModel()
  }

  loadModel() {
    this.loader.load(
      '/assets/models/Ocean.glb',
      (gltf) => {
        this.ocean = gltf.scene
        this.scene.add(this.ocean)
        this.setUpOcean()
      },
      undefined,
      (error) => console.error('An error happened while loading Ocean', error)
    )
  }

  setUpOcean() {
    this.ocean.traverse((child) => {
      if (child.isMesh) {
        const existingMaterial = child.material
        child.material = new THREE.MeshToonMaterial({
          color: existingMaterial.color,
          map: existingMaterial.map
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
}
