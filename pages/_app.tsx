import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { FC } from 'react'
import { Provider } from 'react-redux'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { wrapper } from '../lib/store'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface NewAppProps extends AppProps {
  emotionCache: EmotionCache
}

const App: FC<NewAppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <title>Poe Flip App</title>

          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />{' '}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
