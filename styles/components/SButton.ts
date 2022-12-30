import { Button } from '@mui/material'
import { css, styled } from '@mui/system'
import { primary, white } from '../../constant/css-variables.const'

export const SButton = styled(Button)<SButtonProps>`
  color: ${white};
  background-color: ${primary};
  width: inherit;

  &:hover {
    color: ${primary};
    background-color: ${white};
  }

  ${({ loading }) =>
    loading
      ? css`
          color: ${primary};
          background: ${white};
        `
      : undefined}
`

interface SButtonProps {
  loading?: 1 | 0
}
