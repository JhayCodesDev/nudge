import { BellRing } from 'lucide-react'
import NudgeForm from './components/NudgeForm'
import { useNudges } from './utils/useNudges'

function App() {
  const { setNudges } = useNudges()

  function handleCreateNudge(nudge) {
    setNudges((currentNudges) => [...currentNudges, nudge])
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
      <section className="text-center">
        <BellRing className="mx-auto mb-4 h-10 w-10 text-indigo-600" aria-hidden="true" />
        <h1 className="text-4xl font-semibold tracking-tight">Nudge</h1>
        <p className="mt-2 text-slate-600">Capture it now. Get nudged later.</p>
        <NudgeForm onCreate={handleCreateNudge} />
      </section>
    </main>
  )
}

export default App
