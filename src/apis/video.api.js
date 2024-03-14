import http from '~/utils/http'

const URL = '/videos'

export const videoApi = {
  getVideoList: function (params) {
    return http.get(URL, { params })
  },
}
