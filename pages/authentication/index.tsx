import { FormikHelpers } from 'formik'
import LoginForm from '../../components/forms/login/LoginForm.comp'
import { useLogin } from '../../hooks/useLogin.hook'
import { handleOpenForm } from '../../layout/Dashboard.layout'
import { SButton } from '../../styles/components/SButton'
import { AuthenticationContainer } from '../../styles/pages/authentication.styles'
import { ILoginPayloadProps } from '../../types/authentication.types'

const AuthenticationPage = () => {
  const [handleLogin, loading, error] = useLogin()

  const initialValues: ILoginPayloadProps = {
    username: 'fahd_hosen@outlook.com',
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

  const _handleOpenModal = () => {
    handleOpenForm({
      children: (
        <LoginForm
          initialValues={initialValues}
          onSubmit={_handleLogin}
          isLoading={loading}
        />
      ),
      heading: 'Login',
    })
  }

  if (error) {
    return <>{error}</>
  }

  return (
    <AuthenticationContainer>
      {error ? (
        error
      ) : (
        <SButton color_type="primary" onClick={_handleOpenModal}>
          Get started
        </SButton>
      )}
    </AuthenticationContainer>
  )
}

export default AuthenticationPage
