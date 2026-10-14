export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-soft border-t-figueira" />
        <p className="text-xs font-bold uppercase tracking-widest text-muted">
          A carregar...
        </p>
      </div>
    </main>
  )
}
