import { Formik, FormikHelpers } from 'formik'
import { FC, KeyboardEvent } from 'react'

import { SButton } from '../../../styles/components/SButton'
import {
  SForm,
  SFormContainer,
  SFormContent,
} from '../../../styles/components/SForm'
import { SInput } from '../../../styles/components/SInput'
import { SLoader } from '../../../styles/components/SLoader'
import { ILoginPayloadProps } from '../../../types/authentication.types'
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
    <SFormContainer>
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
          <SForm>
            <SFormContent>
              <SInput
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
              <SInput
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
            </SFormContent>
            <SButton
              variant="outlined"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              loading={+isLoading}
            >
              Login{' '}
              {isLoading ? (
                <SLoader
                  size={20}
                  style={{
                    margin: '0px 20px',
                  }}
                />
              ) : null}
            </SButton>
          </SForm>
        )}
      </Formik>
    </SFormContainer>
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
