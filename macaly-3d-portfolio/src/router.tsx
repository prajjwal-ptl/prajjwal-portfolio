import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/not-found'
import { ErrorBoundary } from './components/error-boundary'

export function getRouter() {
  const basepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  const router = createTanStackRouter({
    routeTree,
    ...(basepath !== '/' ? { basepath } : {}),
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
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
