import DashboardIcon from '@mui/icons-material/DashboardTwoTone'
import LogoutIcon from '@mui/icons-material/LogoutTwoTone'
import { FC } from 'react'
import { useLogout } from '../../hooks/useLogout'
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
        <SidebarListItem>
          <DashboardIcon />
        </SidebarListItem>
      </SidebarList>

      <SidebarList>
        <SidebarListItem>
          <LogoutIcon onClick={() => handleLogout()} />
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
