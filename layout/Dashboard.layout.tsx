import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { useAuthContext } from '../hooks/useAuthContext.hook'
import { IModalInitialStateInterface } from '../types/formBar.types'
import {
  DashboardContainer,
  LayoutContent,
  PageContainer,
} from './dashboard.styles'
import FormBar, { FormBarRefInterface } from './formbar/Formbar.comp'

const Footer = dynamic(() => import('./footer/Footer.comp'))
const Header = dynamic(() => import('./header/Header.comp'))
const SideBar = dynamic(() => import('./sidebar/Sidebar.comp'))

let cFormBarRef: FormBarRefInterface | null = null

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const [hide, setHide] = useState<boolean>(false)

  const { pathname } = useRouter()

  const _handleToggleSidebar = () => setHide((prevState) => !prevState)

  if (!isAuthenticated || pathname.includes('/authentication')) {
    return (
      <DashboardContainer>
        {children}
        <FormBar ref={(ref) => (cFormBarRef = ref)} />
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <Header />
      <LayoutContent>
        <SideBar hide={hide} handleToggleSidebar={_handleToggleSidebar} />
        <PageContainer>{children}</PageContainer>
      </LayoutContent>
      <Footer />
      <FormBar ref={(ref) => (cFormBarRef = ref)} />
    </DashboardContainer>
  )
}

export default DashboardLayout

export const handleOpenForm = (args: Partial<IModalInitialStateInterface>) => {
  if (cFormBarRef === null) return

  cFormBarRef.handleOpenFormBar(args)
}

export const handleCloseForm = () => {
  if (cFormBarRef === null) return

  cFormBarRef.handleCloseFormBar()
}

interface DashboardLayoutProps {
  children?: React.ReactNode
}
