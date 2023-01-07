import * as yup from 'yup'

export const productFormValidationSchema = yup.object().shape({
  name: yup.string().required("'Product name' can not be empty"),
  description: yup.string(),
})
