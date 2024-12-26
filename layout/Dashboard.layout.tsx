import { FC, useState } from 'react'
import {
  DashboardContainer,
  LayoutContent,
  PageContainer,
} from './dashboard.styles'
import Footer from './footer/Footer.comp'
import Header from './header/Header.comp'
import SideBar from './sidebar/Sidebar.comp'

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [hide, setHide] = useState<boolean>(false)

  const _handleToggleSidebar = () => setHide((prevState) => !prevState)

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
