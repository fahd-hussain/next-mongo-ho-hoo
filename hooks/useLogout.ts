import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAuthContext } from './useAuthContext.hook'

export const useLogout = (): [() => Promise<any>, boolean, string | null] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { dispatch } = useAuthContext()
  const auth = getAuth()
  const { replace } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  const handleLogout = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        removeCookie('token')
        dispatch({ type: 'logout' })
        replace('authentication/login')
      })
      .catch((error: any) => {
        setError(error.message ? error.message : 'Something went wrong')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return [handleLogout, loading, error]
}
