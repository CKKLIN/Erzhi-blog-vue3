<template>
  <div class="main">
    <div class="bigBox">
      <div class="welcome">
        {{ displayedText }}
        <div class="music">
          <img v-show="isPlay" @click="togglePlay()" :src="player" class="music-spin" />
          <img v-show="!isPlay" @click="togglePlay()" :src="pause" style="width: 100%; height: 100%" />
          <audio ref="audioElement" :src="musicSrc" loop></audio>
        </div>
      </div>
      <div class="top">
        <wave />
      </div>
      <div class="body">
        <div class="body-left">
          <div class="body-left-one">
            <div class="info-avatar">
              <img style="width: 100%; height: 100%" :src="user.avatarUrl" />
            </div>
            <div class="infoBox">
              <div class="info-name">{{ user.userName }}</div>
              <div class="info-say">{{ user.signature }}</div>
            </div>
          </div>
          <div class="body-left-two"></div>
        </div>
        <div class="body-right">
          <ContentList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import wave from '@/components/wave.vue'
import ContentList from '@/views/home/content/content.vue'
import player from '@/assets/icon/player.png'
import pause from '@/assets/icon/pause.png'
import dijia from '@/assets/picture/dijia.jpg'
import useCounter from '@/stores/pinia'

const counterStore = useCounter()
const isPlay = ref(true)
const audioElement = ref()
const fullText = '欢迎来到我的博客!'
const displayedText = ref('')
let typeIndex = 0

const user = ref({
  id: null,
  userName: '',
  avatarUrl: dijia,
  signature: '',
})

// TODO: 替换为实际音乐文件
const musicSrc = ''

const typeWriter = () => {
  if (typeIndex < fullText.length) {
    displayedText.value += fullText.charAt(typeIndex)
    typeIndex++
    setTimeout(typeWriter, 250)
  }
}

const togglePlay = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    audioElement.value?.play()
  } else {
    audioElement.value?.pause()
  }
}

onMounted(() => {
  typeWriter()
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  background-image: url(@/assets/bj/header.jpg);
  background-size: cover;
  animation: slideDown 1.5s ease-in-out forwards;
}
@keyframes slideDown {
  from {
    background-position: center -60px;
  }
  to {
    background-position: center 0px;
  }
}
.welcome {
  max-width: 300px;
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.336);
  position: absolute;
  margin-left: calc(50% - 150px);
  margin-top: -8%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-family: 'huawenxingkai';
  font-size: larger;
  padding-right: 35px;
}
.music {
  width: 50px;
  height: 50px;
  cursor: pointer;
  /* background-color: rgba(9, 151, 233, 0.425); */
  position: absolute;
  border-radius: 50%;
  top: -15px;
  right: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.music-spin {
  width: 100%;
  height: 100%;
  animation: music 2s linear infinite;
}
@keyframes music {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.bigBox {
  width: 100%;
  height: fit-content;
  z-index: 111;
  display: flex;
  flex-direction: column;
  padding-top: 20%;
}
.top {
  width: 100%;
  height: 150px;
}
.body {
  width: 100%;
  height: fit-content;
  background-color: rgb(255, 255, 255);
  position: relative;
  display: flex;
  flex-direction: row;
}
.body-left {
  width: 24%;
  height: fit-content;
  background-color: rgba(209, 209, 209, 0.233);
  margin: 0 0 10px 30px;
  border-radius: 8px;
  top: -20px;
  padding: 15px;
}
.body-left-one {
  width: 100%;
  height: 85px;
}
.info-avatar {
  width: 150px;
  aspect-ratio: 1 / 1; /* 强制高度与宽度相等 */
  border-radius: 50%;
  background-color: antiquewhite;
  position: absolute;
  overflow: hidden;
  left: 35px;
  top: -50px;
  box-shadow: -5px 5px 12px rgba(0, 0, 0, 0.555);
}
.infoBox {
  width: calc(63% - 16px);
  background-color: rgb(78, 133, 133);
  padding: 8px;
  float: right;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-name {
  width: 100%;
  height: 24px;
  max-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 24px;
}
.info-say {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  line-height: 20px;
}
.body-left-two {
  width: 100%;
  height: 600px;
  background-color: aqua;
  margin-top: 15px;
  border-radius: 8px;
}
.body-right {
  width: calc(76% - 120px);
  height: fit-content;
  background-color: rgba(209, 209, 209, 0.233);
  border-radius: 8px;
  margin-left: 15px;
  padding: 15px 15px 0 15px;
}
</style>
