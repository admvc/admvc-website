// app/opengraph-image.tsx
// A imagem que aparece ao partilhar o site (WhatsApp, Facebook…). Gerada aqui:
// logótipo, frase e a igreja de tijolos com o progresso da obra (do portal,
// atualizado de hora a hora). Serve todas as páginas que não tenham a sua.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CLOUD_API_URL, SITE_TAGLINE } from "@/lib/constants";
import { contasObra } from "@/lib/obra-tijolos";
import { svgIgreja } from "@/lib/igreja-svg";

export const alt = "ADMVC — Mais que uma igreja, uma família. Figueira da Foz · Montemor · Barcelos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

async function obra() {
  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/obra`, { next: { revalidate: 3600 } });
    const json = await res.json();
    if (json.ok && json.data?.valorTijolo) return json.data;
  } catch {}
  return null;
}

export default async function Image() {
  const [dados, logo] = await Promise.all([
    obra(),
    readFile(join(process.cwd(), "public/images/logo_admvc.png")),
  ]);
  const c = dados ? contasObra(dados) : null;
  const igreja = svgIgreja(c?.colocados ?? 0, c?.total ?? 200, "#F3F1EA");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0F1512", color: "#F3F1EA", padding: "64px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", background: "#3F6B4F", borderRadius: 24 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${logo.toString("base64")}`} width={112} height={112} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>ADMVC</span>
              <span style={{ fontSize: 24, color: "#9FB8A8" }}>Assembleia de Deus · Ministério Visão de Conquista</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05, maxWidth: 600 }}>{SITE_TAGLINE}</span>
            <span style={{ fontSize: 28, color: "#9FB8A8" }}>Figueira da Foz · Montemor · Barcelos</span>
          </div>

          {c ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
              <span style={{ background: "#3F6B4F", color: "#fff", padding: "8px 18px", borderRadius: 999, fontWeight: 700 }}>
                Construção da nossa Igreja
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#E08A5E", fontWeight: 800 }}>{c.colocados}</span>
                <span>de {c.total} tijolos</span>
              </div>
            </div>
          ) : (
            <span style={{ fontSize: 26, color: "#9FB8A8" }}>www.igrejaadmvc.org</span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 440 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${Buffer.from(igreja).toString("base64")}`} width={440} height={431} alt="" />
        </div>
      </div>
    ),
    { ...size }
  );
}
