import { styled } from '@mui/material/styles'
import { borderRadiusSm, gray400 } from '../constant/css-variables.const'

export const DashboardContainer = styled('view')`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // height: 100% - 100px;

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
  margin: 20px;
  height: auto;
  width: 100vw;
  border: 1px solid ${gray400};
  border-radius: ${borderRadiusSm};
`
