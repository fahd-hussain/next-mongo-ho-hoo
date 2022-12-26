import axios from 'axios'

const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default commonAxios
