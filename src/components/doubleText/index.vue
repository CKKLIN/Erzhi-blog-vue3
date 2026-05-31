<template>
  <div class="body" @mousemove="onMouseMove">
    <div class="text-layer front-layer">
      <div ref="textRef" class="text">豆腐干豆腐干豆腐干都给她个耳光</div>
    </div>
    <div ref="backLayerRef" class="text-layer back-layer">
      <div class="text">企鹅热尔哥v人TV地方v地方v</div>
    </div>
    <div class="cursor"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const MAX_TILT = 50
const PERSPECTIVE = 1000

const textRef = ref(null)
const backLayerRef = ref(null)

function onMouseMove(e) {
  const page = e.currentTarget
  const px = e.clientX
  const py = e.clientY

  page.style.setProperty('--mx', px + 'px')
  page.style.setProperty('--my', py + 'px')

  const backEl = backLayerRef.value
  if (backEl) {
    const br = backEl.getBoundingClientRect()
    const rx = px - br.left
    const ry = py - br.top
    backEl.style.clipPath = `circle(50px at ${rx}px ${ry}px)`
  }

  const el = textRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = px - cx
  const dy = py - cy
  const tiltX = -(dy / window.innerHeight) * MAX_TILT
  const tiltY = (dx / window.innerWidth) * MAX_TILT
  el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
}
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 55px;
  font-family: 'ZiHun144Hao-LangYuanTi-2';
  overflow: hidden;
  cursor: none;
  position: relative;
  background-color: rgba(227, 227, 227, 0);
}

.text-layer {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.front-layer {
  z-index: 1;
}

.back-layer {
  z-index: 3;
  color: #a84a4a;
  clip-path: circle(0px at -200px -200px);
}

.cursor {
  position: fixed;
  width: 100px;
  aspect-ratio: 1 / 1;
  background: #000;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  left: var(--mx, -200px);
  top: var(--my, -200px);
  z-index: 2;
}

.text {
  display: inline-block;
  transition: transform 0.1s ease-out;
}
</style>
