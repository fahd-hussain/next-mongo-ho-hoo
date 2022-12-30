import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { primary, white } from '../../constant/css-variables.const'

export const SButton = styled(Button)<SButtonProps>`
  color: ${white};
  background-color: ${primary};
  width: inherit;

  &:hover {
    color: ${primary};
    background-color: ${white};
  }

  ${({ isLoading }) =>
    isLoading &&
    `
    color: ${primary};
    background: ${white};
  `}
`

interface SButtonProps {
  isLoading?: boolean
}
