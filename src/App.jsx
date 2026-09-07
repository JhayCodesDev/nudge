import { BellRing } from 'lucide-react'

function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-900">
      <section className="text-center">
        <BellRing className="mx-auto mb-4 h-10 w-10 text-indigo-600" aria-hidden="true" />
        <h1 className="text-4xl font-semibold tracking-tight">Nudge</h1>
        <p className="mt-2 text-slate-600">Capture it now. Get nudged later.</p>
      </section>
    </main>
  )
}

export default App
