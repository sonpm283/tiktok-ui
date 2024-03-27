import http from '~/utils/httpClient'
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
  upload(body) {
    return http.post(`${URL}/upload`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getVideoByUserId(id) {
    return http.get(`${URL}/getByUserId/${id}`)
  },
}
