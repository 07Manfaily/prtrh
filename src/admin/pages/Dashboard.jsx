import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer,
} from 'recharts'
import { FileText, Calendar, Search } from 'lucide-react'

const RED = '#E9041E'
const DARK = '#161616'

const chartData = [
  { mois: 'Jan',  travail: 100, conge: 100 },
  { mois: 'Fev',  travail: 150, conge: 100 },
  { mois: 'Mar',  travail: 100, conge: 50  },
  { mois: 'Avr',  travail: 100, conge: 100 },
  { mois: 'Mai',  travail: 200, conge: 100 },
  { mois: 'Jun',  travail: 100, conge: 100 },
  { mois: 'Juil', travail: 100, conge: 100 },
  { mois: 'Aout', travail: 100, conge: 100 },
  { mois: 'Sept', travail: 100, conge: 100 },
  { mois: 'Oct',  travail: 100, conge: 100 },
  { mois: 'Nov',  travail: 100, conge: 100 },
  { mois: 'Dec',  travail: 100, conge: 100 },
]

const DEMANDES = [
  { date: '21/05/2026', matricule: 4758, nom: 'Kacou',  prenom: 'Jean Jacques', doc: 'Att. congé',  statut: 'Validé'   },
  { date: '21/05/2026', matricule: 4520, nom: 'Koné',   prenom: 'Mamadou',      doc: 'Att. travail', statut: 'En cours' },
  { date: '21/05/2026', matricule: 1245, nom: 'Mabré',  prenom: 'Mamadou',      doc: 'Att. travail', statut: 'Validé'   },
]

const STATUT_CLS = {
  'Validé':   'text-green-600',
  'En cours': 'text-blue-600',
  'Refusé':   'text-red-600',
}

const STATS = [
  { label: 'Demandes',             value: 150, iconColor: '#9ca3af' },
  { label: 'Demandes traitées',    value: 150, iconColor: '#10b981' },
  { label: 'Demandes non traitées',value: 50,  iconColor: RED       },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('travail')
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">Tableau de bord</h1>

      {/* Date + quick filters */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-sm text-neutral-500">Date du jour</p>
          <div className="flex w-52 items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
            <span className="flex-1 text-sm text-neutral-800">21/05/2025</span>
            <Calendar size={15} className="text-neutral-400" />
          </div>
        </div>
        <div className="flex gap-2">
          {['Hier', 'Semaine dernière', 'Mois dernier'].map((f) => (
            <button key={f} className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
            <FileText size={44} style={{ color: s.iconColor }} strokeWidth={1.4} />
            <div>
              <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
              <p className="text-sm text-neutral-500">{s.label}</p>
              <button className="mt-0.5 text-xs text-neutral-400 hover:underline">Voir</button>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-neutral-900">
          Statistique de demandes Année 2026
        </h2>
        <div className="mb-4 flex gap-3">
          {[
            { key: 'travail', label: 'Attestation de travail', color: '#5EEAD4' },
            { key: 'conge',   label: 'Attestation de congé',   color: '#A78BFA' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: tab.color }} />
              {tab.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barGap={3} barSize={18}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 400]} ticks={[0, 100, 200, 300, 400]} />
            <Tooltip />
            <Bar dataKey="travail" name="Att. travail" fill="#5EEAD4" radius={[3, 3, 0, 0]}>
              <LabelList dataKey="travail" position="insideTop" style={{ fontSize: 9, fill: '#374151' }} />
            </Bar>
            <Bar dataKey="conge" name="Att. congé" fill="#A78BFA" radius={[3, 3, 0, 0]}>
              <LabelList dataKey="conge" position="insideTop" style={{ fontSize: 9, fill: '#374151' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-neutral-900">Liste des demandes</h2>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              placeholder="Rechercher"
              className="w-full rounded-md border border-neutral-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-neutral-400"
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2">
            <span className="text-sm text-neutral-500">Trier</span>
            <select className="bg-transparent text-sm text-neutral-700 outline-none">
              <option>Par type</option>
              <option>Par date</option>
              <option>Par statut</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-200 text-left">
              <th className="pb-3 pr-3"><input type="checkbox" /></th>
              {['Date','Matricule','Nom','Prénoms','Documents','Statut','Actions'].map((h) => (
                <th key={h} className="pb-3 pr-4 font-semibold text-neutral-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMANDES.map((d, i) => (
              <tr key={i} className="border-b border-neutral-100">
                <td className="py-3 pr-3"><input type="checkbox" /></td>
                <td className="py-3 pr-4 text-neutral-500">{d.date}</td>
                <td className="py-3 pr-4 text-neutral-700">{d.matricule}</td>
                <td className="py-3 pr-4 font-medium text-neutral-900">{d.nom}</td>
                <td className="py-3 pr-4 text-neutral-600">{d.prenom}</td>
                <td className="py-3 pr-4 text-neutral-600">{d.doc}</td>
                <td className={`py-3 pr-4 font-medium ${STATUT_CLS[d.statut]}`}>{d.statut}</td>
                <td className="py-3">
                  <button
                    onClick={() => navigate('/admin/demandes')}
                    className="font-medium text-neutral-800 hover:underline"
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
