import http from '~/utils/http'

export const videoApi = {
  getAll: function () {
    return http.get('/getAllVideo')
  },
}
