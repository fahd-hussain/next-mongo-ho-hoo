import * as yup from 'yup'

export const loginFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required("'Email' can not be empty")
    .max(255, 'Must be 255 characters or less'),
  password: yup
    .string()
    .required("'Password' can not be empty")
    .min(8, 'The password is at least 8 characters long')
    .matches(/(?=.*[A-Z])/, 'The password has at least one uppercase letter')
    .matches(/(?=.*[a-z])/, 'The password has at least one lowercase letter')
    .matches(/(?=.*[0-9])/, 'The password has at least one digit')
    .matches(/[^A-Za-z0-9]/, 'The password has at least one special character'),
})
