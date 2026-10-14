// lib/types.ts
// Tipos partilhados pelo site

/** Etapa de construcao retornada pela API /api/public/obra */
export interface EtapaConstrucao {
  nome: string;
  atual: number;
  alvo: number;
}

/** Dados da obra/campanha retornados pela API */
export interface DadosObra {
  titulo: string;
  descricao: string;
  objetivoFinal: number;
  videoUrl?: string;
  etapas: EtapaConstrucao[];
}

/** Lider de grupo retornado pela API */
export interface LiderGrupo {
  first_name: string;
  last_name: string;
  avatar_file?: string | null;
}

/** Grupo retornado pela API /api/public/grupos */
export interface Grupo {
  id: number;
  nome: string;
  dia_semana?: string | null;
  horario?: string | null;
  endereco?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  regiao?: string | null;
  descricao?: string | null;
  categoria?: string | null;
  perfil?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  lideres?: LiderGrupo[];
  _count?: { membros: number };
}

/** Resultado generico da API */
export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/** Estado de retorno das Server Actions de formularios */
export interface FormState {
  success: boolean;
  error?: string;
}
