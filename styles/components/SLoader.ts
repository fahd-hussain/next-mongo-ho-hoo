import CircularProgress from '@mui/material/CircularProgress'
import styled from '@mui/system/styled'
import { primary } from '../../constant/css-variables.const'

export const SLoader = styled(CircularProgress)`
  color: ${primary};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
