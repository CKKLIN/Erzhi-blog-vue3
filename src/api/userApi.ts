const BASE = '/local-api/users'

export async function fetchUsers() {
    const res = await fetch(BASE)
    return res.json()
}

export async function registerUser(data: { name: string; password: string; level: number; role: number; collectList: any[] }) {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}

export async function updateUser(data: any) {
    const res = await fetch(BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}
