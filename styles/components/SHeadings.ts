import { Typography } from '@mui/material'
import { styled } from '@mui/system'

export const SHeading = styled(Typography)<SHeadingInterface>`
  display: block;
  width: 100%;

  ${({ xl }) =>
    xl &&
    `
  font-size: 2em;
`}
`

interface SHeadingInterface {
  xl?: boolean
}
// h2?: any
// h3?: any
// h4?: any
// h5?: any
// h6?: any

// ${({ h2 }) =>
//       h2 &&
//       css`
//         font-size: 1.5em;
//       `}
//     ${({ h3 }) =>
//       h3 &&
//       css`
//         font-size: 1.17em;
//       `}
//     ${({ h4 }) =>
//       h4 &&
//       css`
//         font-size: 1em;
//       `}
//     ${({ h5 }) =>
//       h5 &&
//       css`
//         font-size: 0.83em;
//       `}
//     ${({ h6 }) =>
//       h6 &&
//       css`
//         font-size: 0.67em;
//       `};
