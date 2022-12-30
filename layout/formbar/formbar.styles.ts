import { Box } from '@mui/material'
import { styled } from '@mui/system'
import {
  borderRadiusSm,
  gray400,
  white,
} from '../../constant/css-variables.const'

export const FormBarBody = styled(Box)<{ open: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  box-shadow: 2px 2px 20px 0px ${gray400};
  border: 1px solid ${gray400};
  border-radius: ${borderRadiusSm};
  background-color: ${white};
  height: 100vh;
  transition: 0.3s ease-in-out;

  // left + width = 100vw
  width: 0vw;
  left: 100vw;

  ${({ open }) =>
    open &&
    `
    width: 30vw;
    left: 70vw;
    
`}
`

export const FormBarContainer = styled(Box)`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`

export const FormBarHeader = styled(Box)`
  display: flex;
`
