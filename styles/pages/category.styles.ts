import { Box, List, ListItem } from '@mui/material'
import { css, styled } from '@mui/system'

export const CategoryContainer = styled(Box)`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
`

export const CategoryTableContainer = styled(Box)``

export const CategoryHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CategoryContent = styled(Box)<CategoryContentInterface>`
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
interface CategoryContentInterface {
  loading: number
}

export const CategoryList = styled(List)``

export const CategoryListItem = styled(ListItem)``
