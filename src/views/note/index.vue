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
        <template v-slot:danmu="{ index, danmu }">
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
import vueDanmaku from 'vue-danmaku'
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
    { id: 1, imageUrl: 'https://picsum.photos/seed/1/100/100', name: "二隔热隔热给", comment: "博主写得太好了，已三连支持！", good: true, createTime: "2023-05-05 09:09:09" },
    { id: 2, imageUrl: 'https://picsum.photos/seed/2/100/100', name: "深夜码农", comment: "凌晨两点看到这篇博客，简直是我的救命稻草。", good: true, createTime: "2023-05-05 10:15:30" },
    { id: 3, imageUrl: 'https://picsum.photos/seed/3/100/100', name: "全栈探索者", comment: "终于搞懂了这个概念，博主解释得比官方文档还清楚！", good: true, createTime: "2023-05-05 11:20:12" },
    { id: 4, imageUrl: 'https://picsum.photos/seed/4/100/100', name: "前端小学生", comment: "请问一下，这里为什么要用 watch 而不是 computed 呢？", good: false, createTime: "2023-05-05 11:25:45" },
    { id: 5, imageUrl: 'https://picsum.photos/seed/5/100/100', name: "Bug终结者", comment: "按照你的方法试了一下，果然完美解决了我的问题。", good: true, createTime: "2023-05-05 14:00:00" },
    { id: 6, imageUrl: 'https://picsum.photos/seed/6/100/100', name: "设计小美", comment: "这个博客的排版和配色看着真舒服，用的什么主题呀？", good: true, createTime: "2023-05-05 15:30:22" },
    { id: 7, imageUrl: 'https://picsum.photos/seed/7/100/100', name: "代码搬运工", comment: "收藏了！下次面试前就靠这篇文章复习了。", good: true, createTime: "2023-05-05 16:00:00" },
    { id: 8, imageUrl: 'https://picsum.photos/seed/8/100/100', name: "摸鱼冠军", comment: "上班摸鱼看技术博客，老板以为我在认真工作哈哈。", good: true, createTime: "2023-05-05 16:10:00" },
    { id: 9, imageUrl: 'https://picsum.photos/seed/9/100/100', name: "Vue爱好者", comment: "Vue3 的组合式 API 确实让逻辑复用变得更优雅了。", good: true, createTime: "2023-05-05 16:20:00" },
    { id: 10, imageUrl: 'https://picsum.photos/seed/10/100/100', name: "React信徒", comment: "虽然我是 React 用户，但这篇博客的思路值得借鉴。", good: true, createTime: "2023-05-05 16:30:00" },
    { id: 11, imageUrl: 'https://picsum.photos/seed/11/100/100', name: "后端大叔", comment: "前端现在发展太快了，感觉有点跟不上了...", good: false, createTime: "2023-05-05 16:40:00" },
    { id: 12, imageUrl: 'https://picsum.photos/seed/12/100/100', name: "运维小哥", comment: "博主有没有考虑过写一篇关于 Docker 部署的文章？", good: false, createTime: "2023-05-05 16:50:00" },
    { id: 13, imageUrl: 'https://picsum.photos/seed/13/100/100', name: "UI设计师", comment: "动效演示很丝滑，是用 GSAP 做的吗？", good: true, createTime: "2023-05-05 17:00:00" },
    { id: 14, imageUrl: 'https://picsum.photos/seed/14/100/100', name: "实习生小李", comment: "刚入职的小白，看了这篇博客豁然开朗，感谢博主！", good: true, createTime: "2023-05-05 17:10:00" },
    { id: 15, imageUrl: 'https://picsum.photos/seed/15/100/100', name: "架构师老王", comment: "整体思路没问题，不过在生产环境要注意性能优化。", good: true, createTime: "2023-05-05 17:20:00" },
    { id: 16, imageUrl: 'https://picsum.photos/seed/16/100/100', name: "TypeScript粉", comment: "强烈建议博主加上 TypeScript 的类型定义示例。", good: true, createTime: "2023-05-05 17:30:00" },
    { id: 17, imageUrl: 'https://picsum.photos/seed/17/100/100', name: "Node.js玩家", comment: "后端接口也是你写的吗？想请教一下 JWT 认证的问题。", good: false, createTime: "2023-05-05 17:40:00" },
    { id: 18, imageUrl: 'https://picsum.photos/seed/18/100/100', name: "产品经理阿强", comment: "这个功能我们产品也想做，转发给开发看看。", good: true, createTime: "2023-05-05 17:50:00" },
    { id: 19, imageUrl: 'https://picsum.photos/seed/19/100/100', name: "CSS魔法师", comment: "Tailwind CSS 配合 Vue 真的太香了，强烈推荐。", good: true, createTime: "2023-05-05 18:00:00" },
    { id: 20, imageUrl: 'https://picsum.photos/seed/20/100/100', name: "测试工程师", comment: "边界情况处理得很到位，点赞。", good: true, createTime: "2023-05-05 18:10:00" },
    { id: 21, imageUrl: 'https://picsum.photos/seed/21/100/100', name: "Git高手", comment: "代码规范写得很好，建议开源到 GitHub。", good: true, createTime: "2023-05-05 18:20:00" },
    { id: 22, imageUrl: 'https://picsum.photos/seed/22/100/100', name: "Vite拥护者", comment: "Vite 的开发体验真的吊打 Webpack，谁用谁知道。", good: true, createTime: "2023-05-05 18:30:00" },
    { id: 23, imageUrl: 'https://picsum.photos/seed/23/100/100', name: "Webpack老兵", comment: "Webpack 配置虽然复杂，但灵活性还是很高的。", good: true, createTime: "2023-05-05 18:40:00" },
    { id: 24, imageUrl: 'https://picsum.photos/seed/24/100/100', name: "数据库专家", comment: "数据持久化这块可以考虑用 IndexedDB。", good: true, createTime: "2023-05-05 18:50:00" },
    { id: 25, imageUrl: 'https://picsum.photos/seed/25/100/100', name: "安全卫士", comment: "XSS 防护做了吗？记得对输入内容做转义处理哦。", good: true, createTime: "2023-05-05 19:00:00" },
    { id: 26, imageUrl: 'https://picsum.photos/seed/26/100/100', name: "性能优化师", comment: "首屏加载时间可以再用 Lighthouse 测一下。", good: true, createTime: "2023-05-05 19:10:00" },
    { id: 27, imageUrl: 'https://picsum.photos/seed/27/100/100', name: "PWA粉丝", comment: "如果能做成 PWA 就更棒了，离线也能访问。", good: true, createTime: "2023-05-05 19:20:00" },
    { id: 28, imageUrl: 'https://picsum.photos/seed/28/100/100', name: "SEO专员", comment: "SSR 渲染对 SEO 更友好，可以考虑 Nuxt。", good: true, createTime: "2023-05-05 19:30:00" },
    { id: 29, imageUrl: 'https://picsum.photos/seed/29/100/100', name: "微前端探索者", comment: "qiankun 微前端方案有了解过吗？", good: false, createTime: "2023-05-05 19:40:00" },
    { id: 30, imageUrl: 'https://picsum.photos/seed/30/100/100', name: "组件库作者", comment: "封装得不错，可以考虑发布到 npm。", good: true, createTime: "2023-05-05 19:50:00" },
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
  top: 50px;
  left: 0;
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
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
font-family: 'YuWoErYanNiZuiKeAi-2';
}

.container {
  width: 100%;
  height: calc(100% - 0px);
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
  z-index: 9999;

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
  box-shadow: -11px 10px 10px var(--color-shadow);
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