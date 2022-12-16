import { Form, Formik, FormikHelpers } from 'formik'
import { FC, KeyboardEvent } from 'react'
import { ILoginPayloadProps } from '../../../types/login.types'
import {
  ALFContainer,
  ALFInput,
  ALFInputBody,
  ALFInputContainer,
  ALFInputHeader,
  ALFSubmitButton,
} from './loginForm.styles'
import { loginFormValidationSchema } from './loginForm.validations'

const LoginForm: FC<LoginFormProps> = ({ initialValues, onSubmit }) => {
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
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(errors.email && touched.email)}
                  helperText={errors.email && touched.email ? errors.email : ''}
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
                >
                  Submit
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
}
