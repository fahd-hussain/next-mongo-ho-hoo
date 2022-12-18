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
  email: string
  password: string
}

export interface IRegistrationPayloadProps {
  email: string
  password: string
}
