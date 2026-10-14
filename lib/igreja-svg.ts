// lib/igreja-svg.ts
// A igreja de tijolos como texto SVG, para usar onde não há React (a imagem de
// partilha). Mesmo desenho de components/obra/IgrejaTijolos.tsx, com cores fixas.

import { celulasCheias, desenhoIgreja } from "@/lib/obra-tijolos";

export function svgIgreja(colocados: number, total: number, contorno: string) {
  const { celulas, silhueta, porta, cume } = desenhoIgreja(total);
  const cheias = celulasCheias(colocados, total, celulas.length);
  const tijolos = celulas
    .map(([x, y, w, h], i) =>
      i < cheias
        ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="#C1663A" stroke="#9E4F2B" stroke-width=".7"/>`
        : `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${contorno}" fill-opacity=".06" stroke="#C1663A" stroke-width=".7" stroke-opacity=".35"/>`
    )
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 196">` +
    `<defs><clipPath id="c"><path d="${silhueta}"/></clipPath></defs>` +
    `<g clip-path="url(#c)">${tijolos}</g>` +
    `<path d="${silhueta}" fill="none" stroke="${contorno}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M100 ${cume} L100 8" stroke="${contorno}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M92 17 L108 17" stroke="${contorno}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="${porta}" fill="${contorno}" fill-opacity=".08" stroke="${contorno}" stroke-width="2.6"/>` +
    `</svg>`
  );
}
