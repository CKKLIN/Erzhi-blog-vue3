<template>
    <div class="container">
        <div class="center-card">
            <memoCard :headers="headers">
                <template #body-0>
                    <div>标签1的内容</div>
                </template>
                <template #body-1>
                    <div>标签2的内容</div>
                </template>
                <template #body-2>
                    <div>标签3的内容</div>
                </template>
            </memoCard>
        </div>
    </div>
</template>
<script lang="ts" setup>
import memoCard from '@/components/card/memoCard/index.vue'
import { ref } from 'vue'

const headers = ref([
    { name: '软件', color: '#e74c3c' },
    { name: '网站', color: '#3498db' },
    { name: '效率工具', color: '#2ecc71' },
])
</script>
<style scoped>

.container {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background: url('@/assets/bj/bj22.jpg');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
}

.center-card {
    margin-top: 100px;
    width: 70%;
    height: fit-content;
    /* background-color: rgb(187, 119, 29); */
    /* border-radius: var(--border-radius-card); */
    /* overflow: hidden; */
}
</style>