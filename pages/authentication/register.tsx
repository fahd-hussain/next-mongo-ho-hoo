import { FormikHelpers } from 'formik'
import { FC } from 'react'
import RegistrationForm from '../../components/forms/registration/RegistrationForm.comp'
import { useRegister } from '../../hooks/useRegister.hook'
import { IRegistrationPayloadProps } from '../../types/authentication.types'

const RegisterPage: FC<RegisterPageProps> = () => {
  const initialValues: IRegistrationPayloadProps = {
    username: '',
    password: '',
  }
  const [handleRegister, loading, error] = useRegister()

  const _handleRegister = (
    credential: IRegistrationPayloadProps,
    { resetForm }: FormikHelpers<IRegistrationPayloadProps>
  ) => {
    handleRegister(credential).finally(() => resetForm())
  }

  if (error) {
    return <>{error}</>
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
