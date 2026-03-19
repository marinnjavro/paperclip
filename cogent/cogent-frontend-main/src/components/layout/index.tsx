import Script from 'next/script'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useAuth } from 'lib/auth'
import useIdle from '@/utils/hooks/useIdle'
import ClientOnly from '../utils/ClientOnly'
import 'katex/dist/katex.min.css'

export const siteTitle = 'Cogent'

const plusJakartaSans = Plus_Jakarta_Sans({
  // weight: '400',
  subsets: ['latin'],
  variable: '--font-jakarta-sans'
})

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const router = useRouter()
  const { isSignedIn, signOut } = useAuth()

  const rememberMe = window.localStorage.getItem('rememberMeCogent')
  const idleMinutes = rememberMe ? 60 * 24 : 10

  const logout = () => {
    if (!isSignedIn()) return

    signOut()
    router.push('/home')
  }

  const { isIdle } = useIdle({ onIdle: logout, idleTime: idleMinutes })

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="description" content="" />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PT3JXSQ');
      `}
      </Script>
      {/* End Google Tag Manager */}
      <div className="max-w-screen flex min-h-screen flex-col bg-opacity-10 text-[#3F4C64] dark:text-support-gray-002">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PT3JXSQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClientOnly>
          <style jsx global>{`
            html {
              font-family: ${plusJakartaSans.style.fontFamily};
              background: #111;
            }
          `}</style>
          <main
            className={`${plusJakartaSans.variable} flex min-h-screen max-w-[1980px] mx-auto flex-1 flex-col align-middle font-sans`}
          >
            {children}
          </main>
        </ClientOnly>
      </div>
    </>
  )
}
