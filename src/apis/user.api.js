import http from '~/utils/httpClient'
const URL = '/user'

export const userApi = {
  getUser() {
    return http.get(`${URL}/getUserList`)
  },

  getFollowingUser() {
    return http.get(`${URL}/getFollowingsUser`)
  },

  searchUser(name) {
    return http.get(`${URL}/search?name=${name}`)
  },

  getInfo(id) {
    return http.get(`${URL}/profile/${id}`)
  },

  follow(id) {
    return http.patch(`${URL}/${id}/follow`)
  },

  unFollow(id) {
    return http.patch(`${URL}/${id}/unfollow`)
  },
}
