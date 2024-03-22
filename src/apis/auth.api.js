import http from '~/utils/http'
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
  refreshToken(body) {
    return http.post(`${URL}/handleRefreshToken`, { body })
  },
}
