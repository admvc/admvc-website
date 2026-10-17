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

  // Armadilha para robôs: campo escondido que uma pessoa nunca preenche. Finge que correu bem.
  const empresa = formData.get('empresa')
  if (typeof empresa === 'string' && empresa.trim()) return { success: true }

  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    return { success: false, error: 'Por favor, insira o seu nome.' }
  }

  if (!telefone || typeof telefone !== 'string' || telefone.trim().length < 5) {
    return { success: false, error: 'Por favor, insira um contacto válido.' }
  }

  if (formData.get('consentimento') !== 'on') {
    return { success: false, error: 'Para enviar, aceite que a ADMVC guarde os seus dados para o contactar.' }
  }

  const pedido_oracao = `\u{1F331} [NOVO VISITANTE]\n${pedido_oracao_raw?.trim() || 'Sem pedido específico.'}`

  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/visitante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.trim(),
        telefone: telefone.trim(),
        pedido_oracao,
        consentimento: true,
        origem: 'SITE',
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
    return { success: false, error: 'Erro de ligação. Verifique a sua internet e tente novamente.' }
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
    return { success: false, error: 'Por favor, insira um e-mail válido.' }
  }

  if (!message || typeof message !== 'string' || message.trim().length < 3) {
    return { success: false, error: 'Por favor, escreva uma mensagem.' }
  }

  if (!telefone || telefone.trim().length < 5) {
    return { success: false, error: 'Por favor, insira o seu telemóvel.' }
  }

  if (formData.get('consentimento') !== 'on') {
    return { success: false, error: 'Para enviar, aceite que a ADMVC guarde os seus dados para o contactar.' }
  }

  const textoFormatado = `\u{2709}\u{FE0F} [CONTACTO SITE]\nE-mail: ${email.trim()}\n\n${message.trim()}`

  try {
    const res = await fetch(`${CLOUD_API_URL}/api/public/visitante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.trim(),
        telefone: telefone.trim(),
        pedido_oracao: textoFormatado,
        consentimento: true,
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
    return { success: false, error: 'Erro de ligação. Verifique a sua internet e tente novamente.' }
  }
}
