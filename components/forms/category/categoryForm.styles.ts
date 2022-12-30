import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form } from 'formik'
import { white } from '../../../constant/css-variables.const'

export const CFContainer = styled(Box)`
  background: ${white};
  padding: 20px;
  height: inherit;
`

export const CFForm = styled(Form)`
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CFFormContent = styled(Box)`
  height: inherit;
`

export const CFFromFooter = styled(Box)``
