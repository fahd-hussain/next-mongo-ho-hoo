import { Form, Formik, FormikHelpers } from 'formik'
import { FC, KeyboardEvent } from 'react'
import { IRegistrationPayloadProps } from '../../../types/registration.types'
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
                >
                  Submit
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
