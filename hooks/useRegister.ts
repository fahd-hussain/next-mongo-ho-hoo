import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
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
  const auth = getAuth()
  const { replace } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['token'])

  const handleRegister = useCallback(
    async ({ email, password }: IRegistrationPayloadProps) => {
      setLoading(true)
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const token = await userCredential.user.getIdToken()
        setCookie('token', JSON.stringify(token), {
          path: '/',
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        dispatch({
          type: 'register',
          token,
        })
        replace('/application')
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
