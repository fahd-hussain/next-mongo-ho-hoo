import { Formik, FormikHelpers } from 'formik'
import { FC } from 'react'

import { SButton } from '../../../styles/components/SButton'
import {
  SForm,
  SFormContainer,
  SFormContent,
} from '../../../styles/components/SForm'
import { SInput } from '../../../styles/components/SInput'
import {
  ICategoryAddFormType,
  ICategoryEditFormType,
} from '../../../types/category.types'
import handleEnterKeyDown from '../../../utils/handleEnterKeyDown.util'
import { categoryFormValidationSchema } from './categoryForm.validation'

const CategoryForm: FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <SFormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={categoryFormValidationSchema}
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

export default CategoryForm

interface CategoryFormProps {
  initialValues: ICategoryAddFormType | ICategoryEditFormType
  onSubmit: (
    _values: ICategoryAddFormType | ICategoryEditFormType,
    _helpers: FormikHelpers<ICategoryAddFormType | ICategoryEditFormType>
  ) => void
}
