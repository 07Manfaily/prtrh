import { useState } from 'react'
import { FileText, ChevronRight, ArrowUpLeft, ArrowUpRight, AlertCircle, Medal } from 'lucide-react'

const RED = '#E9041E'
const DARK = '#161616'
const PURPLE = '#6C5CE7'
const TEAL = '#00B5AD'
const ORANGE = '#F39C12'

/* ── Mock data ── */
const HISTORIQUE = [
  { id: 1, type: 'travail', label: 'Attestation de travail', date: '11 Mai 2026', statut: 'en_cours'    },
  { id: 2, type: 'conge',   label: 'Attestation de Congé',   date: '11 Mai 2026', statut: 'disponible'  },
]
const NOTES = [
  { id: 1, label: "Note d'information", date: '11 Mai 2026', statut: 'en_attente' },
  { id: 2, label: "Note d'information", date: '11 Mai 2026', statut: 'approuve'   },
]
const DECISIONS = [
  { id: 1, label: 'Décision RH', date: '11 Mai 2026', statut: 'en_attente' },
  { id: 2, label: 'Décision RH', date: '11 Mai 2026', statut: 'approuve'   },
]
const DISTINCTIONS = [
  { id: 1, label: "Tableau d'honneur",  date: '11 Mai 2026'      },
  { id: 2, label: 'Bravo et Merci',     date: '11 Mai 2026'      },
  { id: 3, label: "Médaille d'honneur", date: '11 Mai 2026'      },
  { id: 4, label: "Tableau d'honneur",  date: '15 Février 2026'  },
]
const SANCTIONS = [
  { id: 1, label: 'Avertissement', date: '11 Mai 2026' },
  { id: 2, label: 'Blâme',         date: '11 Mai 2026' },
]
const OFFRES = [
  { id: 0, title: 'Data Analyste',  tags: ['CDD'],            date: '11 Mai 2026' },
  { id: 1, title: 'Data ingénieur', tags: ['CDI', 'Interim'], date: '11 Mai 2026' },
  { id: 2, title: 'Data Analyste',  tags: ['CDD'],            date: '11 Mai 2026' },
]
const OFFRE_DETAIL = {
  title: 'Data analyste',
  contrat: 'CDI / Temps plein',
  lieu: 'Hybride (Paris / Télétravail)',
  description: "Rattaché(e) au pôle Business Intelligence, vous aurez pour mission de transformer nos données brutes en leviers de décision stratégiques.\nVous travaillerez sur l'optimisation des parcours clients et l'analyse de performance de nos campagnes marketing.",
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
}

