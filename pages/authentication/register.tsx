import { getAuth } from 'firebase/auth'
import { FormikHelpers } from 'formik'
import { FC } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import RegistrationForm from '../../components/forms/registration/RegistrationForm.comp'
import { IRegistrationPayloadProps } from '../../types/registration.types'

const RegisterPage: FC<RegisterPageProps> = () => {
  const initialValues: IRegistrationPayloadProps = { email: '', password: '' }

  const auth = getAuth()
  // eslint-disable-next-line no-unused-vars
  const [createUserWithEmailAndPassword, _user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const _handleRegister = (
    { email, password }: IRegistrationPayloadProps,
    { resetForm }: FormikHelpers<IRegistrationPayloadProps>
  ) => {
    createUserWithEmailAndPassword(email, password).finally(() => resetForm())
  }

  if (error) {
    return <>Error</>
  }

  return (
    <RegistrationForm
      initialValues={initialValues}
      onSubmit={_handleRegister}
      isLoading={loading}
    />
  )
}

export default RegisterPage

interface RegisterPageProps {}
