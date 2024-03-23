import '@styles/globals.css';

import Nav from '@components/Nav';
import { Suspense } from 'react';

export const metadata = {
  title: "FACEIT Tracker",
  description: "Display your FACEIT level on your stream.",
  icons: {
    icon: "/assets/icons/favicon.svg"
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