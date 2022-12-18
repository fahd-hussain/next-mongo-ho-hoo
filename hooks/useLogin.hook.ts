import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
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
  const auth = getAuth()
  const { replace } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['token'])

  const handleLogin = useCallback(
    async ({ email, password }: ILoginPayloadProps) => {
      setLoading(true)
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
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
          type: 'login',
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

  return [handleLogin, loading, error]
}
