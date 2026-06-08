<template>
    <div class="container">
        <div class="center-card">
            <memoCard></memoCard>
        </div>
    </div>
</template>
<script lang="ts" setup>
import memoCard from '@/components/card/memoCard/index.vue'

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
    background-color: rgb(250, 235, 215);
    /* border-radius: var(--border-radius-card); */
    /* overflow: hidden; */
}
</style>