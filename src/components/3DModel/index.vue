<template>
  <div ref="containerRef" class="model-container">
    <div v-if="loading" class="loading">
      <span class="loading-text">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = withDefaults(defineProps<{
  modelUrl: string
  autoRotate?: boolean
  autoRotateSpeed?: number
}>(), {
  modelUrl: '',
  autoRotate: true,
  autoRotateSpeed: 2,
})


const containerRef = ref<HTMLDivElement>()
const loading = ref(true)
const loadingText = ref('模型加载中...')

let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let scene: THREE.Scene | null = null
let animationId = 0
let model: THREE.Object3D | null = null

const getExt = (url: string) => {
  const match = url.match(/\.([a-z0-9]+)(\?|#|$)/i)
  return match ? match[1].toLowerCase() : ''
}

const addModelToScene = (obj: THREE.Object3D) => {
  model = obj
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 2 / maxDim
  model.scale.setScalar(scale)
  model.position.sub(center.multiplyScalar(scale))
  scene!.add(model)
  controls!.target.set(0, 0, 0)
  controls!.update()
  loading.value = false
}

const onProgress = (progress: { loaded: number; total: number }) => {
  if (progress.total > 0) {
    loadingText.value = `模型加载中 ${((progress.loaded / progress.total) * 100).toFixed(0)}%`
  }
}

const loadModel = () => {
  const ext = getExt(props.modelUrl)
  const manager = new THREE.LoadingManager()

  switch (ext) {
    case 'glb':
    case 'gltf': {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)
      loader.load(
        props.modelUrl,
        (gltf) => {
          addModelToScene(gltf.scene)
          dracoLoader.dispose()
        },
        onProgress,
        (err) => {
          console.error('模型加载失败:', err)
          loadingText.value = '模型加载失败'
        }
      )
      break
    }
    case 'fbx': {
      const loader = new FBXLoader(manager)
      loader.load(
        props.modelUrl,
        (fbx) => addModelToScene(fbx),
        onProgress,
        (err) => {
          console.error('模型加载失败:', err)
          loadingText.value = '模型加载失败'
        }
      )
      break
    }
    case 'obj': {
      const loader = new OBJLoader(manager)
      loader.load(
        props.modelUrl,
        (obj) => addModelToScene(obj),
        onProgress,
        (err) => {
          console.error('模型加载失败:', err)
          loadingText.value = '模型加载失败'
        }
      )
      break
    }
    case 'stl': {
      const loader = new STLLoader()
      loader.load(
        props.modelUrl,
        (geometry) => {
          geometry.computeVertexNormals()
          const material = new THREE.MeshStandardMaterial({ color: 0xcccccc })
          const mesh = new THREE.Mesh(geometry, material)
          addModelToScene(mesh)
        },
        onProgress,
        (err) => {
          console.error('模型加载失败:', err)
          loadingText.value = '模型加载失败'
        }
      )
      break
    }
    default:
      loadingText.value = `不支持的格式: .${ext}（支持 glb/gltf/fbx/obj/stl）`
      console.error('不支持的模型格式:', ext)
  }
}

const disposeModel = (obj: THREE.Object3D) => {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      materials.forEach((mat) => {
        for (const tex of Object.values(mat)) {
          if (tex instanceof THREE.Texture) tex.dispose()
        }
        mat.dispose()
      })
    }
  })
}

onMounted(() => {
  const container = containerRef.value!
  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 0, 3)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = props.autoRotateSpeed
  controls.enablePan = false
  controls.enableZoom = false
  controls.minPolarAngle = Math.PI / 2
  controls.maxPolarAngle = Math.PI / 2

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 10, 7)
  scene.add(dirLight)
  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
  dirLight2.position.set(-5, 5, -5)
  scene.add(dirLight2)

  loadModel()

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls!.update()
    renderer!.render(scene!, camera)
  }
  animate()

  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer!.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    controls?.dispose()
    if (model) disposeModel(model)
    renderer?.dispose()
    scene = null
    renderer = null
    controls = null
    model = null
  })
})
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  position: relative;
}

.loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-text {
  color: #fff;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 20px;
  border-radius: 6px;
}
</style>
