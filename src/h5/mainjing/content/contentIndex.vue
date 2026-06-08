<template>
    <div class="container">
        <div class="top">
            <img :src="backIcon" class="back" @click="goBack()">
            <div class="title">{{ item?.title }}</div>
        </div>
        <div class="body">
            <div class="meta">
                <span class="tag">Vue</span>
                <span class="time">{{ formattedTime }}</span>
            </div>
            <div class="content" v-html="item?.content"></div>
        </div>
    </div>
</template>

<script setup>
import backIcon from '@/assets/icon/back.svg'
import { useRouter } from 'vue-router'
import { vueList } from '@/assets/linshi/data/h5/mainjing'
import { computed } from 'vue'

const router = useRouter()
const props = defineProps({
    id: [String, Number]
})

const item = computed(() => {
    return vueList.find(v => v.id === Number(props.id))
})

const formattedTime = computed(() => {
    if (!item.value) return ''
    const d = new Date(item.value.createTime)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.title{
    width: 70%;
    text-align: center;
    /* background-color: yellow; */
        display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
.container {
    width: 100%;
    height: 100%;
}
.top {
    width: 100%;
    height: 7%;
    background-color: var(--color-h5Top);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-ssm);
}
.body {
    width: 100%;
    height: 93%;
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;
}
.back {
    width: 35px;
    aspect-ratio: 1/1;
    position: absolute;
    left: 8px;
}
.meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}
.tag {
    background: rgba(154, 205, 50, 0.2);
    color: yellowgreen;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
}
.time {
    font-size: 13px;
    color: #999;
}
.content {
    font-size: 15px;
    color: #333;
    line-height: 1.8;
}
.content :deep(p) {
    margin-bottom: 12px;
}
.content :deep(strong) {
    color: #2d2d2d;
}
.content :deep(h3) {
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 20px 0 10px;
}
.content :deep(pre) {
    background: #1e1e2e;
    border-radius: 10px;
    padding: 16px;
    margin: 12px 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
.content :deep(pre)::-webkit-scrollbar {
    height: 4px;
}
.content :deep(pre)::-webkit-scrollbar-track {
    background: transparent;
}
.content :deep(pre)::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
}
.content :deep(pre code) {
    display: block;
    background: none;
    color: #cdd6f4;
    padding: 0;
    border-radius: 0;
    font-size: 13px;
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    white-space: pre;
    line-height: 1.7;
    letter-spacing: 0.3px;
}
.content :deep(code) {
    background: #eef1f6;
    color: #c7254e;
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 13px;
    font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
    font-weight: 500;
    letter-spacing: 0.3px;
}
.content :deep(ul),
.content :deep(ol) {
    padding-left: 20px;
    margin-bottom: 12px;
}
.content :deep(li) {
    margin-bottom: 6px;
}
</style>
