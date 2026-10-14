// app/congregacoes/page.tsx
// (Pode atualizar contactos, responsáveis e horários depois — esta página já está preparada.)

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Congregacoes",
  description:
    "Encontre a congregacao ADMVC mais perto de si — Figueira da Foz (Sede), Leiria e Barcelos. Horarios, enderecos e contactos.",
};

type Congregacao = {
  badge: "Sede" | "Congregação";
  cidade: string;
  titulo: string;
  descricao: string;
  destaques: string[];
  horarios: { dia: string; hora: string; nome: string }[];
  endereco?: string;
  contato?: string;
  mapaUrl?: string;
};

const CONGREGACOES: Congregacao[] = [
  {
    badge: "Sede",
    cidade: "Figueira da Foz",
    titulo: "Sede — Figueira da Foz",
    descricao:
      "A sede é o ponto principal de comunhão e direção espiritual, com cultos e encontros semanais para toda a família.",
    destaques: [
      "Cultos regulares e ensino da Palavra",
      "Acolhimento e integração de novos visitantes",
      "Discipulado e acompanhamento pastoral"
    ],
    horarios: [
      { dia: "Quarta-feira", hora: "20:00", nome: "Culto | Quartas Proféticas" },
      { dia: "Quinta-feira", hora: "20:00", nome: "Escola de Líderes (membros)" },
      { dia: "Sexta-feira", hora: "20:00", nome: "Faculdade de Teologia" },
      { dia: "Sábado", hora: "—", nome: "Reuniões de grupos específicos (membros)" },
      { dia: "Domingo", hora: "10:00", nome: "Culto da Família" },
      { dia: "Domingo", hora: "17:00", nome: "Culto da Família" }
    ],
    endereco: "R. António Pestana Rato 77, 3080-014 Figueira da Foz",
    contato: "A confirmar",
    // Google Maps por endereço (pin consistente)
    mapaUrl:
      "https://www.google.com/maps/search/?api=1&query=R.%20Ant%C3%B3nio%20Pestana%20Rato%2077%2C%203080-014%20Figueira%20da%20Foz"
  },
  {
    badge: "Congregação",
    cidade: "Leiria",
    titulo: "Congregação — Leiria",
    descricao:
      "Uma comunidade em crescimento, firmada na Palavra de Deus e em comunhão, servindo a cidade com fé e amor.",
    destaques: [
      "Comunhão e cuidado pastoral",
      "Discipulado e crescimento espiritual",
      "Vida comunitária e serviço"
    ],
    horarios: [
      { dia: "Domingo", hora: "—:—", nome: "Culto (em definição)" },
      { dia: "Semana", hora: "—:—", nome: "Reunião/Ensino (em definição)" }
    ],
    endereco: "Estr. da Mata 93, 2415-557 Leiria",
    contato: "A confirmar",
    mapaUrl:
      "https://www.google.com/maps/search/?api=1&query=Estr.%20da%20Mata%2093%2C%202415-557%20Leiria"
  },
  {
    badge: "Congregação",
    cidade: "Barcelos",
    titulo: "Congregação — Barcelos",
    descricao:
      "Uma congregação viva, com foco em acolhimento, unidade e serviço, caminhando com fé no Evangelho de Jesus Cristo.",
    destaques: [
      "Acolhimento e integração",
      "Cultos e discipulado",
      "Serviço e comunhão"
    ],
    horarios: [
      { dia: "Domingo", hora: "—:—", nome: "Culto (em definição)" },
      { dia: "Semana", hora: "—:—", nome: "Reunião/Ensino (em definição)" }
    ],
    endereco: "R. Elias Garcia 105, 4750-144 Barcelos",
    contato: "A confirmar",
    mapaUrl:
      "https://www.google.com/maps/search/?api=1&query=R.%20Elias%20Garcia%20105%2C%204750-144%20Barcelos"
  }
];

