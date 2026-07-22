import axios from 'axios'
import { useAuthStore } from '../store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// Lit le token depuis le localStorage (clé du store persisté)
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('portail-rh-auth')
    const token = JSON.parse(raw)?.state?.token
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch {}
  return config
})

// 401 (token invalide/expiré) → déconnexion automatique via le store, puis redirection
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401 && useAuthStore.getState().token) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(new Error(err.response?.data?.message ?? err.message))
  },
)
