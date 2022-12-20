import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/authentication.context'
import { initializeFirebase } from '../firebase/firebaseApp'
import DashboardLayout from '../layout/Dashboard.layout'
import lightTheme from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache.util'

const clientSideEmotionCache = createEmotionCache()
initializeFirebase()

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
            <Component {...pageProps} />
          </DashboardLayout>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
