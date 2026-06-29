import { useNavigate, useParams } from 'react-router-dom'
import { ArrowUpLeft, X, Check } from 'lucide-react'

const RED = '#E9041E'
const DARK = '#161616'

const OFFRES = [
  {
    id: 0,
    title: 'Data Analyste',
    contracts: ['CDD'],
    lieu: 'Hybride (Paris / Télétravail)',
    description: `Rattaché(e) au pôle Business Intelligence, vous aurez pour mission de transformer nos données brutes en leviers de décision stratégiques.\nVous travaillerez sur l'optimisation des parcours clients et l'analyse de performance de nos campagnes marketing.`,
    missions: [
      'Collecter, nettoyer et structurer les données provenant de diverses sources (SQL, APIs).',
      'Concevoir et maintenir des tableaux de bord interactifs (Tableau, Power BI).',
      'Réaliser des analyses exploratoires pour identifier les tendances et les points de friction.',
      'Collaborer avec les équipes produits pour définir les KPI clés.',
    ],
    profil: [
      'Formation Bac+5 en Statistiques, Informatique ou Mathématiques Décisionnelles.',
      'Maîtrise indispensable de SQL et Python (Pandas, Numpy).',
      'Capacité à vulgariser des données complexes auprès de profils non techniques.',
    ],
  },
  {
    id: 1,
    title: 'Data ingénieur',
    contracts: ['CDI', 'Interim'],
    lieu: 'Abidjan, Côte d\'Ivoire',
    description: `Rattaché(e) au département IT, vous concevrez et maintiendrez l'infrastructure de données de la SGCI.\nVous travaillerez en étroite collaboration avec les équipes data science et analytics.`,
    missions: [
      'Concevoir et maintenir des pipelines de données robustes et scalables.',
      'Gérer et optimiser les bases de données (SQL et NoSQL).',
      'Assurer la qualité et la fiabilité des flux de données.',
      'Collaborer avec les data scientists pour déployer les modèles en production.',
    ],
    profil: [
      'Formation Bac+5 en Informatique ou Génie logiciel.',
      'Maîtrise de Python, Spark, Kafka et des outils cloud (Azure, AWS).',
      'Expérience avec les architectures de données modernes (Data Lake, Data Warehouse).',
    ],
  },
]

const ALL_CONTRACTS = ['CDD', 'CDI', 'Interim']

export default function DetailOffre() {
  const navigate = useNavigate()
  const { id } = useParams()
  const offre = OFFRES[Number(id)] ?? OFFRES[0]

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate('/admin/offres')}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
      >
        <ArrowUpLeft size={18} />
        Retour
      </button>

      {/* Main card */}
      <div className="mb-8 rounded-xl border border-neutral-100 bg-neutral-50 p-6" style={{ borderLeft: `4px solid ${RED}` }}>
        <h2 className="mb-3 text-xl font-bold text-neutral-900">{offre.title}</h2>
        <div className="flex gap-2">
          {ALL_CONTRACTS.map((type) => {
            const selected = offre.contracts.includes(type)
            return (
              <span
                key={type}
                className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold ${
                  selected ? 'bg-neutral-900 text-white' : 'border border-neutral-300 text-neutral-500'
                }`}
              >
                {selected ? <X size={11} /> : <Check size={11} />}
                {type}
              </span>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm text-neutral-800">
        <p>
          <strong>Lieu :</strong> {offre.lieu}
        </p>

        <div>
          <p className="mb-2 font-bold">Description du poste</p>
          {offre.description.split('\n').map((line, i) => (
            <p key={i} className="mb-1 leading-relaxed">{line}</p>
          ))}
        </div>

        <div>
          <p className="mb-2 font-bold">Missions principales :</p>
          <ul className="space-y-1.5">
            {offre.missions.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-bold">Profil recherché</p>
          <ul className="space-y-1.5">
            {offre.profil.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex justify-end gap-3">
        <button
          className="rounded-md px-6 py-2.5 text-sm font-semibold text-white"
          style={{ background: RED }}
        >
          Supprimer
        </button>
        <button
          className="rounded-md px-6 py-2.5 text-sm font-semibold text-white"
          style={{ background: DARK }}
        >
          Modifier
        </button>
      </div>
    </div>
  )
}
