import { styled } from '@mui/material/styles'

export const DashboardContainer = styled('view')`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 90vh;

  margin-right: auto;
  margin-left: auto;

  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`
export const LayoutContent = styled('div')`
  display: flex;
  flex: 1;
`
export const PageContainer = styled('main')`
  padding: 20px;
  width: 80vw;
`
