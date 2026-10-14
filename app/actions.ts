'use server'

import { CLOUD_API_URL } from '@/lib/constants'
import type { FormState } from '@/lib/types'

export async function enviarVisitante(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const nome = formData.get('nome')
  const telefone = formData.get('telefone')
  const pedido_oracao_raw = formData.get('pedido_oracao') as string | null

  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    return { success: false, error: 'Por favor, insira o seu nome.' }
  }

  if (!telefone || typeof telefone !== 'string' || telefone.trim().length < 5) {
    return { success: false, error: 'Por favor, insira um contacto valido.' }
  }

  const pedido_oracao = `\u{1F331} [NOVO VISITANTE]\n${pedido_oracao_raw?.trim() || 'Sem pedido especifico.'}`

  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/visitante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.trim(),
        telefone: telefone.trim(),
        pedido_oracao,
      }),
    })

    if (!res.ok) {
      return { success: false, error: 'Erro ao comunicar com o servidor. Tente novamente.' }
    }

    const data = await res.json()

    if (data.ok) {
      return { success: true }
    }

    return { success: false, error: data.error || 'Ocorreu um erro ao enviar. Tente novamente.' }
  } catch {
    return { success: false, error: 'Erro de ligacao. Verifique a sua internet e tente novamente.' }
  }
}

export async function enviarContacto(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const nome = formData.get('nome')
  const email = formData.get('email')
  const telefone = formData.get('telefone') as string | null
  const message = formData.get('message')

  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    return { success: false, error: 'Por favor, insira o seu nome.' }
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { success: false, error: 'Por favor, insira um e-mail valido.' }
  }

  if (!message || typeof message !== 'string' || message.trim().length < 3) {
    return { success: false, error: 'Por favor, escreva uma mensagem.' }
  }

  const textoFormatado = `\u{2709}\u{FE0F} [CONTACTO SITE]\nE-mail: ${email.trim()}\n\n${message.trim()}`

  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/visitante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.trim(),
        telefone: telefone?.trim() || undefined,
        pedido_oracao: textoFormatado,
      }),
    })

    if (!res.ok) {
      return { success: false, error: 'Erro ao comunicar com o servidor. Tente novamente.' }
    }

    const data = await res.json()

    if (data.ok) {
      return { success: true }
    }

    return { success: false, error: data.error || 'Ocorreu um erro ao enviar. Tente novamente.' }
  } catch {
    return { success: false, error: 'Erro de ligacao. Verifique a sua internet e tente novamente.' }
  }
}
