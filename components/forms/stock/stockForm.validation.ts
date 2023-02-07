import * as yup from 'yup'

export const stockFormValidationSchema = yup.object().shape({
  unit: yup.number().required("'Unit' can not be empty"),
  unitPrice: yup.number().required("'Unit Price' can not be empty"),
})
