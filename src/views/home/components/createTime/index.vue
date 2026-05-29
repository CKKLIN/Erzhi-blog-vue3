<template>
    <div class="time">
        <div class="text">此刻是建站的</div>
        <div class="time-text" v-html="timeHtml"></div>
        <div class="label">春节倒计时：<span v-html="countdownHtml"></span></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timeHtml = ref('')
const countdownHtml = ref('')

// 建站日期：2026年5月29日凌晨
const siteStart = new Date('2020-02-29T00:00:00')

let timer = null

function updateTime() {
    const now = new Date()
    const diff = now - siteStart

    const totalSeconds = Math.floor(diff / 1000)
    const seconds = totalSeconds % 60
    const totalMinutes = Math.floor(totalSeconds / 60)
    const minutes = totalMinutes % 60
    const totalHours = Math.floor(totalMinutes / 60)
    const hours = totalHours % 24
    const totalDays = Math.floor(totalHours / 24)
    const years = Math.floor(totalDays / 365)
    const remainDaysAfterYear = totalDays % 365
    const months = Math.floor(remainDaysAfterYear / 30)
    const days = remainDaysAfterYear % 30

    timeHtml.value = `第<div class="num">${years}</div>年<div class="num">${months}</div>月<div class="num">${days}</div>日<div class="num">${String(hours).padStart(2, '0')}</div>时<div class="num">${String(minutes).padStart(2, '0')}</div>分<div class="num">${String(seconds).padStart(2, '0')}</div>秒`

    // 春节倒计时 - 自动获取最近的下一个春节
    const cnyDates = [
        '2026-02-17', '2027-02-06', '2028-01-26', '2029-02-13',
        '2030-02-03', '2031-01-23', '2032-02-11', '2033-01-31',
        '2034-02-19', '2035-02-08', '2036-01-28', '2037-02-15',
        '2038-02-04', '2039-01-24', '2040-02-12', '2041-02-01',
        '2042-01-22', '2043-02-10', '2044-01-30', '2045-02-17',
    ]
    const cny = cnyDates
        .map(d => new Date(d + 'T00:00:00'))
        .find(d => d > now) || new Date(cnyDates[cnyDates.length - 1] + 'T00:00:00')
    const remain = cny - now
    if (remain <= 0) {
        countdownHtml.value = '已到！'
    } else {
        const rTotalSeconds = Math.floor(remain / 1000)
        const rSeconds = rTotalSeconds % 60
        const rTotalMinutes = Math.floor(rTotalSeconds / 60)
        const rMinutes = rTotalMinutes % 60
        const rTotalHours = Math.floor(rTotalMinutes / 60)
        const rHours = rTotalHours % 24
        const rDays = Math.floor(rTotalHours / 24)
        countdownHtml.value = `-<span class="num">${rDays}</span>天-<span class="num">${String(rHours).padStart(2, '0')}</span>时-<span class="num">${String(rMinutes).padStart(2, '0')}</span>分-<span class="num">${String(rSeconds).padStart(2, '0')}</span>秒`
    }
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>
<style scoped>
.time {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-family: "ZiHun144Hao-LangYuanTi-2";
}

.text {
    font-size: 2rem;
    font-weight: 600;
    color: #000000;
    letter-spacing: 0.2em;
    background: linear-gradient(to right, rgba(0, 255, 213, 0.664), rgba(0, 162, 255, 0.616), rgba(0, 119, 255, 0.555), rgba(0, 30, 128, 0.534), rgba(25, 0, 255, 0.452), rgba(0, 0, 255, 0.507), rgba(0, 92, 128, 0.507));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* 通过滤镜旋转色相来实现颜色的周期性变化 */
    animation: hueRotate 9s linear infinite;
}

@keyframes hueRotate {
    0% {
        filter: hue-rotate(0deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}

.time-text {
    font-size: 1.9rem;
    color: #000000;
    display: flex;
    flex-direction: row;
    /* justify-content:center; */
    align-items: end;
    gap: 15px;
}

.time-text :deep(.num) {
    font-size: 3.5rem;
    font-weight: 700;
}

.label {
    font-size: 1.5rem;
    color: #000000;
    width: 500px;
    letter-spacing: 0.1rem;
    /* background-color: rgba(8, 33, 116, 0.5); */
    /* display: flex; */
    /* flex-direction: row; */
}

.label span :deep(.num) {
    display: inline-block;
    /* background-color: rgba(255, 255, 255, 0.5); */
}
</style>