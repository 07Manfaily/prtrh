import { api } from './api'
import { ENDPOINTS as EP } from './endpoints'

export const adminService = {
  // Dashboard
  getStats:     ()           => api.get(EP.admin.stats),
  getChartData: (annee)      => api.get(EP.admin.chart, { params: { annee } }),

  // Demandes
  getDemandes:  (params)     => api.get(EP.admin.demandes, { params }),
  approuver:    (id)         => api.put(EP.admin.demandeApprouver(id)),
  refuser:      (id)         => api.put(EP.admin.demandeRefuser(id)),

  // Attestations
  getAttestationsTravail: () => api.get(EP.admin.attestationsTravail),
  getAttestationsConge:   () => api.get(EP.admin.attestationsConge),

  // Documents
  getDocuments:  ()          => api.get(EP.admin.documents),
  creerNote:     (data)      => api.post(EP.admin.documentsNote,     data),
  creerDecision: (data)      => api.post(EP.admin.documentsDecision, data),

  // Offres
  getOffres:      ()         => api.get(EP.admin.offres),
  creerOffre:     (data)     => api.post(EP.admin.offres,       data),
  modifierOffre:  (id, data) => api.put(EP.admin.offre(id),     data),
  supprimerOffre: (id)       => api.delete(EP.admin.offre(id)),

  // Gestionnaires
  getGestionnaires:      ()     => api.get(EP.admin.gestionnaires),
  ajouterGestionnaire:   (data) => api.post(EP.admin.gestionnaires,        data),
  supprimerGestionnaire: (id)   => api.delete(EP.admin.gestionnaire(id)),

  // Portail Home config (FormData — banner/images sont des fichiers)
  getHome:    ()     => api.get(EP.home.get),
  updateHome: (data) => api.post(EP.home.update, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // Evènements (FormData — cover_image est un fichier)
  creerEvenement: (data) => api.post(EP.events.create, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getEvenements: () => api.get(EP.events.list),
}
