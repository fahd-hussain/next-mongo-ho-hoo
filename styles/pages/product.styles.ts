import { Box, List, ListItem } from '@mui/material'
import { css, styled } from '@mui/system'

export const ProductContainer = styled(Box)`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
`

export const ProductTableContainer = styled(Box)``

export const ProductHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ProductContent = styled(Box)<ProductContentInterface>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ loading }) =>
    loading &&
    css`
      box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.05);
    `}
`
interface ProductContentInterface {
  loading: number
}

export const ProductList = styled(List)``

export const ProductListItem = styled(ListItem)``
