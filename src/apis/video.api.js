import http from '~/utils/http'

const URL = '/getVideoList'

export const videoApi = {
  getVideoList: function (params) {
    return http.get(URL, { params })
  },
}
