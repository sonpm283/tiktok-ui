import http from '~/utils/httpClient'
const URL = '/user'

export const authApi = {
  register(body) {
    return http.post(`${URL}/signup`, body)
  },
  login(body) {
    return http.post(`${URL}/login`, body)
  },
  logout() {
    return http.post(`${URL}/logout`)
  },
  refreshToken(refreshToken) {
    return http.post(`${URL}/refresh-token`, { refreshToken })
  },
}
