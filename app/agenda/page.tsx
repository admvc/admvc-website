// app/agenda/page.tsx
// Selecione a unidade ADMVC para visualizar a agenda
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda Semanal",
  description:
    "Agenda semanal da ADMVC — cultos, ensino, discipulado e comunhao. Consulte os horarios da Sede e das congregacoes.",
};

type Evento = {
  dia: string;
  hora: string;
  titulo: string;
  descricao: string;
  badge?: string;
};

type UnidadeKey = "sede" | "leiria" | "barcelos";

const SEDE_SEMANAL: Evento[] = [
  {
    dia: "Quarta-feira",
    hora: "A partir das 20:00",
    titulo: "Culto — Quartas Proféticas",
    descricao:
      "Um tempo de oração, palavra e sensibilidade à direção de Deus, marcado pela busca espiritual, encorajamento e edificação da igreja."
  },
  {
    dia: "Quinta-feira",
    hora: "A partir das 20:00",
    titulo: "Escola de Líderes",
    badge: "Exclusivo para membros",
    descricao:
      "Formação, discipulado e preparação de líderes, com foco em alinhamento espiritual e fortalecimento da liderança cristã."
  },
  {
    dia: "Sexta-feira",
    hora: "A partir das 20:00",
    titulo: "Faculdade de Teologia",
    descricao:
      "Ensino teológico com base bíblica sólida, voltado para aprofundar o conhecimento da Palavra de Deus e preparar obreiros para o serviço cristão."
  },
  {
    dia: "Sábado",
    hora: "Horários definidos por grupo",
    titulo: "Reuniões de Grupos Específicos",
    badge: "Exclusivo para membros",
    descricao:
      "Encontros organizados por perfil — Homens, Mulheres e Jovens — com foco em comunhão, discipulado e aplicação prática da fé cristã."
  },
  {
    dia: "Domingo",
    hora: "10:00 e 17:00",
    titulo: "Culto da Família",
    descricao:
      "O principal encontro da igreja, com louvor, palavra, comunhão e edificação espiritual para toda a família."
  }
];

const UNIDADES: { key: UnidadeKey; label: string; sub: string }[] = [
  { key: "sede", label: "Sede", sub: "Figueira da Foz" },
  { key: "leiria", label: "Congregação", sub: "Leiria" },
  { key: "barcelos", label: "Congregação", sub: "Barcelos" }
];

function normalizeUnidade(v?: string): UnidadeKey {
  const x = (v || "").toLowerCase();
  if (x === "leiria") return "leiria";
  if (x === "barcelos") return "barcelos";
  return "sede";
}

