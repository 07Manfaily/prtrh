import { useState, useMemo } from 'react'
import { Search, X, Plus, UserCog, SquarePen, Check } from 'lucide-react'

const DARK   = '#161616'
const RED    = '#E9041E'
const PURPLE = '#7C3AED'
const BLUE   = '#2563EB'
const ROLES  = ['Admin', 'HRBP', 'Gestionnaire']

const INIT_PROFILES = [
  { id: 1, nom: 'Koné Mohamed',     roles: ['Admin'] },
  { id: 2, nom: 'Konan Lionel',     roles: ['Admin'] },
  { id: 3, nom: 'Allou Mariette',   roles: ['Admin', 'HRBP'] },
  { id: 4, nom: 'Jean Yves Vangah', roles: ['Admin'] },
]

const MOCK_USERS = [
  { id: 10, nom: 'Kacou Christian Jean Marc', matricule: '4758' },
  { id: 11, nom: 'Kouassi Ange Patricia',      matricule: '4761' },
  { id: 12, nom: 'Konan Yves Martial',          matricule: '4762' },
  { id: 13, nom: 'Traoré Fatou Mariam',         matricule: '4763' },
]

export default function GestionHabilitation() {
  const [profiles,     setProfiles]     = useState(INIT_PROFILES)
  const [search,       setSearch]       = useState('')
  const [modal,        setModal]        = useState(null) // null | 'add' | 'edit' | 'delete'
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [feedback,     setFeedback]     = useState(null) // { type, msg }

  /* ── état du modal Modification ── */
  const [editTarget, setEditTarget] = useState(null)
  const [editRoles,  setEditRoles]  = useState([])

  /* ── état du modal Ajout ── */
  const [addRole,      setAddRole]      = useState('Admin')
  const [addSearch,    setAddSearch]    = useState('')
  const [addMatricule, setAddMatricule] = useState('')
  const [addSelected,  setAddSelected]  = useState(null)

  const searchResults = useMemo(
    () => addSearch.length >= 2
      ? MOCK_USERS.filter(u => u.nom.toLowerCase().includes(addSearch.toLowerCase()))
      : [],
    [addSearch],
  )

  const filtered = profiles.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()),
  )

  function showFeedback(type, msg) {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 4000)
  }

  function openAdd() {
    setAddRole('Admin')
    setAddSearch('')
    setAddMatricule('')
    setAddSelected(null)
    setModal('add')
  }

  function openDelete(profile) {
    setDeleteTarget(profile)
    setModal('delete')
  }

  function openEdit(profile) {
    setEditTarget(profile)
    setEditRoles(profile.roles)
    setModal('edit')
  }

  function toggleEditRole(role) {
    setEditRoles(r => r.includes(role) ? r.filter(x => x !== role) : [...r, role])
  }

  function closeModal() {
    setModal(null)
    setDeleteTarget(null)
    setEditTarget(null)
    setEditRoles([])
  }

  function confirmAdd() {
    if (!addSelected) return
    setProfiles(p => [...p, { id: Date.now(), nom: addSelected.nom, roles: [addRole] }])
    closeModal()
    showFeedback('success', 'Profil ajouté avec succès')
  }

  function confirmDelete() {
    setProfiles(p => p.filter(x => x.id !== deleteTarget.id))
    closeModal()
    showFeedback('success', 'Profil supprimé avec succès')
  }

  function confirmEdit() {
    if (!editRoles.length) return
    setProfiles(p => p.map(x => x.id === editTarget.id ? { ...x, roles: editRoles } : x))
    closeModal()
    showFeedback('success', 'Profil modifié avec succès')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Gestion des habilitations</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: PURPLE }}
        >
          <Plus size={16} />
          Ajouter un profil
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mb-5 flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium ${
          feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full border-2 ${
              feedback.type === 'success' ? 'border-green-600' : 'border-red-600'
            }`} />
            {feedback.msg}
          </div>
          <button onClick={() => setFeedback(null)}><X size={16} /></button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher libellé"
          className="w-full rounded-lg border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-neutral-400"
        />
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {filtered.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <UserCog size={28} className="text-neutral-500" strokeWidth={1.5} />
              <span className="font-semibold text-neutral-900">{p.nom}</span>
            </div>
            <div className="flex items-center gap-3">
              {ROLES.map(r => (
                <span
                  key={r}
                  className={`rounded px-3 py-1 text-xs font-semibold ${
                    p.roles.includes(r)
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 text-neutral-400'
                  }`}
                >
                  {r}
                </span>
              ))}
              <button
                onClick={() => openEdit(p)}
                className="ml-1 text-blue-500 transition-colors hover:text-blue-700"
              >
                <SquarePen size={18} />
              </button>
              <button
                onClick={() => openDelete(p)}
                className="text-red-400 transition-colors hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modals ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <UserCog size={26} className="text-neutral-500" strokeWidth={1.5} />
                <h2 className="text-lg font-bold text-neutral-900">
                  {modal === 'add' ? 'Ajout de profil' : modal === 'edit' ? 'Modifier profil' : 'Suppression profil'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg border border-neutral-300 px-5 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Fermer
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6">
              <div className="rounded-xl border border-neutral-100 p-6">

                {/* ── Modal Ajout ── */}
                {modal === 'add' && (
                  <>
                    <p className="mb-3 text-sm font-semibold text-neutral-700">Sélectionnez un rôle</p>
                    <div className="mb-6 flex gap-2">
                      {ROLES.map(r => (
                        <button
                          key={r}
                          onClick={() => setAddRole(r)}
                          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                            addRole === r
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-500 hover:bg-neutral-100'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>

                    <p className="mb-3 text-sm font-semibold text-neutral-700">Sélectionnez un profil par</p>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-xs text-neutral-500">Matricule Salarié</label>
                        <input
                          value={addMatricule}
                          onChange={e => setAddMatricule(e.target.value)}
                          placeholder="Ex: 4758"
                          className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-neutral-500">Recherche</label>
                        <div className="relative">
                          <input
                            value={addSearch}
                            onChange={e => { setAddSearch(e.target.value); setAddSelected(null) }}
                            placeholder="Ex : Kacou Jean Marc"
                            className="w-full rounded-lg border border-neutral-200 px-4 py-3 pr-10 text-sm outline-none focus:border-neutral-400"
                          />
                          {addSearch ? (
                            <button
                              onClick={() => { setAddSearch(''); setAddSelected(null) }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                            >
                              <X size={15} />
                            </button>
                          ) : (
                            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Résultats recherche */}
                    {searchResults.length > 0 && !addSelected && (
                      <div className="mb-4 space-y-1 rounded-lg border border-neutral-100">
                        {searchResults.map(u => (
                          <button
                            key={u.id}
                            onClick={() => { setAddSelected(u); setAddSearch(u.nom) }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 first:rounded-t-lg last:rounded-b-lg"
                          >
                            <UserCog size={20} className="shrink-0 text-neutral-500" strokeWidth={1.5} />
                            <span className="font-semibold text-neutral-900">{u.nom}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Utilisateur sélectionné */}
                    {addSelected && (
                      <div className="mb-4 flex items-center gap-3">
                        <UserCog size={22} className="text-neutral-500" strokeWidth={1.5} />
                        <span className="font-semibold text-neutral-900">{addSelected.nom}</span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={confirmAdd}
                        disabled={!addSelected}
                        className="rounded-lg px-6 py-3 text-sm font-semibold text-white disabled:opacity-40"
                        style={{ background: DARK }}
                      >
                        Confirmer
                      </button>
                    </div>
                  </>
                )}

                {/* ── Modal Modification ── */}
                {modal === 'edit' && editTarget && (
                  <>
                    <p className="mb-3 text-sm font-semibold text-neutral-700">Rôles</p>
                    <div className="mb-8 flex gap-2">
                      {ROLES.map(r => {
                        const active = editRoles.includes(r)
                        return (
                          <button
                            key={r}
                            onClick={() => toggleEditRole(r)}
                            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                              active
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                            }`}
                          >
                            {r}
                            {active ? <X size={14} /> : <Check size={14} />}
                          </button>
                        )
                      })}
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                      <UserCog size={24} className="text-neutral-500" strokeWidth={1.5} />
                      <span className="font-semibold text-neutral-900">{editTarget.nom}</span>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={confirmEdit}
                        disabled={!editRoles.length}
                        className="rounded-lg px-10 py-3 text-sm font-semibold text-white disabled:opacity-40"
                        style={{ background: BLUE }}
                      >
                        Modifier
                      </button>
                    </div>
                  </>
                )}

                {/* ── Modal Suppression ── */}
                {modal === 'delete' && deleteTarget && (
                  <>
                    <p className="mb-3 text-sm font-semibold text-neutral-700">Rôle</p>
                    <div className="mb-6 flex gap-3">
                      {ROLES.map(r => (
                        <span
                          key={r}
                          className={`rounded-md px-4 py-2 text-sm font-semibold ${
                            deleteTarget.roles.includes(r)
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-400'
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                      <UserCog size={24} className="text-neutral-500" strokeWidth={1.5} />
                      <span className="font-semibold text-neutral-900">{deleteTarget.nom}</span>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={confirmDelete}
                        className="rounded-lg px-10 py-3 text-sm font-semibold text-white"
                        style={{ background: RED }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
