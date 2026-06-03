<template>
    <div class=”title”>
        {{ currentTitle }}
    </div>
</template>
<script setup>
import { ref } from 'vue'
const titleList = [
    '警告：翻开这本书，今晚别想早睡！',
    '别被封面骗了，这书里的剧情比老板画的饼还圆',
    '建议上班摸鱼时偷偷看，因为好看到根本停不下来',
    '大脑饿了？这本”精神麻辣烫”请趁热吃',
    '省下机票钱，去别人的世界里来场说走就走的”白嫖”旅行',
    '生活太苦？快来尝尝这本加了全糖的治愈系甜文',
    '专治各种”无聊综合症”，药效立竿见影',
    '买书如山倒，但这本绝对值得你从”抽丝”变成”狂啃”',
    '与其在朋友圈假装精致，不如躲进这本书里真实发疯',
]
const currentTitle = titleList[Math.floor(Math.random() * titleList.length)]
</script>
<style scoped>
.title {
    font-size: 90px;
    /* font-weight: 100; */
    text-align: center;
    color: #ffffff;
    
    font-family: "RuiZiJiJiaHongHuangChaoJiLiang";
}
</style>