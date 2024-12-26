import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import DashboardLayout from '../layout/Dashboard.layout'
import lightTheme from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache.util'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <DashboardLayout>
          <CssBaseline />
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
