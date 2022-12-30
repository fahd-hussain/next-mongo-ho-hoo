import commonAxios from '../common/axios.common'

export const getRequest = async (url: string) => {
  const response = await commonAxios.get(url)

  return response.data.success
    ? { document: response.data.data, pagination: response.data.pagination }
    : {}
}

export const postRequest = async (url: string, body: any) => {
  const response = await commonAxios.post(url, body)

  return response.data.success ? { document: response.data.data } : {}
}
