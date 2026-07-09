import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './router/ProtectedRoute'
import { useAuthStore } from './store'
import PortailRH from './PortailRH'
import LoginPage from './pages/LoginPage'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Demandes from './admin/pages/Demandes'
import AttestationsTravail from './admin/pages/AttestationsTravail'
import AttestationsConge from './admin/pages/AttestationsConge'
import AjoutDocuments from './admin/pages/AjoutDocuments'
import OffreEmplois from './admin/pages/OffreEmplois'
import CreerOffre from './admin/pages/CreerOffre'
import DetailOffre from './admin/pages/DetailOffre'
import Gestionnaires from './admin/pages/Gestionnaires'
import GestionPortail from './admin/pages/GestionPortail'
import GestionHabilitation from './admin/pages/GestionHabilitation'
import BasesDeDonnees from './admin/pages/BasesDeDonnees'
import SalarieLayout from './salarie/SalarieLayout'
import EspaceSalarie from './salarie/pages/EspaceSalarie'
import FormationCarriere from './salarie/pages/FormationCarriere'
import ContactezRH from './salarie/pages/ContactezRH'

function App() {
  // MODE DEV — fetchMe désactivé (pas d'API).
  // Pour réactiver :
  // const { token, user, fetchMe } = useAuthStore()
  // useEffect(() => { if (token && !user) fetchMe() }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route index element={<PortailRH />} />
        <Route path="login" element={<LoginPage />} />

        {/* Espace salarié — token requis, role 'salarie' */}
        <Route element={<ProtectedRoute role="salarie" />}>
          <Route path="salarie" element={<SalarieLayout />}>
            <Route index element={<EspaceSalarie />} />
            <Route path="formation" element={<FormationCarriere />} />
            <Route path="contact" element={<ContactezRH />} />
          </Route>
        </Route>

        {/* Espace admin — token requis, role 'admin' */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="demandes" element={<Demandes />} />
            <Route path="attestations/travail" element={<AttestationsTravail />} />
            <Route path="attestations/conge" element={<AttestationsConge />} />
            <Route path="documents" element={<AjoutDocuments />} />
            <Route path="offres" element={<OffreEmplois />} />
            <Route path="offres/creer" element={<CreerOffre />} />
            <Route path="offres/:id" element={<DetailOffre />} />
            <Route path="gestionnaires" element={<Gestionnaires />} />
            <Route path="gestion-portail" element={<GestionPortail />} />
            <Route path="habilitation" element={<GestionHabilitation />} />
            <Route path="bases-de-donnees" element={<BasesDeDonnees />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
