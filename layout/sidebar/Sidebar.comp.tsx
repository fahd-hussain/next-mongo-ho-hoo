import { getAuth } from 'firebase/auth'
import { useSignOut } from 'react-firebase-hooks/auth'

import DashboardIcon from '@mui/icons-material/DashboardTwoTone'
import LogoutIcon from '@mui/icons-material/LogoutTwoTone'
import { FC } from 'react'
import {
  CloseSidebarIcon,
  OpenSidebarIcon,
  SidebarContainer,
  SidebarList,
  SidebarListItem,
} from './sidebar.styles'

const SideBar: FC<SideBarProps> = ({ hide, handleToggleSidebar }) => {
  const auth = getAuth()
  const [signOut, loading, error] = useSignOut(auth)

  if (loading) {
    return <>Loading</>
  }

  if (error) {
    return <>Error</>
  }

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
          <LogoutIcon onClick={() => signOut()} />
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
