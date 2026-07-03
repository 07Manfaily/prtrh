import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  FileText,
  MessageSquare,
  Heart,
  Bookmark,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Charte couleurs Société Générale                                   */
/* ------------------------------------------------------------------ */
const RED = "#E9041E";
const DARK = "#161616";
const NAVY = "#101826";
const GRAY = "#f4f4f4";

/* ------------------------------------------------------------------ */
/*  Données (mock)                                                      */
/* ------------------------------------------------------------------ */
const IMG = {
  heroMeeting:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  welcomeMeeting:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  womanPro:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  magazine:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
  elearning:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  azure:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  party:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80",
  blood:
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=700&q=80",
  football:
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=700&q=80",
  mental:
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&q=80",
  burnout:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
};

const NAV = [
  { label: "Accueil", id: "accueil" },
  { label: "Mot de la RH", id: "mot-rh" },
  { label: "Documents réglémentaires", id: "documents" },
  { label: "Carrière", id: "carriere" },
  { label: "Evènements", id: "evenements" },
  { label: "Actualités", id: "actualites" },
];

const ESPACE_DOCS = [
  { label: "Attestation de travail", color: "#6C5CE7" },
  { label: "Attestation de congé", color: "#00B5AD" },
  { label: "Notes d’informations", color: "#F39C12" },
  { label: "Décisions RH", color: RED },
];

const REGLEMENTAIRES = [
  { title: "Règlement intérieur", action: "Télécharger" },
  { title: "Convention collective", action: "Télécharger" },
  { title: "Annuaire", action: "Consulter" },
];

const JOBS = [
  { title: "Data Analyste", tags: ["CDD"] },
  { title: "Data ingénieur", tags: ["CDI", "Interim"] },
];

const EVENTS = [
  { day: "01", month: "Mai", tags: ["Nouveau", "CE"], title: "Présentation CE", img: IMG.party },
  { day: "10", month: "Mai", tags: ["Nouveau", "Santé"], title: "Don de sang agent", img: IMG.blood },
  { day: "18", month: "Mai", tags: ["Sport", "CE"], title: "Match de gala SGCI vs BDU", img: IMG.football },
];

const NEWS = [
  { title: "La santé mentale au travail", date: "07/05/2026", img: IMG.mental },
  { title: "Le burnout existe vraiment", date: "07/05/2026", img: IMG.burnout },
  { title: "Santé alimentaire au travail", date: "07/05/2026", img: IMG.burger },
];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspe ndisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

/* ------------------------------------------------------------------ */
/*  Sous-composants                                                    */
/* ------------------------------------------------------------------ */
const Title = ({ children, light = false }) => (
  <div className="mb-10">
    <h2
      className="text-3xl md:text-4xl font-bold tracking-tight"
      style={{ color: light ? "#fff" : DARK }}
    >
      {children}
    </h2>
    <div className="mt-2 h-1 w-16 rounded-full" style={{ background: RED }} />
  </div>
);

const Logo = ({ light = false }) => (
  <div className="flex items-end gap-2 select-none">
    <div>
      <p
        className="text-[11px] font-extrabold tracking-[0.18em]"
        style={{ color: light ? "#fff" : DARK }}
      >
        VOTRE PORTAIL
      </p>
      <div className="h-[3px] w-7 my-[2px]" style={{ background: RED }} />
      <p
        className="text-3xl font-extrabold leading-none"
        style={{ color: light ? "#fff" : DARK }}
      >
        RH
      </p>
    </div>
    {!light && (
      <div className="flex items-center gap-1 pb-1">
        <span className="inline-block h-4 w-4" style={{ background: RED }} />
        <span className="text-[11px] font-bold leading-[1.05] text-black">
          SOCIETE
          <br />
          GENERALE
        </span>
      </div>
    )}
  </div>
);