/* ── Main component ── */
export default function EspaceSalarie() {
  const [mainTab, setMainTab] = useState('documents')
  const [docSub,  setDocSub]  = useState('demande')
  const [modal,   setModal]   = useState(null)
  const [offre,   setOffre]   = useState(null) // selected job detail
  const [luCheck, setLuCheck] = useState({})

  const MAIN_TABS = [
    { key: 'documents',        label: 'Documents'                          },
    { key: 'carriere',         label: 'Carrière professionnelle'           },
    { key: 'reconnaissance',   label: "Reconnaissance et culture d'entreprise" },
    { key: 'discipline',       label: 'Discipline'                         },
    { key: 'emplois',          label: 'Emplois & Mobilité'                 },
  ]

  return (
    <div className="px-8 py-6">
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">Espace Salarié</h1>

      {/* Main tab bar */}
      <div className="mb-8 flex items-center gap-6 border-b border-neutral-200">
        <span className="pb-3 text-sm font-bold text-neutral-900">Tableau de bord</span>
        {MAIN_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setMainTab(t.key); setOffre(null) }}
            className={`pb-3 text-sm transition-colors ${
              mainTab === t.key
                ? 'border-b-2 border-neutral-900 font-semibold text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── DOCUMENTS ── */}
      {mainTab === 'documents' && (
        <div>
          <p className="text-sm text-neutral-500">Accedez à vos documents RH</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Demande et consultation</h2>
          <div className="mb-6 mt-1 h-1 w-14 rounded-full" style={{ background: RED }} />

          {/* Sub-tabs */}
          <div className="mb-6 flex gap-2">
            {[
              { key: 'demande',   label: 'Demande de document'   },
              { key: 'notes',     label: "Notes d'informations"  },
              { key: 'decisions', label: 'Décision RH'           },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setDocSub(s.key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  docSub === s.key
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Demande de document */}
          {docSub === 'demande' && (
            <div>
              <div className="mb-8 grid grid-cols-2 gap-4">
                {[
                  { type: 'travail', label: 'Attestation de travail', color: PURPLE },
                  { type: 'conge',   label: 'Attestation de congé',   color: TEAL   },
                ].map((c) => (
                  <button
                    key={c.type}
                    onClick={() => setModal({ type: 'attestation', data: { label: c.label, color: c.color } })}
                    className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-5 text-left hover:bg-neutral-100 transition-colors"
                    style={{ borderLeft: `4px solid ${c.color}` }}
                  >
                    <div className="flex items-center gap-4">
                      <FileText size={36} style={{ color: c.color }} strokeWidth={1.4} />
                      <div>
                        <p className="text-xs text-neutral-500">Faire une demande</p>
                        <p className="font-bold text-neutral-900">{c.label}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-neutral-400" />
                  </button>
                ))}
              </div>

              <h3 className="mb-4 text-lg font-bold text-neutral-900">Historique de demande</h3>
              <div className="mb-4">
                <label className="mb-1 block text-sm text-neutral-500">Filtre</label>
                <select className="w-48 rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none">
                  <option>Tout</option>
                </select>
              </div>

              {HISTORIQUE.length === 0 ? (
                <EmptyState icon={<FileText size={40} className="text-neutral-300" />} text="Aucune demande" />
              ) : (
                <GroupedList
                  items={HISTORIQUE}
                  renderItem={(item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4"
                      style={item.type === 'conge' ? { background: '#f0fdfb', borderColor: '#99f6e4' } : {}}
                    >
                      <div className="flex items-center gap-4">
                        <FileText size={36} style={{ color: item.type === 'travail' ? PURPLE : TEAL }} strokeWidth={1.4} />
                        <div>
                          <p className="text-xs text-neutral-500">Demande</p>
                          <p className="font-bold text-neutral-900">{item.label}</p>
                        </div>
                      </div>
                      {item.statut === 'en_cours' && (
                        <span className="rounded border border-neutral-300 px-4 py-1.5 text-sm text-neutral-600">
                          En cours ...
                        </span>
                      )}
                      {item.statut === 'disponible' && (
                        <button
                          onClick={() => setModal({ type: 'attestation', data: { label: item.label, color: TEAL, showDownload: true } })}
                          className="rounded-md px-5 py-2 text-sm font-semibold text-white"
                          style={{ background: TEAL }}
                        >
                          Telecharger
                        </button>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
          )}

          {/* Notes d'informations */}
          {docSub === 'notes' && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Liste des notes d'informations</h3>
              <FilterBar />
              {NOTES.length === 0 ? (
                <EmptyState icon={<FileText size={40} className="text-neutral-300" />} text="Aucune note d'information" />
              ) : (
                <GroupedList
                  items={NOTES}
                  renderItem={(item) => (
                    <DocItem
                      key={item.id}
                      item={item}
                      onClick={() => setModal({ type: 'note', data: item })}
                    />
                  )}
                />
              )}
            </div>
          )}

          {/* Décision RH */}
          {docSub === 'decisions' && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Liste des notes d'informations</h3>
              <FilterBar />
              {DECISIONS.length === 0 ? (
                <EmptyState icon={<FileText size={40} className="text-neutral-300" />} text="Aucune Décision" />
              ) : (
                <GroupedList
                  items={DECISIONS}
                  renderItem={(item) => (
                    <DocItem
                      key={item.id}
                      item={item}
                      onClick={() => setModal({ type: 'decision', data: item })}
                    />
                  )}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── CARRIÈRE ── */}
      {mainTab === 'carriere' && (
        <div>
          <p className="text-sm text-neutral-500">Votre évolution</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Carrière professionnelle</h2>
          <div className="mb-6 mt-1 h-1 w-14 rounded-full" style={{ background: RED }} />
          <EmptyState icon={<FileText size={40} className="text-neutral-300" />} text="Aucune information" />
        </div>
      )}

      {/* ── RECONNAISSANCE ── */}
      {mainTab === 'reconnaissance' && (
        <div>
          <p className="text-sm text-neutral-500">Distinctions</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Bravos et tableau d'honneur</h2>
          <div className="mb-6 mt-1 h-1 w-14 rounded-full" style={{ background: RED }} />
          <h3 className="mb-4 text-base font-bold text-neutral-900">Liste des distinctions</h3>
          <FilterBar />
          {DISTINCTIONS.length === 0 ? (
            <EmptyState icon={<Medal size={40} className="text-neutral-300" />} text="Aucune Distinction" />
          ) : (
            <GroupedList
              items={DISTINCTIONS}
              renderItem={(item) => (
                <button
                  key={item.id}
                  onClick={() => setModal({ type: 'distinction', data: item })}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4 text-left hover:bg-neutral-100 transition-colors w-full"
                  style={{ borderLeft: `4px solid ${ORANGE}` }}
                >
                  <div className="flex items-center gap-4">
                    <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
                    <div>
                      <p className="text-xs text-neutral-500">Distinction</p>
                      <p className="font-bold text-neutral-900">{item.label}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </button>
              )}
              cols={3}
            />
          )}
        </div>
      )}

      {/* ── DISCIPLINE ── */}
      {mainTab === 'discipline' && (
        <div>
          <p className="text-sm text-neutral-500">Information RH</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Sanctions et Avertissement</h2>
          <div className="mb-6 mt-1 h-1 w-14 rounded-full" style={{ background: RED }} />
          <h3 className="mb-4 text-base font-bold text-neutral-900">Liste des sanctions</h3>
          <FilterBar />
          {SANCTIONS.length === 0 ? (
            <EmptyState icon={<AlertCircle size={40} className="text-neutral-300" />} text="Aucune Sanction ou Avertissement" />
          ) : (
            <GroupedList
              items={SANCTIONS}
              renderItem={(item) => (
                <button
                  key={item.id}
                  onClick={() => setModal({ type: 'sanction', data: item })}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4 text-left hover:bg-neutral-100 transition-colors w-full"
                  style={{ borderLeft: `4px solid ${RED}` }}
                >
                  <div className="flex items-center gap-4">
                    <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
                    <div>
                      <p className="text-xs text-neutral-500">Distinction</p>
                      <p className="font-bold text-neutral-900">{item.label}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </button>
              )}
              cols={2}
            />
          )}
        </div>
      )}

      {/* ── EMPLOIS & MOBILITÉ ── */}
      {mainTab === 'emplois' && (
        <div>
          {offre ? (
            <div className="max-w-3xl">
              <button
                onClick={() => setOffre(null)}
                className="mb-6 flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                <ArrowUpLeft size={18} />
                Retour aux offres d'emplois
              </button>
              <h2 className="mb-2 text-2xl font-bold text-neutral-900">{OFFRE_DETAIL.title}</h2>
              <div className="mb-1 h-1 w-14 rounded-full" style={{ background: RED }} />
              <div className="mt-4 space-y-4 text-sm text-neutral-800">
                <p><strong>Type de contrat :</strong> {OFFRE_DETAIL.contrat}</p>
                <p><strong>Lieu :</strong> {OFFRE_DETAIL.lieu}</p>
                <div>
                  <p className="mb-2 font-bold">Description du poste</p>
                  {OFFRE_DETAIL.description.split('\n').map((l, i) => <p key={i} className="mb-1">{l}</p>)}
                </div>
                <div>
                  <p className="mb-2 font-bold">Missions principales :</p>
                  <ul className="space-y-1">
                    {OFFRE_DETAIL.missions.map((m, i) => <li key={i} className="flex gap-2"><span>•</span><span>{m}</span></li>)}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-bold">Profil recherché</p>
                  <ul className="space-y-1">
                    {OFFRE_DETAIL.profil.map((p, i) => <li key={i} className="flex gap-2"><span>•</span><span>{p}</span></li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button className="rounded-md px-6 py-2.5 text-sm font-semibold text-white" style={{ background: DARK }}>
                  Candidature spontanée
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-neutral-500">Carrière</p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-900">Emplois & Mobilité</h2>
              <div className="mb-6 mt-1 h-1 w-14 rounded-full" style={{ background: RED }} />
              <h3 className="mb-4 text-base font-bold text-neutral-900">Liste des offres</h3>
              <FilterBar />
              {OFFRES.length === 0 ? (
                <EmptyState icon={<FileText size={40} className="text-neutral-300" />} text="Aucune offre d'emplois" />
              ) : (
                <GroupedList
                  items={OFFRES}
                  cols={3}
                  renderItem={(item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 p-5"
                      style={{ borderLeft: `4px solid ${RED}` }}
                    >
                      <p className="font-bold text-neutral-900">{item.title}</p>
                      <div className="mt-1.5 flex gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="rounded-md px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: DARK }}>{t}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => setOffre(item)}
                        className="mt-3 flex items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70"
                      >
                        Détails <ArrowUpRight size={13} />
                      </button>
                    </div>
                  )}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <Modal modal={modal} setModal={setModal} luCheck={luCheck} setLuCheck={setLuCheck} />
      )}
    </div>
  )
}

/* ── Shared sub-components ── */

function FilterBar() {
  return (
    <div className="mb-5">
      <label className="mb-1 block text-sm text-neutral-500">Filtre</label>
      <select className="w-48 rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none">
        <option>Tout</option>
      </select>
    </div>
  )
}

function EmptyState({ icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon}
      <p className="mt-3 font-semibold text-neutral-700">{text}</p>
    </div>
  )
}

function GroupedList({ items, renderItem, cols = 1 }) {
  const grouped = items.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || []
    acc[item.date].push(item)
    return acc
  }, {})

  return (
    <>
      {Object.entries(grouped).map(([date, grpItems]) => (
        <div key={date} className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm text-neutral-600">{date}</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className={`grid gap-3 ${cols === 3 ? 'grid-cols-3' : cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {grpItems.map(renderItem)}
          </div>
        </div>
      ))}
    </>
  )
}

