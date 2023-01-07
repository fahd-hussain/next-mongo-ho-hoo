import CategoryIcon from '@mui/icons-material/Category'
import Circle from '@mui/icons-material/Circle'
import DashboardTwoTone from '@mui/icons-material/DashboardTwoTone'
import FiberManualRecordTwoTone from '@mui/icons-material/FiberManualRecordTwoTone'
import LogoutTwoTone from '@mui/icons-material/LogoutTwoTone'
import { List, ListItem } from '@mui/material'
import { styled } from '@mui/system'
import {
  bodyBg,
  borderRadiusSm,
  gray400,
  gray900,
  primary,
  primaryDark,
  white,
} from '../../constant/css-variables.const'

export const SidebarContainer = styled('aside')<{ hide: boolean }>`
  margin: 20px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 2px 20px 0px ${gray400};
  border: 1px solid ${gray400};
  border-radius: ${borderRadiusSm};
  background-color: ${primary};
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${({ hide }) => (hide ? '5vw' : '20vw')};
`

export const SidebarList = styled(List)`
  height: inherit;
  padding: 20px;
`

export const SidebarListItem = styled(ListItem)`
  height: 46px;
  min-width: 46px;
  background: ${primary};
  color: ${bodyBg};

  &:hover {
    box-sizing: border-box;
    border: 2px solid ${primaryDark};
    box-shadow: 1px 1px 2px ${gray900};
    border-radius: ${borderRadiusSm};
  }
`

export const OpenSidebarIcon = styled(FiberManualRecordTwoTone)`
  color: ${white};
`

export const CloseSidebarIcon = styled(Circle)`
  color: ${white};
`

export const CategoriesIcon = styled(CategoryIcon)`
  margin-right: 10px;
`
export const DashboardIcon = styled(DashboardTwoTone)`
  margin-right: 10px;
`
export const LogoutIcon = styled(LogoutTwoTone)`
  margin-right: 10px;
`
