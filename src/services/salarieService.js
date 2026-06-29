import { api } from './api'
import { ENDPOINTS as EP } from './endpoints'

export const salarieService = {
  // Demandes d'attestation
  getDemandes:       ()        => api.get(EP.salarie.demandes),
  creerDemande:      (type)    => api.post(EP.salarie.demandes, { type }),

  // Notes d'information
  getNotes:          ()        => api.get(EP.salarie.notes),
  approuverNote:     (id)      => api.put(EP.salarie.noteApprouver(id)),

  // Décisions RH
  getDecisions:      ()        => api.get(EP.salarie.decisions),
  approuverDecision: (id)      => api.put(EP.salarie.decisionApprouver(id)),

  // Distinctions
  getDistinctions:   ()        => api.get(EP.salarie.distinctions),

  // Sanctions
  getSanctions:      ()        => api.get(EP.salarie.sanctions),

  // Offres d'emploi
  getOffres:  (params) => api.get(EP.salarie.offres, { params }),
  getOffre:   (id)     => api.get(EP.salarie.offre(id)),
}
