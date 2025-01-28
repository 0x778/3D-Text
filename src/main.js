import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Chillen from '/fonts/LEMON MILK_Regular.json?url'
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import texturetext from '/Textures/1.png'
import texturedount from '/Textures/3.png'

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
// renderer.render(scene, camera)
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
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
const Axes = new THREE.AxesHelper(5)
scene.add(Axes)

/**
 * Texture Loader
 */
const loader = new THREE.TextureLoader()
const texture3D = loader.load(texturetext)
const dount3D = loader.load(texturedount)

/**
 * 3D text
 */
const fontLoader = new FontLoader()
fontLoader.load(Chillen ,  (font) => {
  //Debug
  console.log(font)
  const geometry = new TextGeometry('M A K E   Y O U R \n O W N \n C R A T I V I T Y \n -------------------', {
    font: font,
		size:1,
		depth: 0.1,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.2,
		bevelSize: 0.2,
		bevelOffset: 0,
		bevelSegments: 5
  })
  const material = new THREE.MeshMatcapMaterial({matcap: texture3D})
  const text = new THREE.Mesh(geometry, material)
  scene.add(text)
  gui.add(material, "wireframe" , false)
  geometry.center()

  const torus = new THREE.TorusGeometry(0.6,0.4,14,40)
  const material2 = new THREE.MeshMatcapMaterial({matcap: dount3D})

  for(let i = 0; i < 1000; i++) {
    const dount = new THREE.Mesh(
      torus,
      material2
      )
    
    dount.position.z = (Math.random() - 0.5 ) * 10 * (i/2)
    dount.position.y = (Math.random() - 0.5 ) * 10 * (i/2)
    dount.position.x = (Math.random() - 0.5 ) * 10 * (i/2)
    dount.rotation.x = Math.random() * Math.PI
    dount.rotation.y = Math.random() * Math.PI
    dount.rotation.z = Math.random() * Math.PI
    const scale = Math.random()
    dount.scale.set(scale,scale,scale)
    scene.add(dount)

  }

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