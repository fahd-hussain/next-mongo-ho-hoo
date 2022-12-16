import { getAuth } from 'firebase/auth'
import { FormikHelpers } from 'formik'
import { FC } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import LoginForm from '../../components/forms/login/LoginForm.comp'
import { ILoginPayloadProps } from '../../types/login.types'

const LoginPage: FC<LoginPageProps> = () => {
  const initialValues: ILoginPayloadProps = { email: '', password: '' }

  const auth = getAuth()
  // eslint-disable-next-line no-unused-vars
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const _handleLogin = (
    { email, password }: ILoginPayloadProps,
    { resetForm }: FormikHelpers<ILoginPayloadProps>
  ) => {
    signInWithEmailAndPassword(email, password).finally(() => {
      resetForm()
    })
  }

  if (error) {
    return <>Error</>
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
