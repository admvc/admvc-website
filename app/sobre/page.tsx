// app/sobre/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheca a ADMVC — Assembleia de Deus Ministerio Visao de Conquista. A nossa missao, visao e valores.",
};

export default function SobrePage() {
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
            Sobre a <span className="text-figueira">ADMVC</span>
          </h1>

          <p className="text-muted text-base md:text-lg">
            A Assembleia de Deus – Ministério Visão de Conquista é uma igreja cristã
            comprometida com a Palavra de Deus, com a família e com a transformação
            de vidas por meio do Evangelho de Jesus Cristo.
          </p>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-figueira">
            Quem somos
          </h2>

          <p className="text-muted">
            Somos uma igreja cristã que vive a fé de forma comunitária, acreditando
            que o crescimento espiritual acontece quando caminhamos juntos em amor,
            unidade e serviço.
          </p>

          <p className="text-muted">
            A ADMVC entende a igreja como uma família espiritual, onde cada pessoa é
            acolhida, cuidada e encorajada a desenvolver uma vida cristã sólida,
            fundamentada nas Escrituras.
          </p>
        </div>

        <div className="md:col-span-7 grid gap-4 md:grid-cols-2">
          <ValueCard
            title="Acolhimento"
            desc="Receber com amor, cuidar com responsabilidade e caminhar juntos como corpo em Cristo."
          />
          <ValueCard
            title="Comunhão"
            desc="Vivemos a fé em unidade, partilhando a vida cristã em relacionamento e cuidado mútuo."
          />
          <ValueCard
            title="Serviço"
            desc="Servir é parte essencial da nossa identidade cristã e expressão do amor de Deus."
          />
          <ValueCard
            title="Crescimento Espiritual"
            desc="Buscamos maturidade na fé por meio da Palavra, da oração e do discipulado."
          />
        </div>
      </section>

      {/* MISSÃO */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 md:p-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-figueira">
          Missão
        </h2>

        <p className="text-muted">
          Nossa missão está firmemente alicerçada no mandamento de Cristo,
          conforme a Grande Comissão:
        </p>

        <blockquote className="border-l-4 pl-4 italic text-fg">
          “Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome
          do Pai, do Filho e do Espírito Santo.” — Mateus 28:19-20
        </blockquote>

        <p className="text-muted">
          Proclamamos o Evangelho de Jesus Cristo, discipulamos os crentes e servimos
          à comunidade, sendo um reflexo do amor de Deus no mundo.
        </p>
      </section>

      {/* VISÃO */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 md:p-10 space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-figueira">
          Visão
        </h2>

        <p className="text-muted">
          Ser uma comunidade transformadora que impacta a cidade e o mundo,
          levando as pessoas a uma vida de fé, esperança e amor em Cristo.
        </p>

        <p className="text-muted">
          A consolidação, o discipulado e o envio caminham juntos, fortalecendo cada
          membro para viver o Evangelho de forma prática e relevante.
        </p>

        <div className="pt-2 text-sm italic text-muted2">
          “Onde não há visão, o povo perece.” — Provérbios 29:18a
        </div>
      </section>

      {/* VALORES */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold text-figueira">
          Nossos Valores
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ValueCard
            title="Amor"
            desc="O amor é o maior mandamento de Cristo e a base de tudo o que fazemos."
          />
          <ValueCard
            title="Fé"
            desc="Vivemos pela fé em Jesus Cristo, confiando nas promessas de Deus."
          />
          <ValueCard
            title="Serviço"
            desc="Seguimos o exemplo de Cristo, servindo com humildade e excelência."
          />
          <ValueCard
            title="Unidade"
            desc="Somos um só corpo em Cristo, respeitando e valorizando a diversidade."
          />
          <ValueCard
            title="Santidade"
            desc="Buscamos viver segundo os princípios bíblicos, refletindo o caráter de Cristo."
          />
        </div>
      </section>

      {/* ENCERRAMENTO */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 md:p-10 space-y-4">
        <p className="text-muted text-base md:text-lg">
          Mais do que uma instituição, a ADMVC é uma família espiritual que caminha
          junta, servindo a Deus e às pessoas com amor, fé e compromisso.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/congregacoes" className="btn btn-primary">
            Conheça nossas congregações
          </Link>

          <Link href="/permanecer" className="btn btn-ghost">
            Tornar-se membro
          </Link>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-soft bg-bg2 p-5">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: "var(--g-figueira)" }}
        />
        <h3 className="font-semibold text-fg">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted">{desc}</p>
    </div>
  );
}
