import commonAxios from '../common/axios.common'

export const getRequest = async (url: string) => {
  const response = await commonAxios.get(url)

  return response.data.success
    ? { document: response.data.data, pagination: response.data.pagination }
    : {}
}
