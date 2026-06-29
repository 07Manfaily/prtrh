import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:    null,
      token:   null,
      loading: false,
      error:   null,

      /**
       * Connexion.
       * Gère deux cas selon le backend :
       *  - réponse { token, user }  → stocke directement
       *  - réponse { token } seul   → appelle /auth/me ensuite
       */
      login: async (credentials) => {
        set({ loading: true, error: null })
        try {
          const response = await authService.login(credentials)
          set({ token: response.token })

          if (response.user) {
            set({ user: response.user, loading: false })
          } else {
            // Backend n'a renvoyé que le token → on charge le profil
            await get().fetchMe()
            set({ loading: false })
          }
        } catch (err) {
          set({ error: err.message, loading: false })
          throw err
        }
      },

      /**
       * Charge / rafraîchit le profil depuis /auth/me.
       * Appelé :
       *  - juste après login (si le backend ne retourne pas user)
       *  - au démarrage de l'app quand un token est déjà persisté
       */
      fetchMe: async () => {
        if (!get().token) return
        try {
          const user = await authService.me()
          set({ user })
        } catch {
          // Token expiré ou invalide → on déconnecte
          set({ user: null, token: null })
        }
      },

      logout: async () => {
        try { await authService.logout() } catch {}
        set({ user: null, token: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'portail-rh-auth',
      partialize: (s) => ({ token: s.token, user: s.user }),
    },
  ),
)
