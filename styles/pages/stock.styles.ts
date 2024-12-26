import { Box, List, ListItem } from '@mui/material'
import { css, styled } from '@mui/system'

export const StockContainer = styled(Box)`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
`

export const StockTableContainer = styled(Box)``

export const StockHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StockContent = styled(Box)<StockContentInterface>`
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
interface StockContentInterface {
  loading: number
}

export const StockList = styled(List)``

export const StockListItem = styled(ListItem)``
