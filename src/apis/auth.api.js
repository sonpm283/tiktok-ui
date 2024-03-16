import http from '~/utils/http'
const URL = '/user'

export const authApi = {
  register: function (body) {
    return http.post(`${URL}/signup`, body)
  },
  login: function (body) {
    return http.post(`${URL}/login`, body)
  },
  logout: function () {
    return http.post(`${URL}/logout`)
  },
}
