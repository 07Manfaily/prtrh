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
       * MODE DEV — login mock (pas d'appel API).
       * Pour réactiver le vrai login, remplacer ce bloc par :
       *
       * login: async (credentials) => {
       *   set({ loading: true, error: null })
       *   try {
       *     const response = await authService.login(credentials)
       *     set({ token: response.token })
       *     if (response.user) set({ user: response.user, loading: false })
       *     else { await get().fetchMe(); set({ loading: false }) }
       *   } catch (err) {
       *     set({ error: err.message, loading: false })
       *     throw err
       *   }
       * },
       */
      login: async ({ role } = {}) => {
        set({
          token: 'mock-token',
          user:  {
            prenom: 'Lambertin',
            nom:    'Isidorin',
            role:   role === 'admin' ? 'admin' : 'salarie',
            must_change_password: false,
          },
          loading: false,
          error:   null,
        })
      },

      /** MODE DEV — no-op (pas d'API disponible). */
      fetchMe: async () => {},

      /**
       * MODE DEV — changePassword mock (pas d'appel API).
       * Pour réactiver le vrai appel, remplacer ce bloc par :
       *
       * changePassword: async (data) => {
       *   set({ loading: true, error: null })
       *   try {
       *     await authService.changePassword(data)
       *     set((state) => ({
       *       user: state.user ? { ...state.user, must_change_password: false } : state.user,
       *       loading: false,
       *     }))
       *   } catch (err) {
       *     set({ error: err.message, loading: false })
       *     throw err
       *   }
       * },
       */
      changePassword: async () => {
        set((state) => ({
          user: state.user ? { ...state.user, must_change_password: false } : state.user,
          loading: false,
          error:   null,
        }))
      },

      logout: async () => {
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
