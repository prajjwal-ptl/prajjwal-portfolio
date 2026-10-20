import { createRouter as createTanStackRouter, rewriteBasepath } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/not-found'
import { ErrorBoundary } from './components/error-boundary'

export function getRouter() {
  const basepath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const router = createTanStackRouter({
    routeTree,
    ...(basepath ? { rewrite: rewriteBasepath({ basepath }) } : {}),
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // Router-wide fallbacks. Individual routes can still override with their
    // own notFoundComponent / errorComponent.
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorBoundary,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
