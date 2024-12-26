import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { primary, primaryLight } from '../../constant/css-variables.const'

export const AuthenticationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: -webkit-linear-gradient(130deg, ${primaryLight}, ${primary});
  background: linear-gradient(130deg, ${primaryLight}, ${primary});
`
