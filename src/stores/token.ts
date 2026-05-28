import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref(localStorage.getItem('token') || '')

  function setToken(val: string) {
    token.value = val
    localStorage.setItem('token', val)
  }

  function removeToken() {
    token.value = ''
    localStorage.removeItem('token')
  }

  return { token, setToken, removeToken }
})
