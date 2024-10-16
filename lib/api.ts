import axios from 'axios'

const baseURL = process.env.BACKEND_BASE_URL

export const apiInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
