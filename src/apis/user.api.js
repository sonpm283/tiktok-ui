import http from '~/utils/http'
const URL = '/user'

export const userApi = {
  getUser() {
    return http.get(`${URL}/getUserList`)
  },

  searchUser(name) {
    return http.get(`${URL}/search?name=${name}`)
  },

  getInfo(id) {
    return http.get(`${URL}/profile/${id}`)
  },
}
