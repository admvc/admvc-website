// app/permanecer/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permanecer",
  description:
    "O processo Permanecer e o caminho para se integrar a membresia da ADMVC — conhecer a visao, alinhar e comprometer-se.",
};

export default function PermanecerPage() {
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
            Processo <span className="text-figueira">Permanecer</span>
          </h1>

          <p className="text-muted text-base md:text-lg">
            O Permanecer é o processo consciente de integração à membresia da ADMVC,
            baseado em comunhão, alinhamento e compromisso com a visão da igreja.
          </p>
        </div>
      </section>

      {/* O QUE É */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-figueira">
            O que significa permanecer?
          </h2>
          <p className="text-muted max-w-3xl">
            Permanecer não é apenas frequentar. É decidir caminhar em aliança,
            crescer em discipulado e servir dentro da visão que Deus confiou a esta casa.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            number="1"
            title="Conhecer a visão"
            desc="Entender a identidade, missão e valores da ADMVC."
          />
          <StepCard
            number="2"
            title="Alinhamento e discipulado"
            desc="Crescimento espiritual com acompanhamento e ensino."
          />
          <StepCard
            number="3"
            title="Compromisso consciente"
            desc="Decisão madura de integrar-se à membresia."
          />
        </div>
      </section>

      {/* COMO PARTICIPAR */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-fg">
          Como iniciar o processo?
        </h3>

        <p className="text-muted">
          Se você sente que esta é a sua casa espiritual, fale connosco.
          A liderança irá orientá-lo(a) quanto aos próximos passos.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/contato" className="btn btn-primary">
            Falar com a liderança
          </Link>
          <Link href="/agenda" className="btn btn-ghost">
            Ver agenda
          </Link>
        </div>
      </section>

      {/* ÂNCORA BÍBLICA */}
      <section className="rounded-2xl border border-soft bg-bg2 p-6">
        <div className="border-l-4 pl-4" style={{ borderColor: "var(--g-figueira)" }}>
          <p className="text-lg italic text-fg">
            “Permanecei em mim, e eu permanecerei em vós.”
          </p>
          <div className="pt-1 text-sm text-muted2">João 15:4</div>
        </div>
      </section>
    </main>
  );
}

function StepCard({
  number,
  title,
  desc
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-soft bg-bg2 p-5">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[rgba(63,107,79,0.18)] text-figueira font-semibold">
          {number}
        </div>
        <h3 className="font-semibold text-fg">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted">{desc}</p>
    </div>
  );
}