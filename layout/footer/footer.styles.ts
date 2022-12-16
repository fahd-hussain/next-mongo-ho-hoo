import { styled } from '@mui/system'
import { black, bodyBg } from '../../constant/css-variables.const'

export const FooterContainer = styled('footer')`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${bodyBg};
  color: ${black};
`
