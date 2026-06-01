<template>
  <card :items="items" :card-width="220">
  </card>
</template>

<script setup lang="ts">
import card from '@/components/cardAnimation/index.vue'

const items = [
  {
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://picsum.photos/seed/book1/300/400',
    desc: '魔幻现实主义文学的代表作，描述了布恩迪亚家族七代人的传奇故事。',
  },
  {
    title: '活着',
    author: '余华',
    cover: 'https://picsum.photos/seed/book2/300/400',
    desc: '讲述了一个人历尽世间沧桑和磨难的一生，表达了对生命的热爱与敬畏。',
  },
  {
    title: '三体',
    author: '刘慈欣',
    cover: 'https://picsum.photos/seed/book3/300/400',
    desc: '中国科幻文学的里程碑之作，展现了宇宙文明的壮阔与残酷。',
  },
  // {
  //   title: '三体',
  //   author: '刘慈欣',
  //   cover: 'https://picsum.photos/seed/book3/300/400',
  //   desc: '中国科幻文学的里程碑之作，展现了宇宙文明的壮阔与残酷。',
  // },
]
</script>

<style scoped>
.card-front-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
}

.card-front-title {
  margin: 0 0 8px;
  font-size: 18px;
  color: #333;
}

.card-front-sub {
  margin: 0;
  font-size: 13px;
  color: #888;
}

.card-back-content {
  padding: 16px;
  color: #fff;
}

.card-back-content h3 {
  margin: 0 0 12px;
  font-size: 16px;
}

.card-table {
  width: 100%;
  border-collapse: collapse;
}

.card-table td {
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-table .label {
  color: #aaa;
  width: 40%;
}

.card-table .value {
  color: #fff;
  font-weight: 500;
}
</style>
