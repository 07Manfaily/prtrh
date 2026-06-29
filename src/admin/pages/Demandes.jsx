import { useState } from 'react'
import { FileText, Calendar, Search, BadgeCheck, XCircle } from 'lucide-react'

const RED = '#E9041E'

const ALL_DEMANDES = [
  { id: 1, matricule: 5852, nom: 'Kouakou Marcelle', type: 'travail', statut: 'valide',  date: '21 Mai 2026' },
  { id: 2, matricule: 5852, nom: 'Kouakou Marcelle', type: 'travail', statut: 'refuse',  date: '21 Mai 2026' },
  { id: 3, matricule: 5852, nom: 'Kouakou Marcelle', type: 'travail', statut: 'attente', date: '21 Mai 2026' },
  { id: 4, matricule: 5852, nom: 'Traoré Ali',       type: 'conge',   statut: 'valide',  date: '21 Mai 2026' },
  { id: 5, matricule: 5852, nom: 'Traoré Ali',       type: 'conge',   statut: 'attente', date: '21 Mai 2026' },
]

const TYPE_COLOR   = { travail: '#6C5CE7', conge: '#00B5AD' }
const TYPE_LABEL   = { travail: "Demande d'attestation de travail", conge: "Demande d'attestation de congé" }
const FILTER_TABS  = ['Tout', 'Attestation de travail', 'Attestation de congés']

export default function Demandes() {
  const [tab, setTab]       = useState('Tout')
  const [search, setSearch] = useState('')

  const filtered = ALL_DEMANDES.filter((d) => {
    const matchTab =
      tab === 'Tout' ||
      (tab === 'Attestation de travail' && d.type === 'travail') ||
      (tab === 'Attestation de congés'  && d.type === 'conge')
    const matchSearch = d.nom.toLowerCase().includes(search.toLowerCase()) ||
      String(d.matricule).includes(search)
    return matchTab && matchSearch
  })

  const grouped = filtered.reduce((acc, d) => {
    acc[d.date] = acc[d.date] || []
    acc[d.date].push(d)
    return acc
  }, {})

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">Listes des demandes</h1>

      {/* Filter bar */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 px-5 py-3">
        <div className="flex items-center gap-1">
          {FILTER_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
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

      {/* Date + trier */}
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
            <option>Validées</option>
            <option>Refusées</option>
            <option>En attente</option>
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

      {/* Grouped list */}
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">{date}</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="space-y-3">
            {items.map((d) => (
              <DemandItem key={d.id} item={d} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DemandItem({ item }) {
  const color = TYPE_COLOR[item.type]
  const label = TYPE_LABEL[item.type]

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <FileText size={40} style={{ color }} strokeWidth={1.4} />
        <div>
          <p className="text-xs text-neutral-500">Matricule : {item.matricule}</p>
          <p className="font-bold text-neutral-900">{item.nom}</p>
          <p className="text-sm font-medium" style={{ color }}>{label}</p>
        </div>
      </div>

      {item.statut === 'valide' && (
        <BadgeCheck size={28} style={{ color: '#6C5CE7' }} />
      )}
      {item.statut === 'refuse' && (
        <XCircle size={28} style={{ color: RED }} />
      )}
      {item.statut === 'attente' && (
        <div className="flex gap-2">
          <button className="rounded-md bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600">
            Approuver
          </button>
          <button className="rounded-md px-5 py-2 text-sm font-semibold text-white hover:opacity-90" style={{ background: RED }}>
            Refuser
          </button>
        </div>
      )}
    </div>
  )
}
