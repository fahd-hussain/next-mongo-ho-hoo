import { Button } from '@mui/material'
import { css, styled } from '@mui/system'
import {
  danger,
  primary,
  warning,
  white,
} from '../../constant/css-variables.const'

export const SButton = styled(Button)<SButtonProps>`
  color: ${white};
  background: ${({ color_type }) => _handleBGColor(color_type)};
  width: inherit;

  &:hover {
    color: ${({ color_type }) => _handleBGColor(color_type)};
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
  loading?: number
  color_type?: 'primary' | 'warning' | 'danger'
}

const _handleBGColor = (color_type?: 'primary' | 'warning' | 'danger') => {
  switch (color_type) {
    case 'primary':
      return primary
    case 'warning':
      return warning
    case 'danger':
      return danger
    default:
      return primary
  }
}
