import axios from 'axios'
import { toast } from 'react-toastify'
import {
  clearLocalStorage,
  getAccessToken,
  getRefreshToken,
  getUserId,
  saveAccessToken,
  saveProfile,
  saveRefreshToken,
  saveUserId,
} from './auth'
import path from './path'
import { authApi } from '~/apis/auth.api'

class Http {
  accessToken = null
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3056/v1/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':
          '95ffa88e0a184f375265db265d4a4d214f75eea5cf0c69243fee43e77b0e6b8ceed7dadf757efe929e2371980ccd037c850ddf88117d2ec88ddbf79083c0fd72',
        // '81f76b00d3cf9ac9037860b6e3a4e44239d7cf1f38b38561ebd6b0ff1d57c42062de154df0e0b3aa3cb272cbc78ed41a643bb25436a835b5a655e84f3ee71690',
      },
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers['x-client-id'] = getUserId()
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data
          this.accessToken = data.metadata.metadata.tokens.accessToken
          this.refreshToken = data.metadata.metadata.tokens.refreshToken
          saveProfile(data.metadata.metadata.user)
          saveAccessToken(this.accessToken)
          saveRefreshToken(this.refreshToken)
          saveUserId(data.metadata.metadata.user._id)
        } else if (url === path.logout) {
          this.accessToken = ''
          this.userId = ''
          clearLocalStorage()
        }
        return response
      },
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshTokenFromLocalStorage = getRefreshToken()
            const response =
              refreshTokenFromLocalStorage &&
              (await authApi.refreshToken(refreshTokenFromLocalStorage))
            const { accessToken, refreshToken } = response.data.metadata.newTokens
            saveAccessToken(accessToken)
            saveRefreshToken(refreshToken)
            // Retry the original request with the new token
            originalRequest.headers.Authorization = accessToken

            // console.log('acc::::', accessToken)
            // console.log('ref::::', refreshToken)
            return axios(originalRequest)
          } catch (error) {
            // Handle refresh token error or redirect to login
          }
        }

        const data = error.response?.data
        const message = data.message || error.message
        toast.error(message)
        return Promise.reject(error)
      },
    )
  }
}

const http = new Http().instance

export default http
