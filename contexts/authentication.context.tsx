import { FC, createContext, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie'

import {
  AuthContextType,
  IAuthInitialStateType,
  IAuthProviderType,
} from '../types/authentication.types'

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<IAuthProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  const [cookie] = useCookies(['token'])

  useEffect(() => {
    if (cookie.token) {
      dispatch({
        type: 'login',
        token: cookie.token,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

const authInitialState: IAuthInitialStateType = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authReducer = (state: IAuthInitialStateType, action: any) => {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
      }
    }
    case 'register': {
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
      }
    }
    case 'logout': {
      return { ...state, isAuthenticated: false, token: null }
    }
    default: {
      return state
    }
  }
}
