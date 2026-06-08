<template>
    <div class="container">
        <div class="top">
            <img :src=backIcon class="back" @click="goBack()">
            <div class="title">Vue面试常问</div>
        </div>
        <div class="body">
            <div
                class="list-item"
                v-for="item in vueList"
                :key="item.id"
                @click="lookContent(item.id)"
            >
                <span class="list-index">{{ item.id }}</span>
                <span class="list-title">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import backIcon from '@/assets/icon/back.svg'
import { useRouter, useRoute } from 'vue-router'
import { vueList } from '@/assets/linshi/data/h5/mainjing'

const router = useRouter()
const route = useRoute()
const goBack=()=>{
      router.push('/mianJingh5')
}
const lookContent=(id)=>{
    router.push(`/mianjingListh5/${id}`)
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.top{
    width: 100%;
    height: 7%;
    background-color: yellowgreen;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    padding: var(--padding-ssm);
}
.body{
    width: 100%;
    height: 93%;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;
}
.back{
    width: 35px;
    aspect-ratio: 1/1;
    position: absolute;
    left: 8px;
}
.list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    margin-bottom: 10px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease;
}
.list-item:active {
    transform: scale(0.97);
}
.list-index {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(134, 134, 134, 0.15);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #555;
}
.list-title {
    font-size: 15px;
    color: #333;
    line-height: 1.4;
}
</style>