const Tag = ({ children }) => (
  <span className="rounded bg-neutral-800 px-2 py-[3px] text-[11px] font-medium text-white">
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */
export default function PortailRH() {
  const [active, setActive] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // surligne l'onglet actif au scroll
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const onScroll = () => {
      const pos = window.scrollY + 140;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans antialiased text-neutral-800" style={{ background: "#fff" }}>
      {/* ============================= HEADER ============================ */}
      <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3">
          <button onClick={() => scrollTo("accueil")}>
            <Logo />
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm transition-colors hover:opacity-80"
                style={{
                  color: active === n.id ? RED : "#3a3a3a",
                  fontWeight: active === n.id ? 600 : 400,
                }}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="rounded-md px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              style={{ background: DARK }}
            >
              Connexion
            </button>
          </nav>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* menu mobile */}
        {menuOpen && (
          <div className="border-t border-neutral-100 bg-white px-5 py-3 lg:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="block w-full py-2 text-left text-sm"
                style={{ color: active === n.id ? RED : "#3a3a3a" }}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("espace")}
              className="mt-2 w-full rounded-md py-2 text-sm font-medium text-white"
              style={{ background: DARK }}
            >
              Connexion
            </button>
          </div>
        )}
      </header>

      {/* ============================= HERO ============================= */}
      <section id="accueil" className="relative overflow-hidden" style={{ background: DARK }}>
        <div className="flex min-h-[320px] items-stretch">
          <div className="flex flex-1 items-center px-[max(1.25rem,calc(50vw-50rem))] py-16">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                Bienvenue sur votre{" "}
                <span style={{ color: RED }}>portail RH</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-300">
                Retrouvez rapidement et facilement vos documents RH
              </p>
            </div>
          </div>
          <div className="hidden w-[42%] overflow-hidden rounded-tl-[80] md:block">
            <img src={IMG.welcomeMeeting} alt="Réunion" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ---------- Flash info ---------- */}
      <div style={{ background: "#FBE0E2" }}>
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-baseline gap-3 px-5 py-4">
          <span className="text-xl font-bold md:text-2xl" style={{ color: RED }}>
            Flash Info :
          </span>
          <span className="text-base text-neutral-800 md:text-lg">
            « Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. »
          </span>
        </div>
      </div>

      {/* ============================= MOT DE LA RH ===================== */}
      <section id="mot-rh" className="mx-auto max-w-[1600px] px-5 py-20">
        <Title>Mot de bienvenue RH</Title>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-neutral-50 p-7 text-sm leading-relaxed text-neutral-600">
            <p className="mb-4">{LOREM} {LOREM}</p>
            <p className="mb-4">{LOREM}</p>
            <p>{LOREM}</p>
          </div>
          <div className="overflow-hidden rounded-xl shadow-sm">
            <img src={IMG.welcomeMeeting} alt="Equipe RH" className="h-80 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ============================= ESPACE SALARIÉ =================== */}
      <section id="espace" style={{ background: GRAY }}>
        <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-5 py-16 md:grid-cols-[320px_1fr]">
          <div className="flex justify-center">
            <img
              src={IMG.womanPro}
              alt="Salariée"
              className="h-80 w-64 rounded-lg object-cover"
            />
          </div>
          <div>
            <Title>Espace salarié</Title>
            <p className="mb-8 max-w-2xl text-neutral-600">
              Cet espace personnel a été conçu pour vous offrir plus d’autonomie, de
              transparence et de réactivité dans la gestion de votre vie professionnelle au
              sein de la SGCI.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {ESPACE_DOCS.map((d) => (
                <div key={d.label} className="text-center">
                  <FileText className="mx-auto mb-2" size={42} style={{ color: d.color }} strokeWidth={1.6} />
                  <p className="text-sm font-semibold text-neutral-800">{d.label}</p>
                </div>
              ))}
            </div>
            <button
              className="rounded-md px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              style={{ background: DARK }}
            >
              Se connecter
            </button>
          </div>
        </div>
      </section>

      {/* ============================= DOCUMENTS RÉGLEMENTAIRES ========= */}
      <section id="documents" className="mx-auto max-w-[1600px] px-5 py-20">
        <Title>Documents réglementaires</Title>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          {REGLEMENTAIRES.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-xl bg-neutral-50 p-5">
              <FileText size={42} style={{ color: RED }} strokeWidth={1.6} className="shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{r.title}</h3>
                <p className="text-xs text-neutral-400">Date de dernière mise à jour : 00/00/0000</p>
                <button className="mt-2 flex items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70">
                  {r.action} <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* carte sombre */}
          <div className="flex flex-col items-center justify-between rounded-xl p-6 text-white" style={{ background: NAVY }}>
            <p className="text-lg font-bold">Bienvenue à</p>
            <img src={IMG.avatar} alt="Simbo Marina" className="my-4 h-24 w-24 rounded-full border-2 border-amber-400 object-cover" />
            <p className="font-medium">Simbo Marina</p>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full" style={{ background: i === 0 ? RED : "#3a4458" }} />
              ))}
            </div>
            <button className="mt-6 flex items-center gap-1 text-sm font-medium hover:opacity-80">
              Voir tout <ArrowUpRight size={15} />
            </button>
          </div>

          {/* magazine */}
          <div className="relative h-72 overflow-hidden rounded-xl">
            <img src={IMG.magazine} alt="Magazine" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-5 left-0 right-0 text-center text-white">
              <p className="text-lg font-bold">Magazine SikaFinance</p>
              <p className="text-sm opacity-90">Télécharger</p>
            </div>
          </div>

          {/* accès rapide */}
          <div className="rounded-xl bg-neutral-50 p-6">
            <h3 className="mb-5 text-lg font-bold text-neutral-900">Accès rapide</h3>
            <ul className="space-y-4">
              {ESPACE_DOCS.map((d) => (
                <li key={d.label} className="flex items-center gap-3 text-sm font-medium text-neutral-800">
                  <FileText size={20} style={{ color: d.color }} strokeWidth={1.7} />
                  {d.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================= CARRIÈRE ========================= */}
      <section id="carriere" className="mx-auto max-w-[1600px] px-5 py-16">
        <div className="flex items-start justify-between">
          <Title>Emplois - Formation - Mobilité</Title>
          <button className="hidden items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70 sm:flex">
            Voir tout <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="mb-6 flex justify-end gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: DARK }}>
            <ChevronLeft size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: DARK }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mb-12 grid gap-5 md:grid-cols-2">
          {JOBS.map((j) => (
            <div
              key={j.title}
              className="rounded-md bg-neutral-50 p-5"
              style={{ borderLeft: `4px solid ${RED}` }}
            >
              <h3 className="text-lg font-bold text-neutral-900">{j.title}</h3>
              <div className="mt-2 flex gap-2">
                {j.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70">
                Détails <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {[
            { img: IMG.elearning, label: "Accedez à votre espace E learning" },
            { img: IMG.azure, label: "Accedez à votre espace Azure RH" },
          ].map((b) => (
            <div key={b.label} className="relative h-64 overflow-hidden rounded-lg group">
              <img src={b.img} alt={b.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block border border-white px-4 py-2 text-base font-medium text-white backdrop-blur-sm">
                  {b.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================= EVÈNEMENTS ======================= */}
      <section id="evenements" style={{ background: GRAY }}>
        <div className="mx-auto max-w-[1600px] px-5 py-16">
          <div className="flex items-start justify-between">
            <Title>Evènements à venir</Title>
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-800 hover:opacity-70">
              Voir tout <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {EVENTS.map((e) => (
              <div key={e.title} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="relative h-40">
                  <img src={e.img} alt={e.title} className="h-full w-full object-cover" />
                  <div className="absolute left-0 top-6 px-3 py-2 text-center text-white" style={{ background: RED }}>
                    <p className="text-2xl font-bold leading-none">{e.day}</p>
                    <p className="text-xs">{e.month}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      {e.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <ArrowUpRight size={20} className="text-neutral-700" />
                  </div>
                  <h3 className="font-semibold text-neutral-900">{e.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= ACTUALITÉS ======================= */}
      <section id="actualites" style={{ background: DARK }}>
        <div className="mx-auto max-w-[1600px] px-5 py-20">
          <div className="flex items-start justify-between">
            <Title light>Actualités</Title>
            <button className="flex items-center gap-1 text-sm font-medium text-white hover:opacity-80">
              Voir tout <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {NEWS.map((n) => (
              <div key={n.title} className="overflow-hidden rounded-lg" style={{ background: "#1f1f1f" }}>
                <img src={n.img} alt={n.title} className="h-44 w-full object-cover" />
                <div className="p-5 text-neutral-300">
                  <h3 className="text-lg font-semibold text-white">{n.title}</h3>
                  <p className="my-2 text-sm text-neutral-400">{n.date}</p>
                  <p className="text-sm leading-relaxed">{LOREM}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={16} /> 3
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={16} /> 15
                      </span>
                      <Bookmark size={16} />
                    </div>
                    <button className="flex items-center gap-1 text-sm font-medium text-white hover:opacity-80">
                      Lire <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= FOOTER =========================== */}
      <footer>
        {/* bandeau contact */}
        <div style={{ background: DARK }}>
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-8">
            <div className="flex items-center gap-4">
              <Phone size={36} style={{ color: RED }} />
              <div className="text-white">
                <p className="text-sm">Pour plus d’informations RH</p>
                <p className="text-2xl font-bold">IP : 2302</p>
              </div>
            </div>
            <button className="rounded bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-[1.03]">
              Ecrivez-nous
            </button>
          </div>
        </div>

        {/* bandeau rouge */}
        <div style={{ background: RED }}>
          <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-12 md:grid-cols-3">
            <div className="text-white">
              <p className="text-xs font-bold tracking-[0.18em]">VOTRE PORTAIL</p>
              <div className="my-1 h-[2px] w-7 bg-white" />
              <p className="text-4xl font-extrabold">RH</p>
              <p className="mt-4 max-w-xs text-sm opacity-90">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="text-white">
              <h4 className="mb-4 text-lg font-bold">Liens rapides</h4>
              <ul className="space-y-3 text-sm">
                {["Mot de la RH", "Documents règlementaires", "Evènements", "Actualités", "Connexion"].map(
                  (l, i) => (
                    <li
                      key={l}
                      className="flex cursor-pointer items-center gap-2 hover:underline"
                      onClick={() =>
                        scrollTo(["mot-rh", "documents", "evenements", "actualites", "espace"][i])
                      }
                    >
                      <span className="text-xs">•</span> {l}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="text-white">
              <h4 className="mb-4 text-lg font-bold">Suivez nous sur</h4>
              <div className="flex gap-3">
                <a className="flex h-11 w-11 items-center justify-center rounded bg-white" style={{ color: RED }} href="#">
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a className="flex h-11 w-11 items-center justify-center rounded bg-white" style={{ color: RED }} href="#">
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1600px] px-5 pb-8">
            <p className="text-sm text-white/90">CopyrightRH SGCI 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
