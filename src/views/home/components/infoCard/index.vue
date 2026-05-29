<template>
    <div class="infoBox">
        <div class="info-avatar">
            <img style="width: 100%; height: 100%" :src="userInfo.avatarUrl" />
        </div>
        <div class="info-name">{{ userInfo.userName }}</div>
        <div class="info-toji">
            <div class="info-toji-box">
                <div class="info-toji-top">
                    <img :src=titleIcon class="tojiIcon"></img>
                    <div class="toji-text">文章</div>
                </div>
                <div class="info-toji-num">{{ userInfo.title }}</div>

            </div>
            <div class="info-toji-box">
                <div class="info-toji-top">
                    <img :src=hotIcon class="tojiIcon"></img>
                    <div class="toji-text">访客量</div>
                </div>
                <div class="info-toji-num">{{ userInfo.look }}</div>

            </div>

        </div>
    </div>

</template>
<script setup>
import titleIcon from "@/assets/icon/title.svg"
import hotIcon from "@/assets/icon/hot.svg"
defineProps({
    userInfo: {
        type: Array,
        default: () => []
    }
})
</script>
<style scoped>
.info-avatar {
    width: 120px;
    aspect-ratio: 1 / 1;
    /* 强制高度与宽度相等 */
    border-radius: 50%;
    background-color: antiquewhite;
    /* position: absolute; */
    overflow: hidden;
    margin-top: 10px;
    /* left: 35px; */
    /* top: -50px; */
    /* box-shadow: -5px 5px 12px rgba(0, 0, 0, 0.555); */
  border: 2px solid #b1b0b0;
}

.infoBox {
    width: 100%;
    /* background-color: rgb(78, 133, 133); */
    /* padding: 8px; */
    /* float: right; */
    /* border-radius: 8px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 4px; */
}

.info-name {
    width: fit-content;
    height: 24px;
    max-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;
    font-family: YuWoErYanNiZuiKeAi-2;
    font-size: 23px;
    line-height: 24px;
    margin-top: 10px;
}
.info-toji{
    width: 100%;
    height: 50px;
    /* background-color: rgba(155, 14, 14, 0.685); */
    display:flex;
    flex-direction:row;
    gap:var(--gap);
    align-items:center;
    justify-content:center;
    font-family: YuWoErYanNiZuiKeAi-2;
    margin-top:15px;
}
.info-toji-box{
    width: fit-content;
    height: 50px;
    /* background-color: rgba(101, 155, 14, 0.685); */
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
.info-toji-top{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    /* background-color:red; */
    width: fit-content;
}
.tojiIcon{
    height: 20px;
    aspect-ratio: 1;
    margin-right: 5px;
}
.toji-text{
    font-size: 12px;
}
</style>