# Site público da ADMVC

www.igrejaadmvc.org — Assembleia de Deus · Ministério Visão de Conquista
(Figueira da Foz · Montemor · Barcelos).

Next.js 16 + Tailwind. Não tem base de dados: o que muda com frequência vem do
portal da igreja (app.igrejaadmvc.org, repositório `admvc/admvc-site`).

## De onde vêm os dados

| No site | Vem de | Atualiza |
|---|---|---|
| Obra em tijolos (página inicial e imagem de partilha) | `GET /api/public/obra` — portal: Tesouraria → A nossa obra | 1 min (imagem: 1 h) |
| Pequenos grupos e mapa | `GET /api/public/grupos` — só grupos públicos, sem morada exata | 1 h |
| Formulários de visitante e contacto | `POST /api/public/visitante` — exige consentimento | — |
| Agenda, congregações, textos | escritos no código (`app/*/page.tsx`) | no deploy |

`lib/obra-tijolos.ts` é uma **cópia** do mesmo ficheiro do portal: mudar nos dois.

## Correr

```bash
npm install
npm run dev        # http://localhost:3000
```

Variável (no Vercel e em `.env.local`): `NEXT_PUBLIC_CLOUD_API_URL=https://app.igrejaadmvc.org`.
Entra no código durante o build: depois de a mudar, fazer **Redeploy**.

## Publicação

Vercel, a partir de `main`. Framework Preset tem de ser **Next.js** (com "Other" o
Vercel só serve a pasta `public/` e as páginas dão 404). Analytics: ligar em
Vercel → projeto → Analytics.
