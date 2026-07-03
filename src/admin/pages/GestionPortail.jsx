import { useState, useEffect } from 'react'
import { Phone, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services'

const RED  = '#E9041E'
const DARK = '#161616'

const TABS = [
  { key: 'banniere',   label: 'Bannière'             },
  { key: 'flash',      label: 'Flash info'            },
  { key: 'message',    label: 'Message Bienvenue'     },
  { key: 'media',      label: 'Image/Video Bienvenue' },
  { key: 'ip',         label: 'Adresse IP'            },
  { key: 'evenements', label: 'Evenements'            },
]

const IMG_MEETING = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
const IMG_HERO    = 'https://images.unsplash.com/photo-1560439514-e960a3ef5019?auto=format&fit=crop&w=900&q=80'
const IMG_EVENT   = 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80'

export default function GestionPortail() {
  const navigate = useNavigate()

  /* ── état onglets ── */
  const [activeTab,  setActiveTab]  = useState('banniere')
  const [flashInfos, setFlashInfos] = useState([''])
  const [message,    setMessage]    = useState('')
  const [mediaType,  setMediaType]  = useState('')
  const [ip,         setIp]         = useState('')
  const [event,      setEvent]      = useState({
    titre: '', debut: '', fin: '',
    registrationNumber: '', target: '',
    typeEvent: '', diffusionMode: '',
  })

  /* ── fichiers ── */
  const [bannerFile,     setBannerFile]     = useState(null)
  const [mediaFile,      setMediaFile]      = useState(null)
  const [coverImageFile, setCoverImageFile] = useState(null)

  /* ── feedback / loading ── */
  const [loading,  setLoading]  = useState(false)
  const [feedback, setFeedback] = useState(null) // { ok: bool, msg: string }

  const showFeedback = (ok, msg) => {
    setFeedback({ ok, msg })
    setTimeout(() => setFeedback(null), 4000)
  }

  /* ── chargement config au montage ── */
  useEffect(() => {
    adminService.getHome()
      .then((d) => {
        if (d?.flash_info)       setFlashInfos([d.flash_info])
        if (d?.welcome_message)  setMessage(d.welcome_message)
        if (d?.ip_address)       setIp(d.ip_address)
      })
      .catch(() => {}) // API hors ligne en dev — silencieux
  }, [])

  /* ── helpers flash info ── */
  const addFlash    = () => setFlashInfos((f) => [...f, ''])
  const changeFlash = (i, v) => setFlashInfos((f) => f.map((x, idx) => (idx === i ? v : x)))

  /* ── helpers aperçu événement ── */
  const fmtDay   = (d) => d ? new Date(d).getDate().toString().padStart(2, '0') : '01'
  const fmtMonth = (d) => d ? new Date(d).toLocaleString('fr-FR', { month: 'long' }) : 'Mai'

  /* ── soumission home config ── */
  async function submitHome(fields) {
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(fields).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') fd.append(k, v)
      })
      await adminService.updateHome(fd)
      showFeedback(true, 'Mise à jour effectuée avec succès.')
    } catch {
      showFeedback(false, 'Erreur lors de la mise à jour. Vérifiez la connexion API.')
    } finally {
      setLoading(false)
    }
  }

  /* ── soumission événement ── */
  async function submitEvent() {
    if (!event.titre || !event.debut || !event.fin || !event.registrationNumber || !event.typeEvent) {
      showFeedback(false, 'Veuillez remplir tous les champs obligatoires (*).')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('registration_number', event.registrationNumber)
      fd.append('start_date',          event.debut)
      fd.append('end_date',            event.fin)
      fd.append('title',               event.titre)
      fd.append('type_event',          event.typeEvent)
      if (event.target)        fd.append('target',         event.target)
      if (event.diffusionMode) fd.append('diffusion_mode', event.diffusionMode)
      if (coverImageFile)      fd.append('cover_image',    coverImageFile)
      await adminService.creerEvenement(fd)
      showFeedback(true, 'Évènement créé avec succès.')
      setEvent({ titre: '', debut: '', fin: '', registrationNumber: '', target: '', typeEvent: '', diffusionMode: '' })
      setCoverImageFile(null)
    } catch {
      showFeedback(false, 'Erreur lors de la création de l\'évènement.')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ label, required, children }) => (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  )

  const inputCls = "w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Administration portail</h1>
        <button
          onClick={() => navigate('/admin/offres/creer')}
          className="rounded-md px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: DARK }}
        >
          Créer une offre d'emploi
        </button>
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div
          className={`mb-4 flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-medium ${
            feedback.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {feedback.ok
            ? <CheckCircle size={18} className="shrink-0 text-green-600" />
            : <XCircle    size={18} className="shrink-0 text-red-600"   />}
          {feedback.msg}
        </div>
      )}

      {/* Formulaire */}
      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-neutral-500">Créer un(e)</h2>

        {/* Tab buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setFeedback(null) }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? 'bg-neutral-900 text-white'
                  : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Bannière ── */}
        {activeTab === 'banniere' && (
          <div>
            <label
              className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 py-16 text-center hover:bg-neutral-50"
              htmlFor="banniere-input"
            >
              <p className="text-sm text-neutral-500">
                {bannerFile ? bannerFile.name : 'Ajoutez une bannière de taille 1024px x 300px'}
              </p>
              <input
                id="banniere-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setBannerFile(e.target.files[0] || null)}
              />
            </label>
            <div className="flex justify-end">
              <button
                disabled={loading || !bannerFile}
                onClick={() => submitHome({ banner: bannerFile })}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Uploader'}
              </button>
            </div>
          </div>
        )}

        {/* ── Flash info ── */}
        {activeTab === 'flash' && (
          <div>
            {flashInfos.map((info, i) => (
              <div key={i} className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Info {i + 1}</label>
                <textarea
                  value={info}
                  onChange={(e) => changeFlash(i, e.target.value)}
                  placeholder="Votre info ici"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                />
              </div>
            ))}
            <div className="flex justify-end gap-3">
              <button
                onClick={addFlash}
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Ajouter une autre info
              </button>
              <button
                disabled={loading}
                onClick={() => submitHome({ flash_info: flashInfos.filter(Boolean).join(' | ') })}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Valider'}
              </button>
            </div>
          </div>
        )}

        {/* ── Message Bienvenue ── */}
        {activeTab === 'message' && (
          <div>
            <Field label="Message de Bienvenue">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message ici"
                rows={5}
                className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
              />
            </Field>
            <div className="flex justify-end">
              <button
                disabled={loading}
                onClick={() => submitHome({ welcome_message: message })}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Valider'}
              </button>
            </div>
          </div>
        )}

        {/* ── Image/Video Bienvenue ── */}
        {activeTab === 'media' && (
          <div>
            <Field label="Type de fichier">
              <div className="relative">
                <select
                  value={mediaType}
                  onChange={(e) => { setMediaType(e.target.value); setMediaFile(null) }}
                  className={inputCls + ' appearance-none'}
                >
                  <option value="">Sélectionner</option>
                  <option value="image">Image</option>
                  <option value="video">Vidéo</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">▾</span>
              </div>
            </Field>
            <label
              className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 py-12 text-center hover:bg-neutral-50"
              htmlFor="media-input"
            >
              <p className="text-sm text-neutral-500">
                {mediaFile ? mediaFile.name : `Ajoutez une ${mediaType === 'video' ? 'vidéo' : 'image'}`}
              </p>
              <input
                id="media-input"
                type="file"
                accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                className="hidden"
                onChange={(e) => setMediaFile(e.target.files[0] || null)}
              />
            </label>
            <div className="flex justify-end">
              <button
                disabled={loading || !mediaFile}
                onClick={() => submitHome(
                  mediaType === 'video'
                    ? { welcome_video: mediaFile }
                    : { welcome_image: mediaFile }
                )}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Valider'}
              </button>
            </div>
          </div>
        )}

        {/* ── Adresse IP ── */}
        {activeTab === 'ip' && (
          <div>
            <Field label="IP">
              <input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Ex: 2302"
                className={inputCls}
              />
            </Field>
            <div className="flex justify-end">
              <button
                disabled={loading}
                onClick={() => submitHome({ ip_address: ip })}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Valider'}
              </button>
            </div>
          </div>
        )}

        {/* ── Evènements ── */}
        {activeTab === 'evenements' && (
          <div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Titre évènement" required>
                <input
                  value={event.titre}
                  onChange={(e) => setEvent((v) => ({ ...v, titre: e.target.value }))}
                  placeholder="Ex : Présentation CE"
                  className={inputCls}
                />
              </Field>
              <Field label="N° d'enregistrement" required>
                <input
                  value={event.registrationNumber}
                  onChange={(e) => setEvent((v) => ({ ...v, registrationNumber: e.target.value }))}
                  placeholder="Ex : EVT-2026-001"
                  className={inputCls}
                />
              </Field>
              <Field label="Date de début" required>
                <input
                  type="date"
                  value={event.debut}
                  onChange={(e) => setEvent((v) => ({ ...v, debut: e.target.value }))}
                  className={inputCls}
                />
              </Field>
              <Field label="Date de fin" required>
                <input
                  type="date"
                  value={event.fin}
                  onChange={(e) => setEvent((v) => ({ ...v, fin: e.target.value }))}
                  className={inputCls}
                />
              </Field>
              <Field label="Type d'évènement" required>
                <input
                  value={event.typeEvent}
                  onChange={(e) => setEvent((v) => ({ ...v, typeEvent: e.target.value }))}
                  placeholder="Ex : CE, Sport, Santé…"
                  className={inputCls}
                />
              </Field>
              <Field label="Cible (target)">
                <input
                  value={event.target}
                  onChange={(e) => setEvent((v) => ({ ...v, target: e.target.value }))}
                  placeholder="Ex : Tous les salariés"
                  className={inputCls}
                />
              </Field>
              <Field label="Mode de diffusion">
                <input
                  value={event.diffusionMode}
                  onChange={(e) => setEvent((v) => ({ ...v, diffusionMode: e.target.value }))}
                  placeholder="Ex : Email, Intranet…"
                  className={inputCls}
                />
              </Field>
              <Field label="Image de couverture">
                <label
                  htmlFor="cover-input"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 py-3 text-sm text-neutral-500 hover:bg-neutral-50"
                >
                  {coverImageFile ? coverImageFile.name : 'Choisir un fichier'}
                  <input
                    id="cover-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setCoverImageFile(e.target.files[0] || null)}
                  />
                </label>
              </Field>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                disabled={loading}
                onClick={submitEvent}
                className="rounded-md px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: DARK }}
              >
                {loading ? 'Envoi...' : 'Valider'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Aperçu ── */}
      <h2 className="mb-4 text-lg font-bold text-neutral-900">Aperçu</h2>

      {activeTab === 'banniere' && (
        <div className="overflow-hidden rounded-xl" style={{ background: DARK }}>
          <div className="flex min-h-[200px] items-stretch">
            <div className="flex flex-1 items-center px-10 py-8">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Bienvenue sur votre{' '}
                  <span style={{ color: RED }}>portail RH</span>
                </h2>
                <p className="mt-2 text-neutral-300">Retrouvez rapidement et facilement vos documents RH</p>
              </div>
            </div>
            <div className="hidden w-[40%] overflow-hidden rounded-tl-[60px] md:block">
              <img src={IMG_HERO} alt="Hero" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'flash' && (
        <div className="rounded-xl px-8 py-5" style={{ background: '#fef2f2' }}>
          <p className="text-lg">
            <span className="font-bold" style={{ color: RED }}>Flash Info : </span>
            <span className="text-neutral-700">
              "{flashInfos[0] || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}"
            </span>
          </p>
        </div>
      )}

      {activeTab === 'message' && (
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-neutral-200">
          <div className="p-8 text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
            {message || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'}
          </div>
          <div className="overflow-hidden">
            <img src={IMG_MEETING} alt="Meeting" className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-neutral-200">
          <div className="p-8 text-sm leading-relaxed text-neutral-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
          </div>
          <div className="overflow-hidden">
            <img src={IMG_MEETING} alt="Meeting" className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {activeTab === 'ip' && (
        <div className="flex items-center justify-between rounded-xl px-10 py-8" style={{ background: DARK }}>
          <div className="flex items-center gap-5">
            <Phone size={40} style={{ color: RED }} />
            <div className="text-white">
              <p className="text-sm text-neutral-400">Pour plus d'informations RH</p>
              <p className="text-2xl font-bold">IP : {ip || '2302'}</p>
            </div>
          </div>
          <button className="rounded-md border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-900">
            Ecrivez-nous
          </button>
        </div>
      )}

      {activeTab === 'evenements' && (
        <div className="w-72">
          <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
            <div className="relative">
              <img
                src={coverImageFile ? URL.createObjectURL(coverImageFile) : IMG_EVENT}
                alt="Event"
                className="h-44 w-full object-cover"
              />
              <div
                className="absolute bottom-0 left-0 flex min-w-[56px] flex-col items-center justify-center px-4 py-2 text-white"
                style={{ background: RED }}
              >
                <span className="text-2xl font-bold leading-none">{fmtDay(event.debut)}</span>
                <span className="text-sm font-medium capitalize">{fmtMonth(event.debut)}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="rounded-md px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: DARK }}>
                    {event.typeEvent || 'Nouveau'}
                  </span>
                  {event.target && (
                    <span className="rounded-md px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: DARK }}>
                      {event.target}
                    </span>
                  )}
                </div>
                <span className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-800">↗</span>
              </div>
              <p className="font-bold text-neutral-900">{event.titre || 'Présentation CE'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
