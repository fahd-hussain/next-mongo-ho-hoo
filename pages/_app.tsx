import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AppProps } from 'next/app'
import { SWRConfig } from 'swr/_internal'
import { AuthProvider } from '../contexts/authentication.context'
import DashboardLayout from '../layout/Dashboard.layout'
import lightTheme from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache.util'
import { getRequest } from '../utils/requestHandler.util'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <AuthProvider>
          <DashboardLayout>
            <CssBaseline />
            <SWRConfig
              value={{
                fetcher: getRequest,
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </DashboardLayout>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
