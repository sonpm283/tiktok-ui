import axios from 'axios'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3056/v1/api/',
      timeout: 10000,
    })
  }
}

const http = new Http().instance

export default http
