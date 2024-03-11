import axios from 'axios'
import { toast } from 'react-toastify'
import { clearLocalStorage, getAccessToken, saveAccessToken, saveProfile } from './auth'
import path from './path'

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
      },
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Handle general errors that are not 422
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data
          this.accessToken = data.metadata.metadata.tokens.accessToken
          saveProfile(data.metadata.metadata.user)
          saveAccessToken(this.accessToken)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error) {
        if (error.response?.status !== 422) {
          const data = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      },
    )
  }
}

const http = new Http().instance

export default http
