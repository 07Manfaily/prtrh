/**
 * Centralise toutes les URLs de l'API.
 * Les méthodes (ex: offre, gestionnaire) retournent
 * une URL avec l'id interpolé.
 */
export const ENDPOINTS = {
  auth: {
    login:          '/auth/login',
    logout:         '/auth/logout',
    me:             '/auth/me',
    changePassword: '/auth/change-password',
  },

  salarie: {
    // Demandes d'attestation
    demandes:          '/salarie/demandes',
    demande:           (id) => `/salarie/demandes/${id}`,

    // Notes d'information
    notes:             '/salarie/notes',
    noteApprouver:     (id) => `/salarie/notes/${id}/approuver`,

    // Décisions RH
    decisions:         '/salarie/decisions',
    decisionApprouver: (id) => `/salarie/decisions/${id}/approuver`,

    // Distinctions & sanctions
    distinctions:      '/salarie/distinctions',
    sanctions:         '/salarie/sanctions',

    // Offres d'emploi
    offres:            '/salarie/offres',
    offre:             (id) => `/salarie/offres/${id}`,
  },

  // Portail Home — POST/GET /api/v1/home
  // (VITE_API_URL doit pointer sur http://localhost:3000, pas .../api)
  home: {
    get:    '/api/v1/home',
    update: '/api/v1/home',
  },

  // Evènements — POST /events
  events: {
    create: '/events',
    list:   '/events',
  },

  admin: {
    // Dashboard
    stats:    '/admin/stats',
    chart:    '/admin/chart',

    // Demandes
    demandes:          '/admin/demandes',
    demandeApprouver:  (id) => `/admin/demandes/${id}/approuver`,
    demandeRefuser:    (id) => `/admin/demandes/${id}/refuser`,

    // Attestations
    attestationsTravail: '/admin/attestations/travail',
    attestationsConge:   '/admin/attestations/conge',

    // Documents (notes & décisions)
    documents:         '/admin/documents',
    documentsNote:     '/admin/documents/note',
    documentsDecision: '/admin/documents/decision',

    // Offres d'emploi
    offres:            '/admin/offres',
    offre:             (id) => `/admin/offres/${id}`,

    // Gestionnaires
    gestionnaires:     '/admin/gestionnaires',
    gestionnaire:      (id) => `/admin/gestionnaires/${id}`,
  },
}
