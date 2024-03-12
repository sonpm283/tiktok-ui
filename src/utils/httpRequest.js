import axios from 'axios'

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
})

export const get = async (url) => {
  const response = await httpRequest.get(url)
  return response.data
}
