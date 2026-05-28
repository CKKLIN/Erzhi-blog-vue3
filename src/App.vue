<template>
  <router-view v-if="!isMobile"></router-view>
  <div v-else class="container" :style="{ height: `${viewportHeight}px`, width: `${viewportWidth}px` }">
    <div class="message">{{displayedText}}</div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义一个函数来检测设备是否为手机
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

const isMobile = ref(isMobileDevice());
// 定义响应式的变量来存储视口高度和宽度
const viewportHeight = ref(window.innerHeight);
const viewportWidth = ref(window.innerWidth);

const fullText = '当前系统暂不支持移动端，请在pc端查看'
const displayedText = ref(''
)
let index = 0

const typeWriter=()=> {
  if(index < fullText.length) {
    displayedText.value += fullText.charAt(index)
    index++
    setTimeout(typeWriter, 250)
  }
}

// 组件挂载后调用该函数
onMounted(() => {
  
  typeWriter()
  // 添加窗口大小变化的事件监听器
  window.addEventListener('resize', updateViewportSize);

  if (isMobileDevice()) {
    console.log('手机');
  } else {
    console.log('非手机设备');
  }
});

// 在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateViewportSize);
});



// 定义更新视口尺寸的函数
const updateViewportSize = () => {
  viewportHeight.value = window.innerHeight;
  viewportWidth.value = window.innerWidth;
};
</script>
<style scoped>
.container {
  display: flex; /* 启用Flexbox布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 让容器占据全部高度 */
  width: 100%; /* 让容器占据全部宽度 */
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  background-image: url('@/assets/picture/dijia.jpg');
  background-size: cover; /* 图片覆盖整个页面 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 不重复图片 */
  color: white; /* 文字颜色根据背景调整 */
  font-family: Arial, sans-serif;
}

.message {
  width: 100%;
  font-size: 90px;
  color: rgb(17, 228, 27);
  font-weight: 700;
}

</style>