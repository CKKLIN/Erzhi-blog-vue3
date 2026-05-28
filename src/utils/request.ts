import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import useCounter from '@/stores/pinia'
import router from '@/router'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const tokenStore = useTokenStore()
  if (tokenStore.token) {
    config.headers.Authorization = tokenStore.token
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const counterStore = useCounter()
    if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录!')
      router.push('/')
      const tokenStore = useTokenStore()
      counterStore.jwt = ''
      counterStore.userId = null
      tokenStore.removeToken()
    } else {
      ElMessage.error('服务异常')
    }
    return Promise.reject(error)
  },
)

export default instance
