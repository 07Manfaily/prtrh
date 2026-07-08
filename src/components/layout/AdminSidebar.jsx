import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'

function SidebarLink({ to, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-neutral-200 font-semibold text-neutral-900'
            : 'text-neutral-600 hover:bg-neutral-100'
        }`
      }
    >
      <ChevronRight size={13} className="shrink-0 opacity-60" />
      {children}
    </NavLink>
  )
}

function SidebarGroup({ label, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100"
      >
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        {label}
      </button>
      {open && <div className="ml-4 mt-0.5 space-y-0.5">{children}</div>}
    </div>
  )
}

export default function AdminSidebar() {
  return (
    <aside className="w-52 shrink-0 space-y-0.5 overflow-y-auto border-r border-neutral-200 bg-neutral-50 px-2 py-4">
      <SidebarLink to="/admin" end>Tableau de bord</SidebarLink>
      <SidebarLink to="/admin/demandes">Demandes</SidebarLink>
      <SidebarGroup label="Attestations de">
        <SidebarLink to="/admin/attestations/travail">Travail</SidebarLink>
        <SidebarLink to="/admin/attestations/conge">Congé</SidebarLink>
      </SidebarGroup>
      <SidebarLink to="/admin/documents">Ajouter documents</SidebarLink>
      <SidebarLink to="/admin/offres">Offre Emplois</SidebarLink>
      <SidebarLink to="/admin/gestionnaires">Gestionnaires</SidebarLink>
      <SidebarLink to="/admin/gestion-portail">Gestion portail</SidebarLink>
      <SidebarLink to="/admin/habilitation">Gestion habilitation</SidebarLink>
    </aside>
  )
}
