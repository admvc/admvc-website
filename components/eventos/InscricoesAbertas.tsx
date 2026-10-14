// Eventos com inscrições abertas (do portal): cartão com o botão "Inscrever-me",
// que abre a página de inscrição no portal. Sem eventos abertos, não aparece.
import { CLOUD_API_URL } from "@/lib/constants";
import type { InscricaoAbertaApi } from "@/lib/types";

async function obterInscricoes(): Promise<InscricaoAbertaApi[]> {
  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/inscricoes`, { next: { revalidate: 300 } });
    const json = await res.json();
    return json.ok && Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}

// A hora está gravada "de parede" (como na agenda do portal): mostra-se tal como está
function quando(iso: string) {
  const d = new Date(iso);
  const dia = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
  const hora = d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)} · ${hora}`;
}

export default async function InscricoesAbertas() {
  const eventos = await obterInscricoes();
  if (eventos.length === 0) return null;

  return (
    <section aria-label="Inscrições abertas" className="space-y-4">
      {eventos.map((e) => (
        <div key={e.slug} className="rounded-2xl border-2 bg-bg2 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4"
          style={{ borderColor: e.cor }}>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: e.cor }}>Inscrições abertas</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-fg">{e.titulo}</h2>
            {e.subtitulo && <p className="text-muted">{e.subtitulo}</p>}
            <p className="text-sm text-muted">
              {quando(e.inicio)}{e.local ? ` · ${e.local}` : ""}{e.preco_eur ? ` · ${e.preco_eur.toLocaleString("pt-PT")} €` : ""}
            </p>
          </div>
          <a href={e.url} className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-sm hover:opacity-90"
            style={{ background: e.cor }}>
            Inscrever-me
          </a>
        </div>
      ))}
    </section>
  );
}
