// app/page.tsx
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, CLOUD_API_URL, DOAR_URL, VIDEO_INSTITUCIONAL_URL } from "@/lib/constants";
import type { DadosObra } from "@/lib/types";
import { contasObra } from "@/lib/obra-tijolos";
import IgrejaTijolos from "@/components/obra/IgrejaTijolos";

const pc = (v: number) => (Math.round(v * 10) / 10).toLocaleString("pt-PT");

// A obra vem do portal (financeiro → "A nossa obra"); os tijolos saem do dinheiro.
// Se a API falhar, mostra a campanha sem tijolos pintados.
async function getDadosObra(): Promise<DadosObra> {
  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/obra`, { next: { revalidate: 60 } });
    const json = await res.json();
    if (json.ok && json.data && json.data.valorTijolo) return json.data;
  } catch {
    console.error("Aviso: Erro ao buscar dados da obra na API Cloud.");
  }
  return {
    titulo: "Construção da nossa Igreja",
    descricao: "Acompanhe os passos de fé para a nossa sede na Figueira da Foz.",
    valorObra: 200000,
    valorTijolo: 1000,
    arrecadado: 0,
    videoUrl: VIDEO_INSTITUCIONAL_URL,
  };
}

export default async function HomePage() {
  const obra = await getDadosObra();
  const tijolos = contasObra(obra);

  return (
    <main className="space-y-16 pb-16 animate-in fade-in duration-700">

      {/* 1. HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-soft bg-bg2">
        <div className="absolute inset-0">
          <img
            src="/images/hero_teste.png"
            alt="Culto e comunhao na ADMVC"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(63,107,79,0.35)] via-transparent to-transparent" />
          <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.65)]" />
        </div>

        <div className="relative z-10 p-6 md:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--g-figueira)" }} />
              {SITE_NAME} • Figueira da Foz · Montemor · Barcelos
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              {SITE_TAGLINE.includes("uma família") ? (
                <>Mais que uma igreja, <span className="text-figueira drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">uma família</span></>
              ) : (
                <span className="text-figueira">{SITE_TAGLINE}</span>
              )}
            </h1>

            <p className="max-w-2xl text-base md:text-lg text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Na ADMVC, você encontra uma família apaixonada por Jesus e por pessoas.
              Acreditamos que todo filho de Deus pode ser cuidado e capacitado.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/congregacoes" className="btn btn-primary">Visite-nos</Link>
              <Link href="/membros/dashboard" className="btn btn-ghost bg-black/35 text-white border-white/25 hover:bg-black/55">
                🔒 Área de Membros
              </Link>
              <Link href="/permanecer" className="btn btn-ghost bg-black/35 text-white border-white/25 hover:bg-black/55">
                Permanecer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESSENCIA */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-figueira">Jesus e o centro. Pessoas são a missão.</h2>
          <p className="text-muted max-w-3xl">A nossa fé é cristocêntrica e a nossa prática é servir e cuidar de pessoas.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard title="Cristo e o Centro" text="Jesus Cristo e o centro de tudo o que fazemos." reference="Cl 1:17-18" />
          <FeatureCard title="Serviço com Propósito" text="Servindo a Deus ao servir pessoas." reference="Mc 10:45 / Gl 5:13" />
          <FeatureCard title="Esperanca e Novo Comeco" text="Ha esperanca e um novo comeco em Cristo." reference="Jr 29:11" />
        </div>
      </section>

      {/* 3. A OBRA EM TIJOLOS (pública: tijolos e percentagem, sem valores em euros) */}
      <section className="relative overflow-hidden rounded-[3rem] border-2 border-figueira/30 bg-bg2 p-8 md:p-12 shadow-xl shadow-figueira/5">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-figueira/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-figueira text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-figueira/20">
              Passos de Fé • Campanha Ativa
            </div>
            <h2 className="text-3xl md:text-4xl font-black italic text-fg tracking-tighter uppercase leading-none">{obra.titulo}</h2>
            <p className="text-muted leading-relaxed max-w-xl">{obra.chamada || obra.descricao}</p>

            <div className="flex gap-8">
              <div>
                <p className="text-4xl md:text-5xl font-black italic leading-none" style={{ color: "#C1663A" }}>{tijolos.colocados}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Tijolos colocados</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black italic leading-none text-fg">{tijolos.faltam}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Ainda faltam</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(128,128,128,.25)" }}>
                <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${tijolos.pct}%`, background: "#C1663A" }} />
              </div>
              <p className="text-sm font-bold text-fg">
                {tijolos.pct >= 100 ? "Obra financiada! Obrigado." : `${pc(tijolos.pct)}% da obra · cada tijolo conta`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={DOAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Contribuir
              </a>
              {obra.videoUrl && (
                <a href={obra.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Ver o projeto
                </a>
              )}
            </div>

            {obra.versiculo && (
              <blockquote className="text-sm italic text-muted border-l-2 border-figueira/40 pl-4">
                “{obra.versiculo}”{obra.versiculoRef && <span className="not-italic font-bold"> — {obra.versiculoRef}</span>}
              </blockquote>
            )}
          </div>

          <IgrejaTijolos colocados={tijolos.colocados} total={tijolos.total} className="w-full max-w-md mx-auto text-fg order-first md:order-last" />
        </div>
      </section>

      {/* 4. QUEM SOMOS */}
      <section className="grid gap-8 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-figueira">Quem somos</h2>

          <p className="text-muted">
            A Assembleia de Deus – Ministério Visão de Conquista é uma igreja cristã comprometida
            com a Palavra de Deus, com a família e com a transformação de vidas por meio do
            Evangelho de Jesus Cristo.
          </p>

          <p className="text-muted">
            Acreditamos que todo filho de Deus pode ser cuidado e capacitado. Depois de passar
            por esse processo, torna-se apto a gerar transformação e levar as Boas Novas a todo o
            mundo, como a Biblia nos ordena.
          </p>

          <div className="pt-2">
            <Link href="/sobre" className="text-figueira underline underline-offset-4">
              Conheca a ADMVC
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="Acolhimento" desc="Uma comunidade que recebe, cuida e caminha junto." />
          <FeatureCard title="Discipulado" desc="Crescimento espiritual com base na Palavra de Deus." />
          <FeatureCard title="Serviço" desc="Servir e parte da nossa cultura crista e comunitaria." />
          <FeatureCard title="Unidade" desc="Mais que uma igreja, uma familia — em amor e comunhao." />
        </div>
      </section>

      {/* 5. CONGREGACOES */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-figueira">
              Nossas Congregações
            </h2>
            <p className="text-muted">Sede como principal, com congregações em Montemor e Barcelos.</p>
          </div>
          <Link href="/congregacoes" className="text-figueira underline underline-offset-4">
            Ver horários e endereços
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PlaceCard badge="Sede" title="Figueira da Foz" desc="Cultos e encontros semanais" accent="figueira" />
          <PlaceCard badge="Congregação" title="Montemor" desc="Uma comunidade em crescimento" accent="soft" />
          <PlaceCard badge="Congregação" title="Barcelos" desc="Caminhando juntos em fé" accent="deep" />
        </div>
      </section>

      {/* 6. VIDA NA IGREJA / MINISTERIOS */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-figueira">Vida na Igreja</h2>
            <p className="text-muted">Ministérios que fortalecem a fe, a comunhão e o serviço.</p>
          </div>
          <Link href="/ministerios" className="text-figueira underline underline-offset-4">
            Conheca nossos ministérios
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MiniCard title="Infantil" />
          <MiniCard title="Jovens" />
          <MiniCard title="Louvor" />
          <MiniCard title="Acao Social" />
          <MiniCard title="Família" />
          <MiniCard title="Discipulado" />
        </div>
      </section>

      {/* 7. ANCORA BIBLICA */}
      <section className="rounded-2xl border border-soft bg-bg2 p-8 text-center md:text-left">
        <div className="border-l-4 md:pl-6 border-figueira inline-block">
          <p className="text-xl md:text-2xl italic text-fg">"Jesus Cristo e o centro de tudo o que fazemos."</p>
          <div className="pt-2 text-sm text-muted2 font-medium">Colossenses 1:17-18</div>
        </div>
      </section>

      {/* 8. CALLOUTS FINAIS */}
      <section className="grid gap-4 md:grid-cols-2">
        <Callout title="Quer tornar-se membro?" desc="O Permanecer e o caminho para se integrar a nossa família." ctaLabel="Saber mais" ctaHref="/permanecer" variant="soft" />
        <Callout
          title="Área de Membros"
          desc="Acesso exclusivo para membros da ADMVC. Entre para acompanhar as suas escalas e comunicados."
          ctaLabel="Entrar"
          ctaHref="/membros/dashboard"
          variant="figueira"
          lock
        />
      </section>

    </main>
  );
}

// --- COMPONENTES AUXILIARES ---

function FeatureCard({ title, desc, text, reference }: { title: string; desc?: string; text?: string; reference?: string; }) {
  return (
    <div className="rounded-2xl border border-soft bg-bg2 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--g-soft)" }} />
        <h3 className="font-semibold text-fg text-sm">{title}</h3>
      </div>
      {desc && <p className="mt-2 text-xs text-muted leading-relaxed">{desc}</p>}
      {text && (
        <>
          <p className="mt-3 text-sm text-fg leading-relaxed">"{text}"</p>
          <div className="mt-2 text-[10px] font-bold text-figueira uppercase tracking-wider">{reference}</div>
        </>
      )}
    </div>
  );
}

function PlaceCard({ badge, title, desc, accent }: { badge: string; title: string; desc: string; accent: "figueira" | "deep" | "soft"; }) {
  const accentColor = accent === "figueira" ? "rgba(63,107,79,0.15)" : accent === "deep" ? "rgba(46,79,58,0.15)" : "rgba(127,174,147,0.15)";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-soft bg-bg2 p-5 group cursor-default">
      <div aria-hidden className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl transition-opacity group-hover:opacity-80" style={{ background: accentColor }} />
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center rounded-full border border-soft bg-bg px-2.5 py-0.5 text-[10px] font-bold text-muted uppercase">{badge}</div>
        <h3 className="text-lg font-bold text-fg">{title}</h3>
        <p className="text-xs text-muted">{desc}</p>
      </div>
    </div>
  );
}

function Callout({ title, desc, ctaLabel, ctaHref, external, variant, lock }: { title: string; desc: string; ctaLabel: string; ctaHref: string; external?: boolean; variant: "figueira" | "soft"; lock?: boolean; }) {
  const bg = variant === "figueira" ? "rgba(63,107,79,0.12)" : "rgba(127,174,147,0.12)";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-soft bg-bg2 p-6 md:p-8">
      <div aria-hidden className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-50" style={{ background: bg }} />
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl font-bold text-fg">{lock ? "🔒 " : ""}{title}</h3>
        <p className="text-sm text-muted max-w-xs">{desc}</p>
        <Link href={ctaHref} className="btn btn-primary inline-flex">{ctaLabel}</Link>
      </div>
    </div>
  );
}

function MiniCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-soft bg-bg2 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-fg">{title}</h3>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--g-figueira)" }} />
      </div>
      <p className="mt-2 text-sm text-muted">Conteúdo e atividades voltadas para edificação e comunhão.</p>
    </div>
  );
}
