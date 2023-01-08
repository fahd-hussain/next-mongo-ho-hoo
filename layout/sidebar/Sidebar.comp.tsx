import { FC } from 'react'

import { useLogout } from '../../hooks/useLogout.hook'
import { SHeading } from '../../styles/components/SHeadings'
import { SLink } from '../../styles/components/SLink'
import {
  CategoriesIcon,
  CloseSidebarIcon,
  DashboardIcon,
  LogoutIcon,
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
        <SLink href="/">
          <SidebarListItem>
            <DashboardIcon />
            <SHeading hide={+hide} size="lg">
              Dashboard
            </SHeading>
          </SidebarListItem>
        </SLink>
        <SLink href="/category">
          <SidebarListItem>
            <CategoriesIcon />
            <SHeading hide={+hide} size="lg">
              Categories
            </SHeading>
          </SidebarListItem>
        </SLink>
        <SLink href="/product">
          <SidebarListItem>
            <CategoriesIcon />
            <SHeading hide={+hide} size="lg">
              Products
            </SHeading>
          </SidebarListItem>
        </SLink>
      </SidebarList>

      <SidebarList>
        <SidebarListItem onClick={() => handleLogout()}>
          <LogoutIcon />
          <SHeading hide={+hide} size="lg">
            Logout
          </SHeading>
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