export default function CongregacoesPage() {
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
            Nossas <span className="text-figueira">Congregações</span>
          </h1>

          <p className="text-muted text-base md:text-lg">
            A ADMVC tem a <strong className="text-fg">Sede na Figueira da Foz</strong> como
            principal, com congregações em <strong className="text-fg">Leiria</strong> e{" "}
            <strong className="text-fg">Barcelos</strong>.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contato" className="btn btn-primary">
              Fale connosco
            </Link>
            <Link href="/agenda" className="btn btn-ghost">
              Ver agenda
            </Link>
          </div>

          <div className="pt-2 text-xs text-muted2">
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="grid gap-6 md:grid-cols-3">
        {CONGREGACOES.map((c) => (
          <CongregacaoCard key={c.titulo} c={c} />
        ))}
      </section>

      {/* DETALHES */}
      <section className="space-y-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-figueira">
              Horários e Endereços
            </h2>
            <p className="text-muted">
              Mantemos tudo claro e organizado por cidade. Pode completar contactos e responsáveis
              quando estiverem definidos.
            </p>
          </div>

          <Link href="/contato" className="text-figueira underline underline-offset-4">
            Precisa de ajuda? Fale connosco
          </Link>
        </div>

        <div className="grid gap-6">
          {CONGREGACOES.map((c) => (
            <CongregacaoDetail key={c.cidade} c={c} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 md:p-10 space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-fg">
          Vai visitar-nos pela primeira vez?
        </h3>
        <p className="text-muted">
          Você é bem-vindo. Se quiser, entre em contacto antes e ajudamos a orientar o melhor dia,
          horário e congregação para a sua visita.
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

function CongregacaoCard({ c }: { c: Congregacao }) {
  const glow =
    c.badge === "Sede" ? "rgba(63,107,79,0.18)" : "rgba(127,174,147,0.14)";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-soft bg-bg2 p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: glow }}
      />
      <div className="relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-3 py-1 text-xs text-muted">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: c.badge === "Sede" ? "var(--g-figueira)" : "var(--g-soft)"
            }}
          />
          {c.badge} • {c.cidade}
        </div>

        <h3 className="text-lg font-semibold text-fg">{c.titulo}</h3>
        <p className="text-sm text-muted">{c.descricao}</p>

        <ul className="mt-2 space-y-2 text-sm text-muted">
          {c.destaques.slice(0, 3).map((d) => (
            <li key={d} className="flex gap-2">
              <span className="text-figueira">•</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CongregacaoDetail({ c }: { c: Congregacao }) {
  const isSede = c.badge === "Sede";

  return (
    <div className="rounded-2xl border border-soft bg-bg2 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-soft bg-bg px-3 py-1 text-xs text-muted">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: isSede ? "var(--g-figueira)" : "var(--g-soft)" }}
            />
            {c.badge} • {c.cidade}
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-fg">{c.titulo}</h3>
          <p className="text-sm text-muted max-w-2xl">{c.descricao}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {c.mapaUrl ? (
            <a
              href={c.mapaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Ver no mapa
            </a>
          ) : (
            <span className="btn btn-ghost opacity-60 cursor-not-allowed">
              Ver no mapa
            </span>
          )}

          <Link href="/contato" className="btn btn-primary">
            Contactar
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        {/* Horários */}
        <div className="md:col-span-6">
          <div className="text-sm font-semibold text-fg">
            {isSede ? "Agenda semanal (Sede)" : "Horários (em definição)"}
          </div>
          <div className="mt-3 overflow-hidden rounded-xl border border-soft">
            <table className="w-full text-sm">
              <thead className="bg-bg">
                <tr>
                  <th className="px-4 py-3 text-left text-muted w-40 whitespace-nowrap">
                    Dia
                  </th>
                  <th className="px-4 py-3 text-left text-muted w-24 whitespace-nowrap">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-muted">Encontro</th>
                </tr>
              </thead>
              <tbody>
                {c.horarios.map((h, idx) => (
                  <tr key={`${h.dia}-${idx}`} className="border-t border-soft">
                    <td className="px-4 py-3 text-fg whitespace-nowrap">{h.dia}</td>
                    <td className="px-4 py-3 text-fg whitespace-nowrap">{h.hora}</td>
                    <td className="px-6 py-3 text-muted">{h.nome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-muted2">
            {isSede
              ? "(Agenda confirmada para a Sede.)"
              : "(Assim que a agenda for definida, atualizamos aqui.)"}
          </div>
        </div>

        {/* Endereço / Contacto / Nota */}
        <div className="md:col-span-6 space-y-4">
          <div className="rounded-xl border border-soft bg-bg p-4">
            <div className="text-sm font-semibold text-fg">Endereço</div>
            <div className="mt-2 text-sm text-muted">{c.endereco || "A definir"}</div>
          </div>

          <div className="rounded-xl border border-soft bg-bg p-4">
            <div className="text-sm font-semibold text-fg">Contacto</div>
            <div className="mt-2 text-sm text-muted">{c.contato || "A definir"}</div>
          </div>

          {isSede && (
            <div className="rounded-xl border border-soft bg-bg p-4">
              <div className="text-sm font-semibold text-fg">Nota</div>
              <div className="mt-2 text-sm text-muted">
                A sede é a referência principal da ADMVC. As congregações seguem o mesmo
                compromisso com a Palavra, o discipulado e a comunhão.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
