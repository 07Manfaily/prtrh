import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'

/**
 * Protège un groupe de routes.
 *
 * Props :
 *   role       – 'salarie' | 'admin' | undefined
 *                Si défini, vérifie que user.role correspond.
 *   redirectTo – route de redirection si non connecté (défaut : '/login')
 *
 * Comportement :
 *   • Pas de token          → redirige vers redirectTo
 *   • Mauvais role          → redirige vers l'espace correspondant au role réel
 *   • Authentifié + bon role → rend <Outlet />
 */
export function ProtectedRoute({ role, redirectTo = '/login' }) {
  const { token, user } = useAuthStore()

  // Pas connecté
  if (!token) return <Navigate to={redirectTo} replace />

  // Mauvais espace (ex: salarié qui tente d'accéder à /admin)
  if (role && user?.role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/salarie'} replace />
  }

  return <Outlet />
}
