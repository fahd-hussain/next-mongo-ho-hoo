import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  bodyBg,
  borderRadiusSm,
  gray900,
  primary,
  primaryLight,
} from '../../../constant/css-variables.const'

export const ARFContainer = styled(Box)`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(130deg, ${primaryLight}, ${primary});
  background: linear-gradient(130deg, ${primaryLight}, ${primary});
`
export const ARFInputContainer = styled(Box)`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-shadow: 2px 2px 20px 0px ${gray900};
  border-radius: ${borderRadiusSm};
  background-color: ${bodyBg};
`
export const ARFInputHeader = styled(Typography)`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: $black;
`

export const ARFInputBody = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  margin: 20px 0px;
`
export const ARFInput = styled(TextField)`
  margin-bottom: 20px;
`
