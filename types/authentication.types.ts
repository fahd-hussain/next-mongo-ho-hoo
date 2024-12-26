export interface IAuthProviderType {
  children: any
}

export interface IAuthInitialStateType {
  isAuthenticated: boolean
  user: any | null
  token: string | null
}

export interface AuthContextType extends IAuthInitialStateType {
  dispatch: any
}

export interface ILoginPayloadProps {
  username: string
  password: string
}

export interface IRegistrationPayloadProps {
  username: string
  password: string
}
