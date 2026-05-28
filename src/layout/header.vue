<template>
  <div class="header">
    <div class="header-left">
      <!-- <div class="left-two">
        <div v-for="item in menuList" :key="item.name" class="menuList">
          <div class="menu" @click="handlePath(item.path, item.name)" :class="{ active: index === item.name }">{{ item.title }}</div>
        </div>
      </div> -->
    </div>
    <div class="header-right">
      <div class="menuList">
                <div v-for="item in menuList" :key="item.name" >
                  <div class="menu">
               <img class="menuIcon" :src="item.icon" />
          <div  @click="handlePath(item.path, item.name)" :class="{ active: index === item.name }">{{ item.title }}</div>
       
                    </div>
    </div>
      </div>
        <el-dropdown>

      <el-image class="avatar" :src="user.avatarUrl" />
    <template #dropdown>
      <el-dropdown-menu class="backLogin">
        <el-dropdown-item class="backLogin" style="padding: 0px;">
          
      <div  @click="backLogin">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import useCounter from '@/stores/pinia'
import { pageCountAPI } from '@/api/page'
import dijia from '@/assets/picture/dijia.jpg'
import homeIcon from '@/assets/icon/home.svg'
import chatIcon from '@/assets/icon/chat.svg'
import noteIcon from '@/assets/icon/note.svg'

const counterStore = useCounter()
const tokenStore = useTokenStore()
const router = useRouter()
const route = useRoute()
const index = ref()

const user = ref({
  id: null,
  userName: '',
  avatarUrl: dijia,
})

const menuList = ref([
  { path: '/home', name: 'home', title: '首页',icon:homeIcon },
  { path: '/chat', name: 'chat', title: '论坛',icon:chatIcon},
  { path: '/note', name: 'note', title: '留言',icon:noteIcon},
])

counterStore.userId = user.value.id

const backLogin = () => {
  router.push('/')
  counterStore.jwt = ''
  counterStore.userId = null
  tokenStore.removeToken()
}

const handlePath = async (path, pageName) => {
  counterStore.index = pageName
  router.push(path)
  if (route.path !== path) {
    await pageCountAPI({ userId: user.value.id, pageName })
  }
}

onMounted(() => {
  index.value = 'home'
})
</script>

<style scoped>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: goldenrod; */
}
.header,
.header :deep(*) {
  font-family: 'YuWoErYanNiZuiKeAi-2' !important;
  color: white;
}
.header:hover {
  background-color: rgba(93, 94, 95, 0.13);
}
.header-left {
  margin-left: 2%;
  display: flex;
  flex-direction: row;
}
.left-two {
  display: flex;
  flex-direction: row;
}
.menuList {
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* height: 1em; */
  width: fit-content;
  /* background-color: red; */
  font-size: larger;
  /* margin: 0 6px 6px 6px; */
  margin-right:10px;
  cursor: pointer;
}
.menuIcon {
  width: 22px;
  aspect-ratio: 1 / 1;
  margin-right: 4px;
}
.menu {
/* width: fit-content;
height: fit-content; */
display: flex;
flex-direction:row;
/* box-shadow: -2px 3px 10px rgba(0, 0, 0, 0.356); */
  border-radius: 3px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  align-items:center;
}
.menu.active {
  /* box-shadow: 2px -3px 10px rgba(0, 0, 0, 0.356); */
  /* background-color: rgba(217, 219, 221, 0.735); */
}
.header-right {
  position: relative;
  /* float: right; */
  height: 100%;
  width: fit-content;
  /* min-width: 150px; */
  text-align: right;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* background-color: red; */
  margin:0.3% 2% 0.3% 1%;
  /* margin-top: 1%; */
}
.backLogin {
  font-size: smaller;
  cursor: pointer;
  box-shadow: -2px 3px 10px rgba(0, 0, 0, 0.356);
  border-radius: 3px;
  /* margin-left: 30px; */
  padding: 0px;
  margin:0px;
}
:deep(.el-dropdown-menu__item){
  padding: 2px 3px;
}
.backLogin:hover {
  box-shadow: 2px -3px 10px rgba(0, 0, 0, 0.356);
}
.avatar {
  border-radius: 50%;
  height: 37px;
  aspect-ratio: 1 / 1;
  /* margin: 1% 13% 1% 0; */
  background-color: yellowgreen;
}
</style>
