import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from '@/components/ThemeProvider'

// Next inlines the CSS above, so Font Awesome must not inject it again at runtime
config.autoAddCss = false

const interTight = Inter_Tight({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3001'),
  title: 'Vadym Mirvald — Product Designer & Design Engineer',
  description:
    'Product designer and design engineer: I design products in Figma and ship them in React, with AI built into the product itself.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log('[3] Root Layout: Rendering')
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vadym Mirvald',
              jobTitle: 'Product Designer & Design Engineer',
              description:
                'Product designer and design engineer: I design products in Figma and ship them in React, with AI built into the product itself.',
            }),
          }}
        />
        <script
          defer
          src="https://umami.161.35.16.218.sslip.io/script.js"
          data-website-id="fec691a5-f14e-4edb-bd60-edddcfa6a36d"
        />
      </head>
      <body className={interTight.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
