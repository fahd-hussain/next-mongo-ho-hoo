import { Formik, FormikHelpers } from 'formik'
import { FC, useState } from 'react'
import useSWR from 'swr'

import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { SAutocomplete } from '../../../styles/components/SAutocomplete'
import { SButton } from '../../../styles/components/SButton'
import {
  SForm,
  SFormContainer,
  SFormContent,
} from '../../../styles/components/SForm'
import { SInput } from '../../../styles/components/SInput'
import { ICategoryInterface } from '../../../types/category.types'
import {
  IProductAddFormType,
  IProductEditFormType,
} from '../../../types/product.types'
import handleEnterKeyDown from '../../../utils/handleEnterKeyDown.util'
import { productFormValidationSchema } from './productForm.validation'

const ProductForm: FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useSWR(
    '/category?pageNumber=1&sortedBy=name&pageSize=100'
  )

  return (
    <SFormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={productFormValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <SForm>
            <SFormContent>
              <SInput
                name="name"
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={Boolean(errors.name && touched.name)}
                autoFocus
                variant="filled"
              />
              <SInput
                name="description"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={Boolean(errors.description && touched.description)}
                variant="filled"
                onKeyDownCapture={(event) =>
                  handleEnterKeyDown(event, handleSubmit)
                }
              />
              <SAutocomplete
                id="category"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option: any) => option.name}
                options={(data?.document as ICategoryInterface[]) ?? []}
                loading={isLoading}
                value={values.category ? values.category : null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                onChange={(_event, value) => {
                  console.log('EVENT')
                  setFieldValue('category', value)
                }}
              />
            </SFormContent>
            <SButton variant="outlined" onClick={() => handleSubmit()}>
              Submit
            </SButton>
          </SForm>
        )}
      </Formik>
    </SFormContainer>
  )
}

export default ProductForm

interface ProductFormProps {
  initialValues: IProductAddFormType | IProductEditFormType
  onSubmit: (
    _values: IProductAddFormType | IProductEditFormType,
    _helpers: FormikHelpers<IProductAddFormType | IProductEditFormType>
  ) => void
}
