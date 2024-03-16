import http from '~/utils/http'

const URL = '/videos'

export const videoApi = {
  getVideoList: function (params) {
    return http.get(URL, { params })
  },
  likeVideo: function (id) {
    return http.patch(`${URL}/${id}/like`)
  },
  unlikeVideo: function (id) {
    return http.patch(`${URL}/${id}/unlike`)
  },
}
