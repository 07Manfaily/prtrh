import { api } from './api'
import { ENDPOINTS as EP } from './endpoints'

export const authService = {
  login:  (credentials) => api.post(EP.auth.login,  credentials),
  logout: ()            => api.post(EP.auth.logout),
  me:     ()            => api.get(EP.auth.me),
}
