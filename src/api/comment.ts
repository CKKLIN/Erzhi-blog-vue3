const BASE = '/local-api/comments'

export function getCommentListAPI() {
  return fetch(BASE).then(res => res.json())
}

export function addCommentAPI(comment: { imageUrl: string; name: string; comment: string; good: boolean; createTime: string }) {
  return fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(res => res.json())
}

export function updateCommentAPI(comment: { id: number; [key: string]: any }) {
  return fetch(BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(res => res.json())
}
