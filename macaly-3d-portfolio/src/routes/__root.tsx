import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { MacalyBridge } from '@macaly/bridge'

// CSS imported as a side effect — do NOT add ?url or ?inline. TanStack Start's
// client manifest injects the correct hashed stylesheet into prerendered HTML.
import '../styles.css'
import siteMetadata from '../metadata.json'

const rootMeta = siteMetadata['/']
const siteBase = import.meta.env.BASE_URL

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: rootMeta.title },
      { name: 'description', content: rootMeta.description },
      { name: 'theme-color', content: '#080b1b' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: `${siteBase}favicon.svg` },
      { rel: 'manifest', href: `${siteBase}manifest.json` },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <MacalyBridge>
        <body>
          {children}
          <Scripts />
        </body>
      </MacalyBridge>
    </html>
  )
}
