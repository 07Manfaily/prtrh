import { useState } from 'react'
import { Key, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store'

const DARK = '#161616'

export default function ChangePasswordModal({ onClose, mandatory = false }) {
  const { changePassword, loading } = useAuthStore()
  const [newPassword,     setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew,     setShowNew]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error,   setError]   = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    try {
      await changePassword({ newPassword })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Key size={22} className="text-neutral-500" strokeWidth={1.5} />
            <h2 className="text-lg font-bold text-neutral-900">Modifier le mot de passe</h2>
          </div>
          {!mandatory && (
            <button
              onClick={onClose}
              className="rounded-lg border border-neutral-300 px-4 py-1.5 text-sm font-medium hover:bg-neutral-50"
            >
              Fermer
            </button>
          )}
        </div>

        <div className="px-6 pb-6">
          {mandatory && !success && (
            <p className="mb-4 text-sm text-neutral-600">
              Pour des raisons de sécurité, vous devez définir un nouveau mot de passe avant de continuer.
            </p>
          )}

          {success ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                Mot de passe modifié avec succès.
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: DARK }}
              >
                Continuer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="ex : JwJnZDpL10197@"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 pr-10 text-sm outline-none focus:border-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="ex : JwJnZDpL10197@"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 pr-10 text-sm outline-none focus:border-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: DARK }}
              >
                {loading ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
