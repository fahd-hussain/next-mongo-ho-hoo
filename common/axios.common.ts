import axios from 'axios'

const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.NjM4MjgxOWYzMGQ5ZDMxNzUwYTQ0YTIx.HZNMNawDOTW3aBRT8mGbkrHYpo0Q1XWTQ3CAr5K8FhY',
  },
})

commonAxios.interceptors.request.use((config) => {
  // console.log('Config  -->  ', config)

  return config
})

commonAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/authentication'
    }
  }
)

export default commonAxios
