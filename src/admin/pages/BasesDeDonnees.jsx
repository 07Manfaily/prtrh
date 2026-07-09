import { useEffect, useRef, useState } from 'react'
import { ChevronDown, FileText, Info, Trash2, Upload, X, Check } from 'lucide-react'

const DARK = '#161616'

const TYPES = ['Liste du personnel']

const INIT_HISTORY = [
  { id: 1, date: '11 Mai 2026', label: 'Liste du personnel 10022026' },
  { id: 2, date: '11 Mai 2026', label: 'Liste du personnel 15062026' },
]

export default function BasesDeDonnees() {
  const [dbType, setDbType]   = useState('')
  const [file, setFile]       = useState(null)
  const [progress, setProgress] = useState(0)
  const [history, setHistory] = useState(INIT_HISTORY)
  const [feedback, setFeedback] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!file || progress >= 100) return
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 20)), 150)
    return () => clearTimeout(t)
  }, [file, progress])

  const grouped = history.reduce((acc, h) => {
    acc[h.date] = acc[h.date] || []
    acc[h.date].push(h)
    return acc
  }, {})

  function handleTypeChange(e) {
    setDbType(e.target.value)
    setFile(null)
    setProgress(0)
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setProgress(0)
    e.target.value = ''
  }

  function removeFile() {
    setFile(null)
    setProgress(0)
  }

  function handleConfirm() {
    if (!dbType || !file || progress < 100) return
    const label = file.name.replace(/\.[^/.]+$/, '')
    setHistory((h) => [{ id: Date.now(), date: '11 Mai 2026', label }, ...h])
    setDbType('')
    setFile(null)
    setProgress(0)
    setFeedback('Base de donné ajoutée avec succès')
    setTimeout(() => setFeedback(null), 4000)
  }

  const canConfirm = dbType && file && progress === 100

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">Bases de données</h1>

      {feedback && (
        <div className="mb-6 flex items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <div className="flex items-center gap-2">
            <Info size={16} />
            {feedback}
          </div>
          <button onClick={() => setFeedback(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Uploader une base de données */}
      <div className="mb-8 rounded-xl bg-neutral-50 border border-neutral-100 px-6 py-6">
        <h2 className="mb-4 text-base font-bold text-neutral-900">Uploader une base de données</h2>

        <label className="mb-2 block text-sm text-neutral-500">Type de base de données</label>
        <div className="relative mb-4 max-w-xl">
          <select
            value={dbType}
            onChange={handleTypeChange}
            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none focus:border-neutral-400"
          >
            <option value="" disabled>Ex : Liste</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        </div>

        {dbType && (
          <div className="mb-4 max-w-xl">
            {!file ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 py-6 text-sm text-neutral-500 hover:bg-neutral-100"
              >
                <Upload size={16} />
                Cliquer pour choisir un fichier Excel
              </button>
            ) : (
              <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <FileText size={32} className="shrink-0 text-neutral-400" strokeWidth={1.4} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">{file.name.replace(/\.[^/.]+$/, '')}</p>
                  <p className="mb-1.5 text-xs text-neutral-400">Fichier Excel</p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="w-9 shrink-0 text-right text-xs text-neutral-500">{progress}%</span>
                {progress === 100 && <Check size={18} className="shrink-0 text-green-600" />}
                <button onClick={removeFile} className="shrink-0 text-red-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx,.csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="rounded-md px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          style={{ background: DARK }}
        >
          Confirmer
        </button>
      </div>

      {/* Historique */}
      <h2 className="mb-4 text-lg font-bold text-neutral-900">Historique d'upload de base de donnée</h2>

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">{date}</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="space-y-3">
            {items.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between rounded-xl bg-neutral-50 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <FileText size={32} className="text-neutral-400" strokeWidth={1.4} />
                  <span className="font-bold text-neutral-900">{h.label}</span>
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
