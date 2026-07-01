import { Outlet } from 'react-router-dom'

/**
 * MODE DEV — auth désactivée.
 * Pour réactiver : décommenter le bloc ci-dessous et supprimer le return <Outlet />.
 *
 * import { Navigate } from 'react-router-dom'
 * import { useAuthStore } from '../store'
 * export function ProtectedRoute({ role, redirectTo = '/login' }) {
 *   const { token, user } = useAuthStore()
 *   if (!token) return <Navigate to={redirectTo} replace />
 *   if (role && user?.role && user.role !== role)
 *     return <Navigate to={user.role === 'admin' ? '/admin' : '/salarie'} replace />
 *   return <Outlet />
 * }
 */
export function ProtectedRoute() {
  return <Outlet />
}
