import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FormikHelpers } from 'formik'
import { FC, useState } from 'react'
import LoginForm from '../../components/forms/login/LoginForm.comp'
import { ILoginPayloadProps } from '../../types/login.types'

const LoginPage: FC<LoginPageProps> = () => {
  const [error, setError] = useState<null | string>(null)

  const initialValues: ILoginPayloadProps = { email: '', password: '' }

  const auth = getAuth()

  const _handleLogin = (
    { email, password }: ILoginPayloadProps,
    { resetForm }: FormikHelpers<ILoginPayloadProps>
  ) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        // const errorCode = error.code
        const errorMessage = error.message
        setError(errorMessage)
      })
      .finally(() => {
        resetForm()
      })
  }

  return <LoginForm initialValues={initialValues} onSubmit={_handleLogin} />
}

export default LoginPage

interface LoginPageProps {}
