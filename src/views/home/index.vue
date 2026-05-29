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
            <infoCard :userInfo="user" />
          </div>

          <div class="body-left-two">
            <TWSidebar></TWSidebar>
          </div>
        </div>
        <div class="body-right">
          <div class="body-right-one">
            <createTime />
          </div>
          <div class="body-right-two">

            <img class="hornIcon" :src=hornIcon />
            <div class="hornMsg">公告！！！！！！</div>
          </div>
          <div class="body-right-three">

            <loading />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import wave from '@/components/wave.vue'
import player from '@/assets/icon/player.png'
import pause from '@/assets/icon/pause.png'
import dijia from '@/assets/picture/dijia.jpg'
import useCounter from '@/stores/pinia'
import hornIcon from '@/assets/icon/horn.svg'
import infoCard from '@/views/home/components/infoCard/index.vue'
import createTime from '@/views/home/components/createTime/index.vue'
import loading from '@/views/home/components/loading/index.vue'
import TWSidebar from '@/components/TWSidebar/index.vue'

const counterStore = useCounter()
const isPlay = ref(true)
const audioElement = ref()
const fullText = '欢迎来到我的博客!'
const displayedText = ref('')
let typeIndex = 0

const user = ref({
  id: null,
  userName: '木二支',
  avatarUrl: dijia,
  title: 1223,
  look: 45654
})

const postList = ref(Array.from({ length: 5 }, () => ({
  title: '文章标题',
  summary: '这是一段文章摘要内容...',
  date: '2026-05-28',
})))

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
  position: fixed;
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
  background-color: var(--color-white);
  /* background-color:red; */
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--gap);
  /* align-items:center; */
  justify-content: center;
}

.body-left {
  width: 18%;
  height: fit-content;
  /* margin: 0 0 10px 30px; */
  /* top: -20px; */
  /* padding: 15px; */
}

.body-left-one {
  width: 100%;
  /* height: 85px; */
  padding: var(--padding-card);
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: url(@/assets/bj/bj7.jpg) no-repeat center center / cover;
  background: linear-gradient(to top, red, rgba(255, 255, 0, 0)); */
  background: linear-gradient(rgba(14, 62, 134, 0), rgba(57, 158, 241, 0.692), rgb(57, 159, 241)), url('@/assets/bj/bj4.jpeg');
  background-size: cover;
  background-position: center;
}

.body-left-two {
  width: 100%;
  /* height: 600px; */
  background-color: rgba(255, 255, 255, 0.774);
  /* padding: var(--padding-ssm); */
  margin-top: 15px;
  box-shadow: var(--color-card-shadow);
  border-radius: var(--border-radius-card);
  border: var(--color-card-border);
}

.body-right {
  width: 72%;
  height: fit-content;
  /* margin-left: 15px; */
  display: flex;
  gap: 15px;
  flex-direction: column;
}

.body-right-one {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  /* background-color: var(--color-card-bg); */
  font-family: "YuWoErYanNiZuiKeAi-2";
  font-size: 18px;

  margin-bottom: 15px;
}

.hornIcon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.body-right-two {
  display: flex;
  flex-direction: row;
  /* justify-content:center; */
  align-items: center;
  width: 100%;
  height: 40px;
  /* padding: var(--padding-card); */
  border-radius: 8px;
  background-color: var(--color-card-bg);
  border: 1px dashed #ce6d13;
  /* gap: var(--gap); */
  padding: 0px 10px 0 10px;
  line-height: 1;
}
</style>
