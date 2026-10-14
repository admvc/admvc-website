// lib/types.ts
// Tipos partilhados pelo site

/** A campanha da obra (API /api/public/obra): os tijolos calculam-se no site */
export interface DadosObra {
  titulo: string;
  descricao: string;
  chamada?: string | null;
  versiculo?: string | null;
  versiculoRef?: string | null;
  videoUrl?: string | null;
  valorObra: number;
  valorTijolo: number;
  arrecadado: number;
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
  bairro?: string | null;
  cidade?: string | null;
  regiao?: string | null;
  descricao?: string | null;
  categoria?: string | null;
  perfil?: string | null;
  /** Aproximadas (~1 km): a API nunca envia o ponto exato */
  latitude?: number | null;
  longitude?: number | null;
  /** Zona que o grupo abrange, desenhada no portal: [[lat, lng], ...] */
  area?: [number, number][] | null;
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
