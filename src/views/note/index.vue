<template>
  <div class="container" ref="elementA" @scroll="handleScroll">
    <div class="center">
      <div class="title">树洞</div>
      <el-input class="center-input" placeholder="不留下点什么吗" v-model="input" @keyup.enter="send"></el-input>
    </div>
    <div class="bullet">
      <rain></rain>
      <vue-danmaku ref="danmakuRef" :speeds="100" v-model:danmus="commentList" :randomChannel="true" useSlot loop
        :channels="channels" class="danmaku" :isSuspend="true" :top="10">
        <template v-slot:dm="{ index, danmu }">
          <div @mouseenter="handleEnter" @mouseleave="handleLeave" @click='handleClick(danmu)' class="item">
            <img :src="danmu.imageUrl" class="danmkuAvatar" @error="setDefaultImage($event)">
            <p class="msg">{{ danmu.comment }}</p>
          </div>
        </template>
      </vue-danmaku>

    </div>
    <CommentSection
      :comments="commentList"
      @getComment="getComment"
      @isGood="(id) => isGood(id, user.id)"
      @noGood="(id) => noGood(id, user.id)"
    />
    <!-- <img src="../../assets/xiaoxin.png" class="scroll-to-top" v-if="showScrollButton" @click="scrollToTop"> -->
  </div>
</template>

<script setup>
import vueDanmaku from 'vue3-danmaku'
import { onMounted, ref } from 'vue';
// import { getCommentAPI, addCommentAPI, isGoodAPI, noGoodAPI } from '../../api/comment';
import useCounter from '../../stores/pinia';
// import rain from '../../components/modules/rain.vue'
import { useRouter } from 'vue-router';
import { parseJwt } from '../../stores/pinia';
import CommentSection from '../../components/CommentSection.vue'

// const list = ref();
const good = ref(false)
const input = ref()
const counterStore = useCounter()
const router = useRouter()
const user = ref()
const showScrollButton = ref(false)

// 创建一个响应式引用，用于保存对`elementA`的引用。初始值为null。
const elementA = ref(null);
const commentList = ref([
    {imageUrl:'https://p3fx.kgimg.com/v2/fxuserlogo/eac9145ecd909b9606c4f8e5f3e936e7.jpg_200x200.jpg',comment: "1",}
])

let channels = 0
const danmakuRef = ref(null)



const getComment = async (createTime, good) => {

  let params1 = {
    createTime: createTime,
    good: good,
    userId: user.value.id
  }
  const result = await getCommentAPI(params1);
  commentList.value = result.data
  // console.log(result.data)
  // console.log(commentList.value)

}



// 设置默认头像
const setDefaultImage = (event) => {
  event.target.src = 'https://p3fx.kgimg.com/v2/fxuserlogo/eac9145ecd909b9606c4f8e5f3e936e7.jpg_200x200.jpg'
}

const send = async () => {
  const trimmedInput = input.value.trim()
  if (trimmedInput === '') {
    // ElNotification.warning('消息不能为空')
    return
  }
  let params = {
    userId: user.value.id,
    name: user.value.name,
    imageUrl: user.value.imageUrl,
    comment: trimmedInput
  }
  const result = await addCommentAPI(params)
  if (result.data.code == 200) {
    let params1 = {
      createTime: 'l',
      good: null
    }
    getComment('l', null, user.value.id)
    input.value = ""
  }

}

const isGood = async (id, userId) => {
  console.log(id + "/" + userId + "///")
  const result = await isGoodAPI(userId, id)
  if (result.data.code == 200) {
    good.value = true
    getComment()
  }
}
const noGood = async (id, userId) => {
  const result = await noGoodAPI(userId, id)
  if (result.data.code == 200) {
    good.value = true
    getComment()
  }
}

// 定义处理滚动事件的方法。
const handleScroll = () => {
  if (elementA.value) {
    const scrollTop = elementA.value.scrollTop;
    const scrollHeight = elementA.value.scrollHeight;
    const clientHeight = elementA.value.clientHeight;

    showScrollButton.value = scrollTop >= clientHeight
  }
};
const scrollToTop = () => {
  elementA.value.scrollTo({ top: 0, behavior: 'smooth' });
}


onMounted(() => {

  const danmakuHeight = danmakuRef.value.$el.offsetHeight
  channels = Math.ceil(danmakuHeight / 55);
//   if (counterStore.jwt) {

//     user.value = parseJwt(counterStore.jwt)
//     console.log("留言" + user.value.id)

//     getComment('l', null, user.value.id)
//     handleScroll();
//   } else {
//     router.push('/')
//   }



})
</script>

<style scoped>
.danmaku {
  top: 40px;
  left: 0;
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
}

.item {
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(58, 53, 53, 0.735);
  height: 44px;
  border-radius: 22px;
}

.danmkuAvatar {
  height:calc(100% - 10px);
  aspect-ratio:1;
  /* padding-left: 8px; */
  margin: 5px;
  /* background-color: tomato; */
  border-radius: 50%;
}

.msg {
  font-size: 18px;
  padding-right: 15px;
  padding-left: 5px;
  color: #ffffffea;
}

.container {
  width: 100%;
  height: calc(100% - 40px);
  position: relative;
  overflow: auto;
  padding-top: 40px;
  background-image: url(@/assets/picture/bj3.jpg);
  background-size: cover;
}

.center {
  width: 250px;
  height: 150px;
  /* background-color: rgb(252, 14, 6); */
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  /* display: flex;
  flex-direction: column; */
  z-index: 1;

    font-family: 'XiangJiaoGuiPuLingGanTi';
  .title {
    width: 100%;
    height: 30%;
    text-align: center;
    /* background-color: yellowgreen; */
    color: rgb(22, 169, 206);
    font-size: 44px;
    font-weight: 800;
  }

  .center-input {
    margin-top: 10px;
    --el-input-placeholder-color: rgb(255, 255, 255);
  }
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0);
}

:deep(.el-input__inner) {
  color: rgb(255, 253, 253);
  font-size: larger;
  font-family: 'huawenxingkai';
}

.bullet {
  width: 100%;
  height: 100%;
  /* background-repeat: repeat; */
  background-size: 100% 100%;
  color: rgba(255, 255, 255, 0.664);
  /* background-color: yellow; */
  box-shadow: -11px 10px 10px rgba(0, 0, 0, 0.356);
  /* font-family: 'huawenxingkai'; */
  /* padding-top: 40px; */
}

.scroll-to-top {
  display: inline-block;
  width: 8%;
  height: 80%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  color: white;
  border: none;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-radius: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
}
</style>

<!-- Attributes
参数	说明	类型	可选值	默认值
danmus	弹幕元素列表，支持纯文本或者自定义对象(支持 v-model)	Array	字符串或对象	[]
channels	轨道数量	Number		0
autoplay	是否自动播放	Boolean		true
useSlot	是否开启弹幕插槽	Boolean		false
loop	是否开启弹幕循环	Boolean		false
fontSize	弹幕字号（slot 模式下不可用）	Number		18
extraStyle	额外样式（slot 模式下不可用）	String		
speeds	弹幕速度（每秒移动的像素数）	Number		200
debounce	弹幕刷新频率(ms)	Number		100
randomChannel	随机选择轨道插入	Boolean		false
isSuspend	是否开启弹幕悬浮暂停（试验型功能）	Boolean		false
top	弹幕垂直间距(px)	Number		4
right	弹幕水平间距(px)	Number		 -->