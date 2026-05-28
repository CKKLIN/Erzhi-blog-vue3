import request from '@/utils/request'

export function addPojoClassAPI(data: { name: string }) {
  return request.post('/pojoClass', data)
}

export function pageCountAPI(data: { userId: number | null; pageName: string }) {
  return request.post('/pageCount', data)
}
