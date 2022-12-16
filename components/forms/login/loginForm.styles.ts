import { Box, Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  bodyBg,
  borderRadiusSm,
  gray900,
  primary,
  primaryLight,
  white,
} from '../../../constant/css-variables.const'

export const ALFContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(130deg, ${primaryLight}, ${primary});
  background: linear-gradient(130deg, ${primaryLight}, ${primary});
`
export const ALFInputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 2px 2px 20px 0px ${gray900};
  border-radius: ${borderRadiusSm};
  background-color: ${bodyBg};
`
export const ALFInputHeader = styled(Typography)`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: $black;
`

export const ALFInputBody = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  margin: 20px 0px;
`
export const ALFInput = styled(TextField)`
  margin-bottom: 20px;
`

export const ALFSubmitButton = styled(Button)`
  color: ${white};
  background-color: ${primary};
`
