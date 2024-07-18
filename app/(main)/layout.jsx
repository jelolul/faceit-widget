import '@styles/globals.css';

import Nav from '@components/Nav';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL('https://faceit-widget.vercel.app'),
  title: "FACEIT Widget",
  description: "Displays your FACEIT level and ELO on supported games in a customizable widget.",
  icons: {
    icon: "/assets/icons/favicon.svg"
  },
  openGraph: {
    url: 'https://faceit-widget.vercel.app/',
    title: "FACEIT Widget",
    description: "Displays your FACEIT level and ELO on supported games in a customizable widget.",
    type: 'website',
    siteName: "FACEIT Widget",
    images: [
      {
        url: '/assets/images/faceit-widget-social.png',
        secureUrl: '/assets/images/faceit-widget-social.png',
        width: 1200,
        height: 630,
        alt: 'FACEIT Logo, next to it text that says "FACEIT Widget"',
      }
    ]
  }
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
        </div>

        <main className="app">
          <Nav />
          <Suspense>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  )
}

export default RootLayout