import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
import commonAxios from '../common/axios.common'
import { ILoginPayloadProps } from '../types/authentication.types'
import { useAuthContext } from './useAuthContext.hook'

export const useLogin = (): [
  (_credentials: ILoginPayloadProps) => Promise<any>,
  boolean,
  string | null
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { dispatch } = useAuthContext()
  const { replace } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['token'])

  const handleLogin = useCallback(
    async (data: ILoginPayloadProps) => {
      setLoading(true)
      try {
        const response = await commonAxios.post('/authentication/login', data)
        if (response.data.success) {
          const token = response.data.token
          setCookie('token', JSON.stringify(response.data.token), {
            path: '/',
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          })
          dispatch({
            type: 'login',
            token,
          })
          replace('/')
        }
      } catch (error: any) {
        setError(error.message ? error.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return [handleLogin, loading, error]
}
