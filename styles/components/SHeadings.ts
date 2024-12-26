import { Typography } from '@mui/material'
import { styled } from '@mui/system'

export const SHeading = styled(Typography)<SHeadingInterface>`
  width: 100%;
  transition: 0.3s ease-in-out;
  font-size: ${({ size }) => _handleFontSize(size)};
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`

interface SHeadingInterface {
  size?: 'xxl' | 'xl' | 'lg' | 'sm' | 'xs' | 'xxs'
  hide?: number
}

const _handleFontSize = (size?: 'xxl' | 'xl' | 'lg' | 'sm' | 'xs' | 'xxs') => {
  switch (size) {
    case 'xxl':
      return '2em'
    case 'xl':
      return '1.5em'
    case 'lg':
      return '1.17em'
    case 'sm':
      return '1em'
    case 'xs':
      return '0.83em'
    case 'xxs':
      return '0.67em'
    default:
      return '2em'
  }
}
