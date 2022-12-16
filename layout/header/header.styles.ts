import { styled } from '@mui/system'
import { bodyBg, gray800 } from '../../constant/css-variables.const'

export const HeaderContainer = styled('header')`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;

  background-color: ${bodyBg};
  color: ${gray800};
`
