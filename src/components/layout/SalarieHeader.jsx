import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, Settings, HelpCircle, LayoutGrid, CircleUser } from 'lucide-react'
import { useAuthStore } from '../../store'

const RED = '#E9041E'

export default function SalarieHeader() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const fullName = [user?.prenom, user?.nom].filter(Boolean).join(' ') || 'Utilisateur'

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6">
      {/* Logo + nav */}
      <div className="flex items-center gap-1">
        <div className="mr-5 flex items-center gap-2">
          <div className="grid h-7 w-7 grid-cols-2 gap-0.5">
            <span className="bg-red-600" />
            <span className="bg-neutral-900" />
            <span className="bg-neutral-900" />
            <span className="bg-red-600" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Portail RH</span>
        </div>

        <NavLink
          to="/"
          className="rounded px-4 py-1.5 text-sm text-neutral-600 hover:text-neutral-900"
        >
          Accueil
        </NavLink>

        {[
          { to: '/salarie',          label: 'Dashboard',            end: true },
          { to: '/salarie/formation', label: 'Formation et Carrière'           },
          { to: '/salarie/contact',   label: 'Contactez les RH'                },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `rounded border px-4 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'border-neutral-200 bg-neutral-100 font-medium text-neutral-900'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Actions + user */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-neutral-600" />
          <span
            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: RED }}
          >
            0
          </span>
        </div>
        <Settings  size={20} className="cursor-pointer text-neutral-600 hover:text-neutral-900" />
        <HelpCircle size={20} className="cursor-pointer text-neutral-600 hover:text-neutral-900" />
        <LayoutGrid size={20} className="cursor-pointer text-neutral-600 hover:text-neutral-900" />

        <div className="flex items-center gap-2">
          <CircleUser size={28} className="text-neutral-600" />
          <div>
            <p className="text-sm font-semibold leading-none text-neutral-900">{fullName}</p>
            <button
              onClick={handleLogout}
              className="text-xs text-neutral-400 hover:text-neutral-600"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
