import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

import { useAuthContext } from '../hooks/useAuthContext.hook'
import {
  DashboardContainer,
  LayoutContent,
  PageContainer,
} from './dashboard.styles'

const Footer = dynamic(() => import('./footer/Footer.comp'))
const Header = dynamic(() => import('./header/Header.comp'))
const SideBar = dynamic(() => import('./sidebar/Sidebar.comp'))

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const [hide, setHide] = useState<boolean>(false)

  const _handleToggleSidebar = () => setHide((prevState) => !prevState)

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <DashboardContainer>
      <Header />
      <LayoutContent>
        <SideBar hide={hide} handleToggleSidebar={_handleToggleSidebar} />
        <PageContainer>{children}</PageContainer>
      </LayoutContent>
      <Footer />
    </DashboardContainer>
  )
}

export default DashboardLayout

interface DashboardLayoutProps {
  children?: React.ReactNode
}
