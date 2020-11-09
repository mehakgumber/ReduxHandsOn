export const serverName = 'http://localhost:8082'
export const baseUrl = '/api'
export const auth = '/auth'

export const fetchConfig = {
  method: 'post',
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrer: 'no-referrer',
  body: null
}