function DocItem({ item, onClick }) {
  const TEAL = '#00B5AD'
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4">
      <div className="flex items-center gap-4">
        <FileText size={36} className="text-neutral-400" strokeWidth={1.4} />
        <div>
          <p className="font-bold text-neutral-900">{item.label}</p>
          {item.statut === 'approuve' && (
            <p className="text-sm font-medium" style={{ color: TEAL }}>Lu et approuvé</p>
          )}
          {item.statut === 'en_attente' && (
            <p className="text-sm text-neutral-500">En attente</p>
          )}
        </div>
      </div>
      <button
        onClick={onClick}
        className="rounded-md px-5 py-2 text-sm font-semibold text-white"
        style={{ background: '#1a1a1a' }}
      >
        Consulter
      </button>
    </div>
  )
}

/* ── Modal ── */
function Modal({ modal, setModal, luCheck, setLuCheck }) {
  const close = () => setModal(null)
  const itemId = modal.data?.id
  const isLu = luCheck[itemId]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Attestation */}
        {modal.type === 'attestation' && (
          <>
            <div className="flex items-center justify-between border-b border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <FileText size={32} style={{ color: modal.data.color }} strokeWidth={1.4} />
                <div>
                  <p className="text-xs text-neutral-500">Demande</p>
                  <p className="font-bold text-neutral-900">{modal.data.label}</p>
                  <p className="text-xs text-neutral-400">11 Mai 2026</p>
                </div>
              </div>
              {modal.data.showDownload && (
                <button className="rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ background: '#00B5AD' }}>Telecharger</button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded border border-neutral-200 bg-white p-10 font-mono text-sm leading-7 text-neutral-700">
                <div className="mb-8">
                  <p className="font-semibold">[Nom de l'entreprise]</p>
                  <p>[Adresse du siège social]</p>
                  <p>[Code postal et Ville]</p>
                </div>
                <div className="mb-8 text-right">
                  <p>[Prénom et nom du destinataire]</p>
                  <p>[Adresse du destinataire]</p>
                  <p>[Code postal et Ville]</p>
                  <p className="mt-4">[Ville], le [date de création]</p>
                </div>
                <p className="mb-8">Objet : Attestation de travail / [Nom et prénom du salarié]</p>
                <h2 className="text-center text-base font-bold underline">ATTESTATION DE TRAVAIL</h2>
              </div>
            </div>
            <div className="flex justify-end border-t border-neutral-100 p-4">
              <button onClick={close} className="rounded-md border border-neutral-300 px-6 py-2 text-sm font-medium hover:bg-neutral-50">Fermer</button>
            </div>
          </>
        )}

        {/* Note d'information */}
        {modal.type === 'note' && (
          <>
            <div className="flex items-center gap-3 border-b border-neutral-100 p-5">
              <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
              <div>
                <p className="text-xs text-neutral-400">Date de publicatuion : 11 Mai 2026</p>
                <p className="font-bold text-neutral-900">Note d'information</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded border border-neutral-200 bg-white p-10 font-mono text-sm leading-7 text-neutral-700">
                <p className="mb-6">[LIEU], [DATE]</p>
                <div className="mb-6">
                  <p>[NOM DU DESTINATAIRE]</p>
                  <p>[ADRESSE 1]</p>
                  <p>[ADRESSE 2]</p>
                  <p>[VILLE, ÉTAT/PROVINCE]</p>
                  <p>[CODE POSTAL]</p>
                </div>
                <div className="mb-2 border-b-2 border-neutral-800 pb-1">
                  <p className="font-bold">OBJET : NOTE D'INFORMATION RELATIVE À UNE PROMOTION</p>
                </div>
                <p className="mb-4 mt-6">Madame, Monsieur [NOM DE LA PERSONNE],</p>
                <p>Nous avons le plaisir d'informer tout le personnel que [NOM DE LA PERSONNE] a été promu au poste de [POSTE] au [DÉPARTEMENT]. [NOM DE LA PERSONNE] a rejoint notre entreprise il y a [NOMBRE] ans en qualité de [TITRE]. Il a aussi occupé les postes ci-après : [LISTE DES DIFFÉRENTS POSTES OCCUPÉS].</p>
              </div>
            </div>
            <div className="border-t border-neutral-100 p-4">
              <label className="mb-4 flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                <input type="checkbox" checked={!!isLu} onChange={() => setLuCheck(p => ({ ...p, [itemId]: !p[itemId] }))} />
                Lu et approuvé
              </label>
              <div className="flex justify-end gap-3">
                <button onClick={close} className="rounded-md border border-neutral-300 px-6 py-2 text-sm font-medium hover:bg-neutral-50">Fermer</button>
                <button onClick={close} disabled={!isLu} className={`rounded-md px-6 py-2 text-sm font-semibold text-white transition-opacity ${isLu ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`} style={{ background: DARK }}>Confirmer</button>
              </div>
            </div>
          </>
        )}

        {/* Décision RH */}
        {modal.type === 'decision' && (
          <>
            <div className="flex items-center gap-3 border-b border-neutral-100 p-5">
              <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
              <div>
                <p className="text-xs text-neutral-400">Date de publicatuion : 11 Mai 2026</p>
                <p className="font-bold text-neutral-900">Note d'information</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded border border-neutral-200 bg-white p-10 font-mono text-sm leading-7 text-neutral-700">
                <p className="mb-8 italic">&lt;Sur papier entête&gt;</p>
                <h2 className="mb-6 text-center font-bold underline">Décision du congé</h2>
                <p className="mb-4">Nous, soussignés, (nom de la société), (forme juridique) au capital de 00.000.000 de Dirhams, sise à (adresse), certifions par la présente que :</p>
                <p className="mb-2">Monsieur (...). </p>
                <p className="mb-2">Titulaire de la CIN N° ..............</p>
                <p className="mb-2">Immatriculé à la CNSS sous le n°000 000 000.</p>
                <p className="mb-6">En qualité de (... ...)</p>
                <p>Bénificiera d'un congé payé pendant la période ci-dessus :</p>
              </div>
            </div>
            <div className="border-t border-neutral-100 p-4">
              <label className="mb-4 flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                <input type="checkbox" checked={!!isLu} onChange={() => setLuCheck(p => ({ ...p, [itemId]: !p[itemId] }))} />
                Lu et approuvé
              </label>
              <div className="flex justify-end gap-3">
                <button onClick={close} className="rounded-md border border-neutral-300 px-6 py-2 text-sm font-medium hover:bg-neutral-50">Fermer</button>
                <button onClick={close} disabled={!isLu} className={`rounded-md px-6 py-2 text-sm font-semibold text-white transition-opacity ${isLu ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`} style={{ background: DARK }}>Confirmer</button>
              </div>
            </div>
          </>
        )}

        {/* Distinction */}
        {modal.type === 'distinction' && (
          <>
            <div className="flex items-center justify-between border-b border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
                <div>
                  <p className="text-xs text-neutral-400">Date de publicatuion : 11 Mai 2026</p>
                  <p className="font-bold text-neutral-900">{modal.data.label}</p>
                </div>
              </div>
              <button className="rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ background: DARK }}>Telecharger</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex min-h-64 items-center justify-center rounded border border-neutral-200 bg-neutral-50 p-8">
                <div className="w-full max-w-sm rounded-lg border-4 border-double border-blue-300 p-8 text-center">
                  <p className="mb-2 text-xs text-neutral-500">Ministère de la jeunesse, de l'éducation nationale et de la recherche</p>
                  <div className="my-4 border-t border-b border-blue-200 py-4">
                    <p className="font-serif text-2xl italic font-bold text-blue-900">{modal.data.label}</p>
                  </div>
                  <p className="text-xs text-neutral-500">est conféré à l'élève</p>
                  <div className="my-3 flex justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 font-bold text-lg">★</span>
                  </div>
                  <p className="text-[10px] text-neutral-400">www.mon-diplome.fr</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-neutral-100 p-4">
              <button onClick={close} className="rounded-md border border-neutral-300 px-6 py-2 text-sm font-medium hover:bg-neutral-50">Fermer</button>
            </div>
          </>
        )}

        {/* Sanction */}
        {modal.type === 'sanction' && (
          <>
            <div className="flex items-center justify-between border-b border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <FileText size={32} className="text-neutral-500" strokeWidth={1.4} />
                <div>
                  <p className="text-xs text-neutral-400">Date de publicatuion : 11 Mai 2026</p>
                  <p className="font-bold text-neutral-900">Note d'information</p>
                </div>
              </div>
              <button className="rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ background: DARK }}>Telecharger</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded border border-neutral-200 bg-white p-10 font-mono text-sm leading-7 text-neutral-700">
                <p className="mb-6 italic">&lt;Sur papier entête&gt;</p>
                <div className="mb-6">
                  <p>Nom, prénom</p>
                  <p>Adresse</p>
                  <p>CP - Ville</p>
                </div>
                <p className="mb-1 font-bold">A &lt;.Ville .&gt;, Le &lt;...&gt;</p>
                <p className="mb-6 underline">Lettre recommandée avec AR</p>
                <p className="mb-4">Monsieur,</p>
                <p className="mb-4">En application des dispositions de <strong>l'article 37 du code du travail et conformément au règlement intérieur,</strong> nous avons le regret de vous infliger la sanction suivante :</p>
                <p className="mb-1">Selon le cas :</p>
                <p className="mb-1"> Un deuxième blâme -une mise à pied de – ou = à 8 jours</p>
                <p> Un troisième blâme -un changement de service ou d'établissement</p>
              </div>
            </div>
            <div className="flex justify-end border-t border-neutral-100 p-4">
              <button onClick={close} className="rounded-md border border-neutral-300 px-6 py-2 text-sm font-medium hover:bg-neutral-50">Fermer</button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
