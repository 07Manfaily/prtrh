import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Search, ArrowUpRight } from 'lucide-react'

const RED = '#E9041E'
const DARK = '#161616'

const OFFRES = [
  { id: 0, title: 'Data Analyste',  tags: ['CDD'],          date: '11 Mai 2026' },
  { id: 1, title: 'Data ingénieur', tags: ['CDI', 'Interim'], date: '11 Mai 2026' },
]

const STATUS_TABS = ['Tout', 'En cours', 'Expiré']

export default function OffreEmplois() {
  const navigate = useNavigate()
  const [statusTab, setStatusTab] = useState('Tout')
  const [search, setSearch] = useState('')

  const filtered = OFFRES.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = filtered.reduce((acc, o) => {
    acc[o.date] = acc[o.date] || []
    acc[o.date].push(o)
    return acc
  }, {})

  return (
    <div>
      {/* Title row */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Offres d'emplois / mobilité</h1>
        <button
          onClick={() => navigate('/admin/offres/creer')}
          className="rounded-md px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: DARK }}
        >
          Créer une offre d'emploi
        </button>
      </div>

      {/* Date filters */}
      <div className="mb-6 flex items-center gap-4">
        <div>
          <p className="mb-1 text-sm text-neutral-500">Date du jour</p>
          <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
            <span className="w-36 text-sm text-neutral-800">21/05/2025</span>
            <Calendar size={14} className="text-neutral-400" />
          </div>
        </div>
        <div className="mt-5">
          <select className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-500 outline-none">
            <option>Validées / Refusées / En attente</option>
          </select>
        </div>
        <div className="mt-5 flex gap-2">
          {['Hier', 'Semaine dernière', 'Mois dernier'].map((f) => (
            <button key={f} className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Liste section */}
      <h2 className="mb-4 text-lg font-bold text-neutral-900">Liste des offres en cours</h2>

      {/* Inner filter + search */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-3">
        <div className="flex items-center gap-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setStatusTab(t)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                statusTab === t ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher"
            className="w-52 rounded-lg border border-neutral-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>
      </div>

      {/* Offre cards */}
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">{date}</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((o) => (
              <div
                key={o.id}
                className="rounded-xl border border-neutral-100 bg-neutral-50 p-5"
                style={{ borderLeft: `4px solid ${RED}` }}
              >
                <h3 className="text-lg font-bold text-neutral-900">{o.title}</h3>
                <div className="mt-1.5 flex gap-2">
                  {o.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-2.5 py-0.5 text-xs font-semibold text-white"
                      style={{ background: DARK }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/admin/offres/${o.id}`)}
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70"
                >
                  Détails <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
