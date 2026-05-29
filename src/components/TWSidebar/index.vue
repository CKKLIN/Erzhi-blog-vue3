<template>
    <dic class="container">
    <div class="header">
        <img class="icon" :src=tuijianIcon />
        <div class="text">推荐文章</div>
    </div>
    <div class="body">
        <div class="article"></div>
    </div>
    </dic>
    </template>
    <script setup>
    
 import tuijianIcon from "@/assets/icon/tuijian.svg"
</script>
    <style scoped>
    .container {
        width: 100%;
        height: 100%;
        /* background-color: #f50505; */
        display:flex;
        flex-direction:column;
    }
    .header {
        width: 100%;
        height: 38px;
        /* background-color: #f505053d; */
        display:flex;
        flex-direction:row;
        /* justify-content:center; */
        align-items:center;
        border-bottom: var(--color-line);
        padding: var(--padding-card);
    }
    .icon {
        width: 20px;
        height: 20px;
    }
    .text{
        font-size: 16px;
        font-family: "ZiHun144Hao-LangYuanTi-2";
        margin-left:8px;
    }
</style>