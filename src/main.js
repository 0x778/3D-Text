import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Chillen from '/fonts/Chillen_Regular.json?url'
import GUI from 'lil-gui'
/**
 * Base
*/
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
renderer.render(scene, camera)
camera.position.z = 5


/**
 * Events
*/

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Debug
 */
const gui = new GUI()


/**
 * 3D text
 */
const fontLoader = new FontLoader()
fontLoader.load(Chillen ,  (font) => {
  console.log(font)
  const geometry = new TextGeometry('Hussam Al-maswari', {
    font: font,
		size:100,
		depth: 5,
		curveSegments: 2,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 2
  })
  const material = new THREE.MeshBasicMaterial()
  const text = new THREE.Mesh(geometry, material)
  scene.add(text)
  gui.add(material, "wireframe" , false)
  
})

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 2, 2)
scene.add(directionalLight)



function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()