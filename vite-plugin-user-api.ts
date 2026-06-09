import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const DATA_FILE = path.resolve(__dirname, 'src/assets/linshi/data/users.json')
const COMMENT_FILE = path.resolve(__dirname, 'src/assets/linshi/data/comments.json')

function readUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
}

function writeUsers(data: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4) + '\n', 'utf-8')
}

function readComments() {
  return JSON.parse(fs.readFileSync(COMMENT_FILE, 'utf-8'))
}

function writeComments(data: any[]) {
  fs.writeFileSync(COMMENT_FILE, JSON.stringify(data, null, 4) + '\n', 'utf-8')
}

export default function localApiPlugin(): Plugin {
  return {
    name: 'local-user-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // --- comments API ---
        if (req.url?.startsWith('/local-api/comments')) {
          if (req.method === 'GET' && req.url === '/local-api/comments') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(readComments()))
            return
          }

          if (req.method === 'POST' && req.url === '/local-api/comments') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              const comments = readComments()
              const newComment = JSON.parse(body)
              newComment.id = comments.length > 0 ? Math.max(...comments.map((c: any) => c.id)) + 1 : 1
              comments.push(newComment)
              writeComments(comments)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, comment: newComment }))
            })
            return
          }

          if (req.method === 'PUT' && req.url === '/local-api/comments') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              const updated = JSON.parse(body)
              const comments = readComments()
              const idx = comments.findIndex((c: any) => c.id === updated.id)
              if (idx > -1) {
                comments[idx] = { ...comments[idx], ...updated }
                writeComments(comments)
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true }))
              } else {
                res.statusCode = 404
                res.end(JSON.stringify({ success: false, msg: '评论不存在' }))
              }
            })
            return
          }
        }

        // --- users API ---
        if (!req.url?.startsWith('/local-api/users')) return next()

        // GET /local-api/users
        if (req.method === 'GET' && req.url === '/local-api/users') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(readUsers()))
          return
        }

        // POST /local-api/users (register)
        if (req.method === 'POST' && req.url === '/local-api/users') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            const newUser = JSON.parse(body)
            const users: any[] = readUsers()
            const id = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1
            newUser.id = id
            users.push(newUser)
            writeUsers(users)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, id, user: newUser }))
          })
          return
        }

        // PUT /local-api/users (update collectList etc.)
        if (req.method === 'PUT' && req.url === '/local-api/users') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            const updated = JSON.parse(body)
            const users = readUsers()
            const idx = users.findIndex((u: any) => u.id === updated.id)
            if (idx > -1) {
              users[idx] = { ...users[idx], ...updated }
              writeUsers(users)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } else {
              res.statusCode = 404
              res.end(JSON.stringify({ success: false, msg: '用户不存在' }))
            }
          })
          return
        }

        next()
      })
    }
  }
}
