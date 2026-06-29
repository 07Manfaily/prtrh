import { useState } from 'react'
import { FileText, Calendar, ChevronDown } from 'lucide-react'

const DARK = '#161616'

const DOCUMENTS = [
  { id: 1, type: "Note d'information", cible: 'Ensemble du personnel', agent: null,          date: '11 Mai 2026' },
  { id: 2, type: 'Décision RH',        cible: 'Ensemble du personnel', agent: null,          date: '11 Mai 2026' },
  { id: 3, type: 'Décision RH',        cible: 'Agent',                 agent: '4875 / Kouamé Kacou Christian', date: '11 Mai 2026' },
]

const grouped = DOCUMENTS.reduce((acc, d) => {
  acc[d.date] = acc[d.date] || []
  acc[d.date].push(d)
  return acc
}, {})

export default function AjoutDocuments() {
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">Ajout de documents</h1>

      {/* Créer une */}
      <div className="mb-6 rounded-xl bg-neutral-50 border border-neutral-100 px-5 py-4">
        <p className="mb-3 text-sm font-semibold text-neutral-700">Créer une</p>
        <div className="flex gap-3">
          {["Note d'information", 'Decision RH'].map((label) => (
            <button
              key={label}
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white"
              style={{ background: DARK }}
            >
              <ChevronDown size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
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

      {/* Document list */}
      <h2 className="mb-4 text-lg font-bold text-neutral-900">Liste des documents</h2>

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">{date}</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="space-y-3">
            {items.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <FileText size={40} className="text-neutral-400" strokeWidth={1.4} />
                  <div>
                    <p className="font-bold text-neutral-900">{doc.type}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded-md border border-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                        {doc.cible}
                      </span>
                      {doc.agent && (
                        <span className="rounded-md border border-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                          {doc.agent}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="rounded-md px-5 py-2 text-sm font-semibold text-white"
                  style={{ background: DARK }}
                >
                  Consulter
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
