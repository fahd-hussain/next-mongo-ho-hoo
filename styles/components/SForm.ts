import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form } from 'formik'

import { white } from '../../constant/css-variables.const'

export const SFormContainer = styled(Box)`
  background: ${white};
  padding: 20px;
  height: inherit;
`

export const SForm = styled(Form)`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SFormContent = styled(Box)`
  height: inherit;
`

export const SFromFooter = styled(Box)``
