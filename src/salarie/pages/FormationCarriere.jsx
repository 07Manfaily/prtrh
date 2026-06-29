const IMG = {
  elearning: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
  azure:     'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
}

export default function FormationCarriere() {
  return (
    <div>
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Formation et Carrière</h1>
      </div>

      <div className="grid grid-cols-2">
        {[
          { img: IMG.elearning, label: 'Accedez à votre espace E learning' },
          { img: IMG.azure,     label: 'Accedez à votre espace Azure RH'    },
        ].map((b) => (
          <div key={b.label} className="relative h-[calc(100vh-112px)] overflow-hidden group cursor-pointer">
            <img src={b.img} alt={b.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-10 left-10">
              <span className="inline-block border border-white px-5 py-3 text-base font-medium text-white backdrop-blur-sm">
                {b.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
