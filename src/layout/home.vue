<template>
  <div class="home">
    <div class="home-top">
      <Header @path="handlePath" />
    </div>
    <div class="home-body">
      <Transition name="slide" mode="out-in">
        <router-view />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '@/layout/header.vue'

const router = useRouter()

const handlePath = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
}
.home-top {
  width: 100%;
  height: fit-content;
  position: absolute;
  z-index: 999;
}
.home-body {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
