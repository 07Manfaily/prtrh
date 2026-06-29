import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpLeft, X, Check, Calendar } from 'lucide-react'

const RED = '#E9041E'
const DARK = '#161616'

const CONTRACT_TYPES = ['CDD', 'CDI', 'Interim']

export default function CreerOffre() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [contracts, setContracts] = useState(['CDD'])
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [lieu, setLieu] = useState('')
  const [description, setDescription] = useState('')

  const toggleContract = (type) => {
    setContracts((prev) =>
      prev.includes(type) ? prev.filter((c) => c !== type) : [...prev, type]
    )
  }

  const handleCreate = (e) => {
    e.preventDefault()
    navigate('/admin/offres')
  }

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate('/admin/offres')}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
      >
        <ArrowUpLeft size={18} />
        Retour
      </button>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Intitulé */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">Intitulé du poste</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex : Sécrétaire"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Type contrat */}
        <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="w-1 self-stretch rounded-full" style={{ background: RED }} />
            <h3 className="font-bold text-neutral-900">Type du contrat</h3>
          </div>
          <div className="flex gap-3">
            {CONTRACT_TYPES.map((type) => {
              const selected = contracts.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleContract(type)}
                  className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-600'
                  }`}
                >
                  {selected ? <X size={13} /> : <Check size={13} />}
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Date de début', value: dateDebut, set: setDateDebut },
            { label: 'Date de fin',   value: dateFin,   set: setDateFin   },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-3">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="jj/mm/aaaa"
                  className="flex-1 text-sm outline-none text-neutral-700"
                />
                <Calendar size={15} className="text-neutral-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Lieu */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">Lieu</label>
          <input
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            placeholder="Ex : Sécrétaire"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">Description du poste</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Value"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400 resize-y"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/offres')}
            className="rounded-md px-6 py-2.5 text-sm font-semibold text-white"
            style={{ background: RED }}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md px-6 py-2.5 text-sm font-semibold text-white"
            style={{ background: DARK }}
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  )
}