export default async function AgendaPage({
  searchParams
}: {
  searchParams: Promise<{ unidade?: string }>;
}) {
  const params = await searchParams;
  const active = normalizeUnidade(params?.unidade);
  const activeMeta = UNIDADES.find((u) => u.key === active) || UNIDADES[0];

  return (
    <main className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-soft bg-bg2 p-6 md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(63,107,79,0.35)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(127,174,147,0.18)" }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-fg">
            Agenda <span className="text-figueira">Semanal</span>
          </h1>

          <p className="text-muted text-base md:text-lg">
            Encontros regulares da ADMVC — momentos de culto, ensino, discipulado e comunhão
            para toda a igreja.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/congregacoes" className="btn btn-primary">
              Ver congregações
            </Link>
            <Link href="/contato" className="btn btn-ghost">
              Fale connosco
            </Link>
          </div>

          <div className="pt-2 text-xs text-muted2">
         
          </div>
        </div>
      </section>

      {/* SELETOR + CONTEÚDO */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-figueira">
              {activeMeta.label} — {activeMeta.sub}
            </h2>
            <p className="text-muted">
              {active === "sede"
                ? "Agenda semanal da sede da ADMVC."
                : "A agenda semanal será publicada assim que estiver definida."}
            </p>
          </div>

          {/* Tabs desktop */}
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-soft bg-bg2 p-2">
            {UNIDADES.map((u) => {
              const isActive = u.key === active;
              return (
                <Link
                  key={u.key}
                  href={`/agenda?unidade=${u.key}`}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition border ${
                    isActive
                      ? "border-soft bg-bg text-fg"
                      : "border-transparent text-muted hover:text-fg hover:bg-bg"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: isActive ? "var(--g-figueira)" : "var(--g-soft)"
                      }}
                    />
                    {u.sub}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile selector (links, server-safe; sem window) */}
        <div className="md:hidden grid gap-2">
          {UNIDADES.map((u) => {
            const isActive = u.key === active;
            return (
              <Link
                key={u.key}
                href={`/agenda?unidade=${u.key}`}
                className={`rounded-2xl border px-4 py-3 ${
                  isActive
                    ? "border-soft bg-bg text-fg"
                    : "border-soft bg-bg2 text-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{u.sub}</div>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? "var(--g-figueira)" : "var(--g-soft)"
                    }}
                  />
                </div>
                <div className="text-xs text-muted2">{u.label}</div>
              </Link>
            );
          })}
        </div>

        {/* Conteúdo por unidade */}
        {active === "sede" ? (
          <SedeAgenda />
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            <PlaceholderAgendaCard
              title={`${activeMeta.label} — ${activeMeta.sub}`}
              desc="A agenda semanal será publicada assim que estiver definida."
            />
            <div className="rounded-2xl border border-soft bg-bg2 p-6">
              <div className="text-sm font-semibold text-fg">Precisa de orientação?</div>
              <p className="mt-2 text-sm text-muted">
                Se quiser, entre em contacto e ajudamos a orientar o melhor dia, horário e
                congregação para a sua visita.
              </p>
              <div className="pt-4">
                <Link href="/contato" className="btn btn-primary">
                  Contacto
                </Link>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 md:p-10 space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-fg">
          Vai visitar-nos pela primeira vez?
        </h3>
        <p className="text-muted">
          Será um prazer recebê-lo. Se quiser, entre em contacto antes e ajudamos a
          orientar o melhor dia e horário para a sua visita.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contato" className="btn btn-primary">
            Contacto
          </Link>
          <Link href="/sobre" className="btn btn-ghost">
            Conheça a ADMVC
          </Link>
        </div>
      </section>
    </main>
  );
}

function SedeAgenda() {
  return (
    <section className="space-y-6">
      {/* Tabela (desktop) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-soft bg-bg2">
        <table className="w-full text-sm">
          <thead className="bg-bg">
            <tr>
              <th className="w-40 px-6 py-4 text-left text-muted whitespace-nowrap">Dia</th>
              <th className="px-6 py-4 text-left text-muted">Horário</th>
              <th className="px-6 py-4 text-left text-muted">Encontro</th>
              <th className="px-10 py-4 text-left text-muted">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {SEDE_SEMANAL.map((e, idx) => (
              <tr key={`${e.dia}-${idx}`} className="border-t border-soft">
                <td className="px-6 py-5 font-medium text-fg whitespace-nowrap">{e.dia}</td>
                <td className="px-6 py-5 text-fg">{e.hora}</td>
                <td className="px-6 py-5 text-fg">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "var(--g-figueira)" }}
                    />
                    <span className="font-semibold">{e.titulo}</span>
                    {e.badge && (
                      <span className="ml-2 rounded-full border border-soft bg-bg px-2 py-0.5 text-xs text-muted">
                        {e.badge}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-10 py-5 text-muted leading-relaxed">{e.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="grid gap-4 md:hidden">
        {SEDE_SEMANAL.map((e, idx) => (
          <div key={`${e.dia}-${idx}`} className="rounded-2xl border border-soft bg-bg2 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs text-muted2">{e.dia}</div>

                <div className="text-base font-semibold text-fg flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--g-figueira)" }}
                  />
                  {e.titulo}
                </div>

                <div className="text-sm text-fg">{e.hora}</div>
              </div>

              {e.badge ? (
                <span className="shrink-0 rounded-full border border-soft bg-bg px-2 py-0.5 text-xs text-muted">
                  {e.badge}
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-muted leading-relaxed">{e.descricao}</p>

            {e.titulo === "Reuniões de Grupos Específicos" ? (
              <div className="mt-3 rounded-xl border border-soft bg-bg p-3 text-sm text-muted">
                <div className="font-semibold text-fg mb-1">Grupos:</div>
                <ul className="space-y-1">
                  <li>• Homens</li>
                  <li>• Mulheres</li>
                  <li>• Jovens</li>
                </ul>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function PlaceholderAgendaCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-soft bg-bg2 p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "rgba(127,174,147,0.14)" }}
      />
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-3 py-1 text-xs text-muted">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--g-soft)" }} />
          Em breve
        </div>
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        <p className="text-sm text-muted">{desc}</p>
        <div className="pt-3">
          <Link href="/contato" className="text-figueira underline underline-offset-4">
            Fale connosco
          </Link>
        </div>
      </div>
    </div>
  );
}
