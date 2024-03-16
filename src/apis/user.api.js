import http from '~/utils/http'

const URL = '/user'

export const userApi = {
  searchUser: function (name) {
    return http.get(`${URL}/search?name=${name}`)
  },
}
