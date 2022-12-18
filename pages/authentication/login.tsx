import { FormikHelpers } from 'formik'
import { FC } from 'react'
import LoginForm from '../../components/forms/login/LoginForm.comp'
import { useLogin } from '../../hooks/useLogin.hook'
import { ILoginPayloadProps } from '../../types/authentication.types'

const LoginPage: FC<LoginPageProps> = () => {
  const [handleLogin, loading, error] = useLogin()

  const initialValues: ILoginPayloadProps = {
    email: 'fahd_hosen@outlook.com',
    password: 'Abcd1234!!',
  }

  const _handleLogin = (
    credential: ILoginPayloadProps,
    { resetForm }: FormikHelpers<ILoginPayloadProps>
  ) => {
    handleLogin(credential).finally(() => {
      resetForm()
    })
  }

  if (error) {
    return <>{error}</>
  }

  return (
    <LoginForm
      initialValues={initialValues}
      onSubmit={_handleLogin}
      isLoading={loading}
    />
  )
}

export default LoginPage

interface LoginPageProps {}
