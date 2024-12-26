import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'

import commonAxios from '../common/axios.common'
import { IRegistrationPayloadProps } from '../types/authentication.types'
import { useAuthContext } from './useAuthContext.hook'

export const useRegister = (): [
  (_credentials: IRegistrationPayloadProps) => Promise<any>,
  boolean,
  string | null
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { dispatch } = useAuthContext()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['token'])

  const handleRegister = useCallback(
    async (data: IRegistrationPayloadProps) => {
      setLoading(true)
      try {
        const response = await commonAxios.post('/authentication/signup', data)
        if (response.data.success) {
          const token = response.data.token
          setCookie('token', JSON.stringify(token), {
            path: '/',
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          })
          dispatch({
            type: 'register',
            token,
          })
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

  return [handleRegister, loading, error]
}
