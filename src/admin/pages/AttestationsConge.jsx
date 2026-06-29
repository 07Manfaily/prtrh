import { useState } from 'react'
import { FileText, Calendar, Search, BadgeCheck, XCircle } from 'lucide-react'

const RED = '#E9041E'
const COLOR = '#00B5AD'
const LABEL = "Demande d'attestation de congé"

const ITEMS = [
  { id: 1, matricule: 5852, nom: 'Traoré Ali', statut: 'valide',  date: '21 Mai 2026' },
  { id: 2, matricule: 5852, nom: 'Traoré Ali', statut: 'attente', date: '21 Mai 2026' },
]

const grouped = ITEMS.reduce((acc, d) => {
  acc[d.date] = acc[d.date] || []
  acc[d.date].push(d)
  return acc
}, {})

export default function AttestationsConge() {
  const [search, setSearch] = useState('')

  const filteredGrouped = Object.fromEntries(
    Object.entries(grouped).map(([date, items]) => [
      date,
      items.filter((i) => i.nom.toLowerCase().includes(search.toLowerCase()) || String(i.matricule).includes(search)),
    ])
  )

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">Attestations de congés</h1>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher"
          className="w-full rounded-lg border border-neutral-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-neutral-400"
        />
      </div>

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

      {Object.entries(filteredGrouped).map(([date, items]) =>
        items.length === 0 ? null : (
          <div key={date} className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-700">{date}</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="space-y-3">
              {items.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border px-5 py-4 shadow-sm"
                  style={{ borderColor: '#99f6e4', background: '#f0fdfb' }}
                >
                  <div className="flex items-center gap-4">
                    <FileText size={40} style={{ color: COLOR }} strokeWidth={1.4} />
                    <div>
                      <p className="text-xs text-neutral-500">Matricule : {d.matricule}</p>
                      <p className="font-bold text-neutral-900">{d.nom}</p>
                      <p className="text-sm font-medium" style={{ color: COLOR }}>{LABEL}</p>
                    </div>
                  </div>
                  {d.statut === 'valide' && <BadgeCheck size={28} style={{ color: COLOR }} />}
                  {d.statut === 'refuse' && <XCircle size={28} style={{ color: RED }} />}
                  {d.statut === 'attente' && (
                    <div className="flex gap-2">
                      <button className="rounded-md bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600">Approuver</button>
                      <button className="rounded-md px-5 py-2 text-sm font-semibold text-white hover:opacity-90" style={{ background: RED }}>Refuser</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
