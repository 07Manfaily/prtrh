import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Key, CircleUser } from 'lucide-react'
import { useAuthStore } from '../../store'
import ChangePasswordModal from './ChangePasswordModal'

const RED = '#E9041E'

export default function AdminHeader() {
  const navigate  = useNavigate()
  const { user, logout } = useAuthStore()
  const fullName  = [user?.prenom, user?.nom].filter(Boolean).join(' ') || 'Administrateur'
  const [showPwdModal, setShowPwdModal] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 grid-cols-2 gap-0.5">
            <span className="bg-red-600" />
            <span className="bg-neutral-900" />
            <span className="bg-neutral-900" />
            <span className="bg-red-600" />
          </div>
          <span className="text-base font-bold text-neutral-900">Portail RH</span>
        </div>

        {/* Actions + user */}
        <div className="flex items-center gap-5">
          <button className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white">
            Administrateur
          </button>

          <div className="relative">
            <Bell size={20} className="text-neutral-700" />
            <span
              className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ background: RED }}
            >
              0
            </span>
          </div>

          <Key
            size={20}
            className="cursor-pointer text-neutral-700 hover:text-neutral-900"
            onClick={() => setShowPwdModal(true)}
          />

          <div className="flex items-center gap-2">
            <CircleUser size={28} className="text-neutral-600" />
            <div>
              <p className="text-sm font-semibold leading-none text-neutral-900">{fullName}</p>
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-400 hover:text-neutral-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {showPwdModal && <ChangePasswordModal onClose={() => setShowPwdModal(false)} />}
    </>
  )
}
