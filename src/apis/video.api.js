import http from '~/utils/http'
const URL = '/videos'

export const videoApi = {
  getVideoList(params) {
    return http.get(URL, { params })
  },
  likeVideo(id) {
    return http.patch(`${URL}/${id}/like`)
  },
  unLikeVideo(id) {
    return http.patch(`${URL}/${id}/unlike`)
  },
}
