'use client'
// components/grupos/MapaGrupos.tsx
// Importado com dynamic({ ssr: false }) nas páginas que o usam

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Polygon, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Cores por região
const COR_REGIAO: Record<string, string> = {
    Norte: '#3b82f6',
    Centro: '#8b5cf6',
    Sul: '#f59e0b',
    Lisboa: '#ef4444',
    Online: '#6b7280',
}

// O site nunca mostra onde fica a casa: só a zona desenhada no portal ou,
// sem ela, um círculo à volta de um ponto já arredondado pela API.
const RAIO_ZONA_M = 1000

// Ajusta o mapa para mostrar todas as zonas
function FitBounds({ grupos }: { grupos: Grupo[] }) {
    const map = useMap()
    useEffect(() => {
        const comCoords = grupos.filter((g): g is Grupo & { latitude: number; longitude: number } => g.latitude != null && g.longitude != null)
        if (comCoords.length === 0) return
        if (comCoords.length === 1) {
            map.setView([comCoords[0].latitude, comCoords[0].longitude], 14)
            return
        }
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const L = require('leaflet')
        const bounds = L.latLngBounds(comCoords.map((g) => [g.latitude, g.longitude]))
        map.fitBounds(bounds, { padding: [40, 40] })
    }, [grupos, map])
    return null
}

import type { Grupo } from '@/lib/types'

interface Props {
    grupos: Grupo[]
    altura?: string
    mostrarLegenda?: boolean
}

export default function MapaGrupos({ grupos, altura = '500px', mostrarLegenda = true }: Props) {
    const gruposComCoords = grupos.filter(g => g.latitude && g.longitude)
    const centro: [number, number] = [39.6, -8.0] // Centro de Portugal

    // Regiões presentes para a legenda
    const regioesPresentas = Array.from(new Set(gruposComCoords.map(g => g.regiao).filter(Boolean)))

    return (
        <div className="space-y-3">
            <MapContainer
                center={centro}
                zoom={7}
                style={{ height: altura, width: '100%', borderRadius: '1.5rem', zIndex: 0 }}
                className="shadow-sm border border-soft"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                <FitBounds grupos={gruposComCoords} />

                {gruposComCoords.map(g => {
                    const cor = COR_REGIAO[g.regiao || ''] || '#6b7280'
                    const lider = g.lideres?.[0]
                    const estilo = { color: cor, fillColor: cor, fillOpacity: 0.2, weight: 2 }

                    const popup = (
                        <Popup minWidth={200}>
                            <div className="space-y-1.5 py-1">
                                <p className="font-black text-sm uppercase leading-tight">{g.nome}</p>
                                {g.regiao && (
                                    <span style={{ background: cor }}
                                        className="inline-block text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                        {g.regiao}
                                    </span>
                                )}
                                {g.dia_semana && g.horario && (
                                    <p className="text-xs text-gray-600">
                                        📅 {g.dia_semana} às {g.horario}
                                    </p>
                                )}
                                {(g.bairro || g.cidade) && (
                                    <p className="text-xs text-gray-500">
                                        📍 Zona de {[g.bairro, g.cidade].filter(Boolean).join(', ')}
                                    </p>
                                )}
                                {lider && (
                                    <p className="text-xs text-gray-600">
                                        👤 {lider.first_name} {lider.last_name}
                                    </p>
                                )}
                                {g.descricao && (
                                    <p className="text-xs text-gray-500 italic border-t pt-1 mt-1">
                                        {g.descricao}
                                    </p>
                                )}
                            </div>
                        </Popup>
                    )

                    return g.area
                        ? <Polygon key={g.id} positions={g.area} pathOptions={estilo}>{popup}</Polygon>
                        : <Circle key={g.id} center={[g.latitude!, g.longitude!]} radius={RAIO_ZONA_M} pathOptions={estilo}>{popup}</Circle>
                })}
            </MapContainer>

            {/* LEGENDA */}
            {mostrarLegenda && regioesPresentas.length > 0 && (
                <div className="flex flex-wrap gap-2 px-1">
                    {regioesPresentas.map(regiao => (
                        <div key={regiao} className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full shrink-0"
                                style={{ background: COR_REGIAO[regiao!] || '#6b7280' }} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted">
                                {regiao}
                            </span>
                        </div>
                    ))}
                    <span className="text-[9px] font-bold text-muted ml-auto">
                        {gruposComCoords.length} grupo{gruposComCoords.length !== 1 ? 's' : ''} no mapa
                    </span>
                </div>
            )}
        </div>
    )
}