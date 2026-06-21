// ✅ All imports at the top
import '@/styles/globals.css'
import '@/styles/app.scss'

import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/navbar'
import ScrollToTop from '@/components/ScrollToTop'
import Footer from './footer'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/userInfo'
import Layout from './layout'
import SupportWidget from '@/components/Support/SupportWidget'
import { Toaster } from 'react-hot-toast'

// ✅ Single App component
function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <UserContext.Provider value={userData}>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ScrollToTop />
        <Footer />
        <SupportWidget />
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
