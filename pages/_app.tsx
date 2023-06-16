import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
     <ThemeProvider enableSystem={true}  attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  </AuthProvider>
  ) 
}

export default MyApp
