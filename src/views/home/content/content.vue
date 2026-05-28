<template>
  <div class="post" v-for="(item, index) in posts" :key="index">
    <div class="title">{{ item.title }}</div>
    <div class="content">
      <div class="content-left">{{ item.summary }}</div>
      <div class="content-right"></div>
    </div>
    <div class="foot">
      <div class="foot-son">{{ item.date }}</div>
    </div>
  </div>
</template>

<script setup>
const posts = Array.from({ length: 5 }, (_, i) => ({
  title: '文章标题',
  summary: '这是一段文章摘要内容...',
  date: '2026-05-28',
}))
</script>

<style scoped>
.post {
  height: fit-content;
  background-color: rgb(52, 65, 77);
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 8px;
  display: flex;
  flex-direction: column;
}
.title {
  width: 100%;
  height: 30px;
  background-color: rgb(87, 116, 31);
}
.content {
  width: 100%;
  height: fit-content;
  background-color: rgb(66, 64, 218);
  display: flex;
  flex-direction: row;
}
.content-left {
  flex: 1 1 70%;
  min-width: 70%;
  max-width: 100%;
  height: 100px;
  background-color: antiquewhite;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: break-word;
}
.content-right {
  flex: 0 0 100px;
  max-width: 30%;
  height: 100px;
  background-color: azure;
}
.foot {
  width: 100%;
  height: 24px;
  background-color: rgb(23, 96, 155);
  display: flex;
  justify-content: end;
}
.foot-son {
  width: fit-content;
  background-color: rgb(29, 123, 206);
}
</style>
