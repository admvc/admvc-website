// app/obrigado/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obrigado",
  description: "Obrigado por entrar em contacto com a ADMVC.",
};

export default function ObrigadoPage() {
  return (
    <main className="space-y-16">
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
            Mensagem <span className="text-figueira">enviada</span>
          </h1>

          <p className="text-muted text-base md:text-lg">
            Obrigado por entrar em contacto. Vamos responder assim que possível.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="btn btn-primary">
              Voltar à Home
            </Link>
            <Link href="/agenda" className="btn btn-ghost">
              Ver agenda
            </Link>
            <Link href="/congregacoes" className="btn btn-ghost">
              Ver congregações
            </Link>
          </div>

          <div className="pt-4 text-xs text-muted2 italic">
            “Há esperança e um novo começo em Cristo.” — Jeremias 29:11
          </div>
        </div>
      </section>
    </main>
  );
}
