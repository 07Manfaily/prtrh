import { useState } from 'react'

const DARK = '#161616'
const IMG = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80'

export default function ContactezRH() {
  const [form, setForm] = useState({ matricule: '', departement: '', objet: '', message: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div>
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Formation et Carrière</h1>
      </div>

      <div className="grid grid-cols-2">
        {/* Image side */}
        <div className="relative h-[calc(100vh-112px)] overflow-hidden">
          <img src={IMG} alt="Contact RH" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-12 py-10 bg-white">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">Formulaire de contact</h2>

          <form
            onSubmit={(e) => { e.preventDefault(); alert('Message envoyé !') }}
            className="space-y-5"
          >
            {[
              { key: 'matricule',   label: 'Identifiant / Matricule', placeholder: 'ex : 5454'                  },
              { key: 'departement', label: 'Departement',             placeholder: 'ex : Innovation'            },
              { key: 'objet',       label: 'Objet',                   placeholder: "ex : Demande d'assistance"  },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>
                <input
                  value={form[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                />
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">Message</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                placeholder="Ecrivez ici"
                rows={4}
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: DARK }}
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
