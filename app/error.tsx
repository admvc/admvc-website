'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
        <span className="text-3xl text-red-400">!</span>
      </div>

      <h2 className="text-2xl font-bold text-fg">Algo correu mal</h2>
      <p className="text-sm text-muted max-w-md">
        Pedimos desculpa pelo inconveniente. Pode tentar novamente ou voltar a pagina inicial.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => unstable_retry()}
          className="btn btn-primary"
        >
          Tentar novamente
        </button>
        <Link href="/" className="btn btn-ghost">
          Voltar ao inicio
        </Link>
      </div>
    </main>
  )
}
