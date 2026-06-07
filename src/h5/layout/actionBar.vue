<template>
  <div class="actionBar">
    <!-- 滑块背景 -->
    <div
      class="actionBar-slider"
      :style="{ left: sliderOffset + '%' }"
    ></div>
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="actionBar-item"
      :class="{ active: currentPath === item.path }"
      @click="handleClick(item)"
    >
      <component :is="item.icon" class="actionBar-icon" />
      <span class="actionBar-text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => route.path)

const menuList = [
  { name: '面经', path: '/mianJingh5' },
//   { name: '我的', path: '/myh52' },
//   { name: '我的', path: '/myh51' },
  { name: '我的', path: '/myh5' },
]

const sliderOffset = computed(() => {
  const index = menuList.findIndex(item => item.path === currentPath.value)
  return index >= 0 ? `${index * (100 / menuList.length)}%` : '0%'
})

const sliderWidth = computed(() => `${100 / menuList.length}%`)

const handleClick = (item) => {
  if (currentPath.value !== item.path) {
    router.push(item.path)
  }
}
</script>

<style scoped>
.actionBar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}

.actionBar-slider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: calc(v-bind('sliderOffset') + 4px);
  width: calc(v-bind('sliderWidth') - 8px);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.55);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.08),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.06);
  transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 0;
}

.actionBar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  flex: 1;
  padding: 10px 0;
  border-radius: 34px;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;
}

.actionBar-icon {
  font-size: 32px;
  color: rgba(60, 60, 67, 0.5);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.actionBar-text {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: rgba(60, 60, 67, 0.5);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  white-space: nowrap;
}

.actionBar-item.active .actionBar-icon {
  color: #007AFF;
  filter: drop-shadow(0 2px 4px rgba(0, 122, 255, 0.4));
}

.actionBar-item.active .actionBar-text {
  color: #007AFF;
  font-weight: 600;
}

.actionBar-item:active {
  transform: scale(0.92);
}

.actionBar-item.active:active {
  transform: scale(0.98);
}
</style>