import { FC } from 'react'

import sidebarItems from '../../config/sidebarItems'
import { useLogout } from '../../hooks/useLogout.hook'
import { SHeading } from '../../styles/components/SHeadings'
import { SLink } from '../../styles/components/SLink'
import {
  CloseSidebarIcon,
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
        {sidebarItems.map(({ id, link, name, Icon }) => (
          <SLink href={link} key={id}>
            <SidebarListItem hide={+hide}>
              <Icon style={{ marginRight: '10px' }} />
              <SHeading hide={+hide} size="lg">
                {name}
              </SHeading>
            </SidebarListItem>
          </SLink>
        ))}
      </SidebarList>

      <SidebarList>
        <SidebarListItem onClick={() => handleLogout()} hide={+hide}>
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
