import { Form, Formik, FormikHelpers } from 'formik'
import { FC, KeyboardEvent } from 'react'
import { SLoader } from '../../../styles/components/SLoader'
import { IRegistrationPayloadProps } from '../../../types/authentication.types'
import {
  ARFContainer,
  ARFInput,
  ARFInputBody,
  ARFInputContainer,
  ARFInputHeader,
  ARFSubmitButton,
} from './registrationForm.styles'
import { registrationFormValidationSchema } from './registrationForm.validations'

const RegistrationForm: FC<RegistrationFormProps> = ({
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
    <ARFContainer>
      <ARFInputContainer>
        <ARFInputHeader>Register</ARFInputHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationFormValidationSchema}
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
              <ARFInputBody>
                <ARFInput
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
                <ARFInput
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
                <ARFSubmitButton
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
                </ARFSubmitButton>
              </ARFInputBody>
            </Form>
          )}
        </Formik>
      </ARFInputContainer>
    </ARFContainer>
  )
}

export default RegistrationForm

interface RegistrationFormProps {
  initialValues: IRegistrationPayloadProps
  onSubmit: (
    _values: IRegistrationPayloadProps,
    _helpers: FormikHelpers<IRegistrationPayloadProps>
  ) => void
  isLoading: boolean
}
