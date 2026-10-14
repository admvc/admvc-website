// app/grupos/page.tsx
// Pagina publica — sem autenticacao necessaria
// Mostra apenas grupos com publico: true

import { MapPin, Users, Calendar } from 'lucide-react'
import { CLOUD_API_URL } from '@/lib/constants'
import MapaGruposWrapper from '@/components/grupos/MapaGruposWrapper'
import type { Metadata } from 'next'
import type { Grupo } from '@/lib/types'

export const metadata: Metadata = {
  title: "Pequenos Grupos",
  description:
    "Encontre um pequeno grupo ADMVC perto de si. Comunidade, estudo biblico e crescimento juntos.",
}

export const revalidate = 3600

const REGIOES = ['Norte', 'Centro', 'Sul', 'Lisboa', 'Online']

const COR_REGIAO: Record<string, string> = {
    Norte: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    Centro: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    Sul: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    Lisboa: 'bg-red-500/10 text-red-700 border-red-500/20',
    Online: 'bg-soft text-muted border-soft',
}

async function getGrupos() {
    try {
        const res = await fetch(`${CLOUD_API_URL}/api/public/grupos`, {
            next: { revalidate: 3600 },
        });
        const json = await res.json();

        if (json.ok && json.data) return json.data;
    } catch (error) {
        console.error("Aviso: Erro ao buscar grupos na API Cloud.");
    }

    return [];
}

