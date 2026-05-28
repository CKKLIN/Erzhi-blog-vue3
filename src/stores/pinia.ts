import { defineStore } from 'pinia'

const useCounter = defineStore('counter', {
  state: () => ({
    jwt: '',
    userId: null as number | null,
  }),
  actions: {},
})

export default useCounter

export function parseJwt(token: string) {
  try {
    if (!token) return null
    const base64Url = token.split('.')[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const cleanedBase64 = base64.replace(/[^A-Za-z0-9+/=]/g, '')
    const paddingLength = (4 - (cleanedBase64.length % 4)) % 4
    const paddedBase64 = cleanedBase64 + '='.repeat(paddingLength)

    const binaryString = window.atob(paddedBase64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return JSON.parse(new TextDecoder('utf-8').decode(bytes))
  } catch {
    return null
  }
}
