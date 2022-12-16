import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FormikHelpers } from 'formik'
import { FC, useState } from 'react'
import RegistrationForm from '../../components/forms/registration/RegistrationForm.comp'
import { IRegistrationPayloadProps } from '../../types/registration.types'
const RegisterPage: FC<RegisterPageProps> = () => {
  const [error, setError] = useState<null | string>(null)

  const initialValues: IRegistrationPayloadProps = { email: '', password: '' }

  const auth = getAuth()

  const _handleRegister = (
    { email, password }: IRegistrationPayloadProps,
    { resetForm }: FormikHelpers<IRegistrationPayloadProps>
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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

  return (
    <RegistrationForm
      initialValues={initialValues}
      onSubmit={_handleRegister}
    />
  )
}

export default RegisterPage

interface RegisterPageProps {}