export default async function GruposPublicosPage() {
    const grupos = await getGrupos();

    const gruposComMapa = grupos.filter((g: Grupo) => g.latitude && g.longitude)

    // Agrupa por regiao para a listagem
    const porRegiao = REGIOES.reduce((acc, r) => {
        acc[r] = grupos.filter((g: Grupo) => g.regiao === r)
        return acc
    }, {} as Record<string, Grupo[]>)

    return (
        <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 space-y-12 pb-24">

            {/* HEADER */}
            <header className="text-center space-y-4 pb-8 border-b border-soft">
                <span className="text-figueira font-black text-[10px] uppercase tracking-[0.3em]">
                    Comunidade ADMVC
                </span>
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-fg leading-none">
                    Pequenos <span className="text-muted/30">Grupos.</span>
                </h1>
                <p className="text-sm text-muted font-medium max-w-lg mx-auto leading-relaxed">
                    Encontre um grupo perto de si e faca parte de uma comunidade que se reune, estuda e cresce juntos.
                </p>
                <div className="flex items-center justify-center gap-6 pt-2">
                    <div className="text-center">
                        <p className="text-2xl font-black italic text-fg">{grupos.length}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted">Grupos Activos</p>
                    </div>
                    <div className="w-px h-8 bg-soft" />
                    <div className="text-center">
                        <p className="text-2xl font-black italic text-fg">{REGIOES.filter(r => (porRegiao[r] || []).length > 0).length}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted">Regioes</p>
                    </div>
                    <div className="w-px h-8 bg-soft" />
                    <div className="text-center">
                        <p className="text-2xl font-black italic text-fg">{gruposComMapa.length}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted">No Mapa</p>
                    </div>
                </div>
            </header>

            {/* MAPA */}
            {gruposComMapa.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-lg font-black uppercase tracking-widest text-fg flex items-center gap-3">
                        <MapPin size={18} className="text-figueira" /> Onde Nos Encontramos
                    </h2>
                    <MapaGruposWrapper grupos={grupos} />
                </section>
            )}

            {/* FILTRO POR REGIAO — pills */}
            <section className="space-y-8">
                <h2 className="text-lg font-black uppercase tracking-widest text-fg flex items-center gap-3">
                    <Users size={18} className="text-figueira" /> Todos os Grupos
                </h2>

                {REGIOES.filter(r => (porRegiao[r] || []).length > 0).map(regiao => (
                    <div key={regiao} className="space-y-4">
                        {/* CABECALHO DA REGIAO */}
                        <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${COR_REGIAO[regiao] || 'bg-soft text-muted border-soft'}`}>
                                {regiao}
                            </span>
                            <div className="flex-1 h-px bg-soft" />
                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">
                                {porRegiao[regiao].length} grupo{porRegiao[regiao].length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* GRID DE CARDS */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {porRegiao[regiao].map((grupo: Grupo) => {
                                const lider = grupo.lideres?.[0]
                                return (
                                    <div key={grupo.id}
                                        className="bg-bg2 border border-soft rounded-[2rem] overflow-hidden hover:border-figueira/20 hover:-translate-y-0.5 transition-all shadow-sm group">

                                        {/* TOPO COLORIDO */}
                                        <div className={`h-1.5 ${regiao === 'Norte' ? 'bg-blue-500' :
                                                regiao === 'Centro' ? 'bg-purple-500' :
                                                    regiao === 'Sul' ? 'bg-amber-500' :
                                                        regiao === 'Lisboa' ? 'bg-red-500' :
                                                            'bg-soft'
                                            }`} />

                                        <div className="p-6 space-y-4">
                                            {/* NOME + CATEGORIA */}
                                            <div>
                                                <h3 className="text-sm font-black uppercase tracking-tight text-fg group-hover:text-figueira transition-colors leading-tight">
                                                    {grupo.nome}
                                                </h3>
                                                {grupo.categoria && (
                                                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1">
                                                        {grupo.categoria}
                                                        {grupo.perfil ? ` · ${grupo.perfil}` : ''}
                                                    </p>
                                                )}
                                            </div>

                                            {/* DETALHES */}
                                            <div className="space-y-2">
                                                {grupo.dia_semana && grupo.horario && (
                                                    <div className="flex items-center gap-2 text-[10px] text-fg font-medium">
                                                        <Calendar size={12} className="text-figueira shrink-0" />
                                                        {grupo.dia_semana} as {grupo.horario}
                                                    </div>
                                                )}
                                                {(grupo.endereco || grupo.cidade) && (
                                                    <div className="flex items-center gap-2 text-[10px] text-muted">
                                                        <MapPin size={12} className="shrink-0" />
                                                        {[grupo.bairro || grupo.endereco, grupo.cidade].filter(Boolean).join(', ')}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-[10px] text-muted">
                                                    <Users size={12} className="shrink-0" />
                                                    {grupo._count?.membros || 0} participante{(grupo._count?.membros || 0) !== 1 ? 's' : ''}
                                                </div>
                                            </div>

                                            {/* DESCRICAO */}
                                            {grupo.descricao && (
                                                <p className="text-[10px] text-muted font-medium leading-relaxed line-clamp-2">
                                                    {grupo.descricao}
                                                </p>
                                            )}

                                            {/* LIDER */}
                                            {lider && (
                                                <div className="flex items-center gap-3 pt-3 border-t border-soft">
                                                    <div className="w-8 h-8 rounded-xl bg-figueira/10 overflow-hidden flex items-center justify-center shrink-0">
                                                        {lider.avatar_file
                                                            ? <img src={lider.avatar_file} alt={`${lider.first_name} ${lider.last_name}`} className="w-full h-full object-cover" />
                                                            : <span className="text-[9px] font-black text-figueira">
                                                                {lider.first_name?.[0]}{lider.last_name?.[0]}
                                                            </span>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted leading-none">Lider</p>
                                                        <p className="text-[10px] font-black text-fg mt-0.5">
                                                            {lider.first_name} {lider.last_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}

                {grupos.length === 0 && (
                    <div className="py-20 text-center">
                        <Users size={32} className="mx-auto text-muted/20 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted">
                            Nenhum grupo disponivel de momento
                        </p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-figueira/5 border border-figueira/20 rounded-[2rem] p-8 md:p-12 text-center space-y-4">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-fg">
                    Nao encontrou um grupo perto de si?
                </h2>
                <p className="text-sm text-muted font-medium max-w-md mx-auto">
                    Fale connosco — estamos a expandir para novas regioes e adorariamos ter a sua participacao.
                </p>
                <a href="/contato"
                    className="inline-flex items-center gap-2 bg-figueira text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-figueira/90 transition-all shadow-lg shadow-figueira/20 active:scale-95">
                    Entrar em Contacto
                </a>
            </section>
        </main>
    )
}
