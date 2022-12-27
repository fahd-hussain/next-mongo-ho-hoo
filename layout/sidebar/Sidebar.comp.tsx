import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/DashboardTwoTone'
import LogoutIcon from '@mui/icons-material/LogoutTwoTone'
import { FC } from 'react'

import Link from 'next/link'
import { useLogout } from '../../hooks/useLogout.hook'
import {
  CloseSidebarIcon,
  OpenSidebarIcon,
  SidebarContainer,
  SidebarList,
  SidebarListItem,
} from './sidebar.styles'

const SideBar: FC<SideBarProps> = ({ hide, handleToggleSidebar }) => {
  const [handleLogout] = useLogout()

  return (
    <SidebarContainer hide={hide}>
      <SidebarList>
        {hide ? (
          <OpenSidebarIcon onClick={handleToggleSidebar} />
        ) : (
          <CloseSidebarIcon onClick={handleToggleSidebar} />
        )}
        <Link href="/application">
          <SidebarListItem>
            <DashboardIcon />
            <span>Dashboard</span>
          </SidebarListItem>
        </Link>
        <Link href="/application/category">
          <SidebarListItem>
            <CategoryIcon />
            <span>Category</span>
          </SidebarListItem>
        </Link>
      </SidebarList>

      <SidebarList>
        <SidebarListItem onClick={() => handleLogout()}>
          <LogoutIcon />
          Logout
        </SidebarListItem>
      </SidebarList>
    </SidebarContainer>
  )
}

export default SideBar

interface SideBarProps {
  hide: boolean
  handleToggleSidebar: () => void
}
