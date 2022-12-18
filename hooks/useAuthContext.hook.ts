import { useContext } from 'react'
import { AuthContext } from '../contexts/authentication.context'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('AuthContext out of scope!')
  }

  return context
}
