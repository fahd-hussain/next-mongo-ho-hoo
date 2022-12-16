import { FC } from 'react'
import { HeaderContainer } from './header.styles'

const Header: FC<HeaderProps> = () => {
  return (
    <HeaderContainer>
      <title>Admin Console</title>
      <link href="/favicon.ico" rel="icon" />
      <meta
        content="minimum-scale=1, initial-scale=1, width=device-width"
        name="viewport"
      />
    </HeaderContainer>
  )
}

export default Header

interface HeaderProps {}
