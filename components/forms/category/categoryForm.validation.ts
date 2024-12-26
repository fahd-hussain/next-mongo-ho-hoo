import * as yup from 'yup'

export const categoryFormValidationSchema = yup.object().shape({
  name: yup.string().required("'Username' can not be empty"),
  description: yup.string(),
})
