import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAuthContext } from './useAuthContext.hook'

export const useLogout = (): [() => Promise<any>, boolean, string | null] => {
  const [loading, setLoading] = useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState<string | null>(null)

  const { dispatch } = useAuthContext()
  const { replace } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  const handleLogout = async () => {
    setLoading(true)
    removeCookie('token')
    dispatch({ type: 'logout' })
    replace('authentication/login')
    setLoading(false)
  }

  return [handleLogout, loading, error]
}