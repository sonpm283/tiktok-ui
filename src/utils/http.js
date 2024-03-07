import axios from 'axios'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:3056/v1/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':
          '1ac62470f52c3100bb27032b56550d41ea933275db2b4636f5784064b53a8368b5dd3a52a1dc516c1d9726f0a2c46cca0bcb9b06f7470a2d6feeef79f33aee6f',
      },
    })
  }
}

const http = new Http().instance

export default http
