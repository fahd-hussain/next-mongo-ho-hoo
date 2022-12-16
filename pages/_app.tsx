import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { initializeFirebase } from '../firebase/firebaseApp'
import DashboardLayout from '../layout/Dashboard.layout'
import lightTheme from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache.util'

const clientSideEmotionCache = createEmotionCache()
initializeFirebase()

const MyApp = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  if (loading) return <>Loading</>

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        {user ? (
          <DashboardLayout>
            <CssBaseline />
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <>
            <CssBaseline />
            <Component {...pageProps} />
          </>
        )}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
