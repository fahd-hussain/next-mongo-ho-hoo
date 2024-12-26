import commonAxios from '../common/axios.common'
import { IResponseInterface } from '../types/response.types'

export async function getRequest<T>(
  url: string
): Promise<IResponseInterface<T>> {
  const response = await commonAxios.get(url)

  return response.data.success
    ? { document: response.data.data, pagination: response.data.pagination }
    : { document: [], pagination: {} }
}

export async function postRequest<T>(url: string, body: any): Promise<T> {
  const response = await commonAxios.post(url, body)

  return response.data.success ? response.data.data : {}
}

export async function patchRequest<T>(url: string, body: any): Promise<T> {
  const response = await commonAxios.patch(url, body)

  return response.data.success ? response.data.data : {}
}

export async function deleteRequest<T>(url: string): Promise<T> {
  const response = await commonAxios.delete(url)

  return response.data.success ? response.data.data : {}
}
