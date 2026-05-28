import request from '@/utils/request'

export function loginAPI(data: { account: string; password: string; state: number; captcha: string }) {
  return request.post('/login', data)
}

export function registAPI(data: {
  account: string
  name: string
  state: number
  phone: string
  createTime: string
  sex: number
  imageUrl: string
  password: string
  checkPassword: string
}) {
  return request.post('/regist', data)
}

export function getCaptchaAPI() {
  return request.get('/captcha')
}
