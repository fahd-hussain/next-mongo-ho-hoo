import { Form, Formik, FormikHelpers } from 'formik'
import { FC, KeyboardEvent } from 'react'

import { SLoader } from '../../../styles/components/SLoader'
import { ILoginPayloadProps } from '../../../types/authentication.types'
import {
  ALFContainer,
  ALFInput,
  ALFInputBody,
  ALFInputContainer,
  ALFInputHeader,
  ALFSubmitButton,
} from './loginForm.styles'
import { loginFormValidationSchema } from './loginForm.validations'

const LoginForm: FC<LoginFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
}) => {
  const _handleEnterKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    handleSubmit: () => void
  ) => {
    const { key, shiftKey, altKey, ctrlKey } = event

    if (key === 'Enter' && !shiftKey && !altKey && !ctrlKey) {
      handleSubmit()
    }
  }

  return (
    <ALFContainer>
      <ALFInputContainer>
        <ALFInputHeader>Login</ALFInputHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={loginFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form>
              <ALFInputBody>
                <ALFInput
                  className="_login_form_body_input"
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={Boolean(errors.username && touched.username)}
                  helperText={
                    errors.username && touched.username ? errors.username : ''
                  }
                  autoFocus
                  variant="filled"
                />
                <ALFInput
                  className="_login_form_body_input"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    errors.password && touched.password ? errors.password : ''
                  }
                  type="password"
                  variant="filled"
                  onKeyDownCapture={(event) =>
                    _handleEnterKeyDown(event, handleSubmit)
                  }
                />
                <ALFSubmitButton
                  variant="outlined"
                  className="_Login_form_body_submit_btn"
                  onClick={() => handleSubmit()}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Submit{' '}
                  {isLoading ? (
                    <SLoader
                      size={20}
                      style={{
                        margin: '0px 20px',
                      }}
                    />
                  ) : null}
                </ALFSubmitButton>
              </ALFInputBody>
            </Form>
          )}
        </Formik>
      </ALFInputContainer>
    </ALFContainer>
  )
}

export default LoginForm

interface LoginFormProps {
  initialValues: ILoginPayloadProps
  onSubmit: (
    _values: ILoginPayloadProps,
    _helpers: FormikHelpers<ILoginPayloadProps>
  ) => void
  isLoading: boolean
}
