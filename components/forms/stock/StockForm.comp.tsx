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
import { IProductInterface } from '../../../types/product.types'
import {
  IStockAddFormType,
  IStockEditFormType,
} from '../../../types/stock.types'
import { stockFormValidationSchema } from './stockForm.validation'

const StockForm: FC<StockFormProps> = ({ initialValues, onSubmit }) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useSWR(
    '/product?pageNumber=1&sortedBy=name&pageSize=100'
  )

  return (
    <SFormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={stockFormValidationSchema}
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
                name="unit"
                label="Unit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unit}
                error={Boolean(errors.unit && touched.unit)}
                autoFocus
                variant="filled"
              />
              <SInput
                name="unitPrice"
                label="Unit Price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitPrice}
                error={Boolean(errors.unitPrice && touched.unitPrice)}
                autoFocus
                variant="filled"
              />
              <SAutocomplete
                id="product"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.name === value.name
                }
                getOptionLabel={(option: any) => option.name}
                options={(data?.document as IProductInterface[]) ?? []}
                loading={isLoading}
                value={values.product ? values.product : null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
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
                onChange={(_event, value) => setFieldValue('product', value)}
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

export default StockForm

interface StockFormProps {
  initialValues: IStockAddFormType | IStockEditFormType
  onSubmit: (
    _values: IStockAddFormType | IStockEditFormType,
    _helpers: FormikHelpers<IStockAddFormType | IStockEditFormType>
  ) => void
}
