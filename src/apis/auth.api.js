import http from '~/utils/http'

export const authApi = {
  register: function (body) {
    return http.post('/user/signup', body)
  },
  login: function (body) {
    return http.post('/user/signin', body)
  },
  logout: function () {
    return http.post('user/logout')
  },
}
