import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store'

const RED = '#E9041E'
const DARK = '#161616'

const DOCS = [
  { label: 'Attestation de travail', color: '#6C5CE7' },
  { label: 'Attestation de congé', color: '#00B5AD' },
  { label: "Notes d'informations", color: '#F39C12' },
  { label: 'Décisions RH', color: RED },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuthStore()
  const [role,      setRole]      = useState(null) // 'admin' | 'salarie' | null
  const [matricule, setMatricule] = useState('')
  const [password,  setPassword]  = useState('')
  const [showPwd,   setShowPwd]   = useState(false)

  const chooseRole = (r) => {
    clearError()
    setRole(r)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login({ matricule, password, role })
      navigate(role === 'admin' ? '/admin' : '/salarie')
    } catch {
      // l'erreur est déjà dans le store (state.error)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="flex w-[42%] flex-col items-center justify-center gap-8 bg-neutral-100 px-10 py-16">
        {/* Logo */}
        <div className="text-center select-none">
          <p className="text-xs font-extrabold tracking-[0.18em] text-neutral-900">VOTRE PORTAIL</p>
          <div className="mx-auto my-1 h-[3px] w-8" style={{ background: RED }} />
          <div className="flex items-center justify-center gap-2">
            <p className="text-4xl font-extrabold leading-none text-neutral-900">RH</p>
            <div className="flex items-center gap-1">
              <span className="inline-block h-5 w-5" style={{ background: RED }} />
              <span className="text-[11px] font-bold leading-[1.1] text-black">
                SOCIETE<br />GENERALE
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-xs text-center text-sm leading-relaxed text-neutral-600">
          Cet espace personnel a été conçu pour vous offrir plus d'autonomie, de transparence et de
          réactivité dans la gestion de votre vie professionnelle au sein de la SGCI.
        </p>

        {/* Document icons */}
        <div className="grid grid-cols-2 gap-6">
          {DOCS.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-2">
              <FileText size={48} style={{ color: d.color }} strokeWidth={1.5} />
              <p className="text-center text-xs font-semibold text-neutral-700">{d.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-16">
        <div className="w-full max-w-md">
          {!role ? (
            <>
              <h1 className="mb-2 text-3xl font-bold text-neutral-900">Connexion</h1>
              <p className="mb-8 text-sm text-neutral-600">Choisissez votre espace pour continuer.</p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => chooseRole('admin')}
                  className="rounded-lg py-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: DARK }}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => chooseRole('salarie')}
                  className="rounded-lg py-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: RED }}
                >
                  Salarié
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => chooseRole(null)}
                className="mb-4 text-xs font-medium text-neutral-500 hover:underline"
              >
                ← Changer d'espace
              </button>

              <h1 className="mb-8 text-3xl font-bold text-neutral-900">
                Connexion Espace {role === 'admin' ? 'Admin' : 'Salarié'}
              </h1>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                  <button onClick={clearError} className="ml-2 underline">Fermer</button>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Identifiant / Matricule
                  </label>
                  <input
                    type="text"
                    value={matricule}
                    onChange={(e) => setMatricule(e.target.value)}
                    placeholder="ex : 5454"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ex : JwJnZDpL10197@"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 pr-10 text-sm outline-none focus:border-neutral-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    >
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="mt-1.5 text-right">
                    <button type="button" className="text-xs text-neutral-500 hover:underline">
                      Mot de passe oublié ?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: DARK }}
                >
                  {loading ? 'Connexion…' : 'Se connecter'}
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg border border-neutral-300 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  Se connecter avec SG connect
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
