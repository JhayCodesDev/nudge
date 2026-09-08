import { BellRing } from "lucide-react";
import NudgeForm from "./components/NudgeForm";
import NudgeList from "./components/NudgeList";
import { useNudges } from "./utils/useNudges";

function App() {
  const { nudges, setNudges } = useNudges();

  function handleCreateNudge(nudge) {
    setNudges((currentNudges) => [...currentNudges, nudge]);
  }

  function handleUpdateNudge(updatedNudge) {
    setNudges((currentNudges) =>
      currentNudges.map((nudge) =>
        nudge.id === updatedNudge.id
          ? {
              ...nudge,
              ...updatedNudge,
              updatedAt: new Date().toISOString(),
            }
          : nudge,
      ),
    );
  }

  function handleDeleteNudge(nudgeId) {
    setNudges((currentNudges) =>
      currentNudges.filter((nudge) => nudge.id !== nudgeId),
    );
  }

  function handleCompleteNudge(nudgeId) {
    setNudges((currentNudges) =>
      currentNudges.map((nudge) => {
        if (nudge.id !== nudgeId) {
          return nudge;
        }

        const timestamp = new Date().toISOString();

        return {
          ...nudge,
          completed: true,
          completedAt: timestamp,
          updatedAt: timestamp,
        };
      }),
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
      <section className="w-full max-w-md text-center">
        <BellRing
          className="mx-auto mb-4 h-10 w-10 text-indigo-600"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-semibold tracking-tight">Nudge</h1>
        <p className="mt-2 text-slate-600">Capture it now. Get nudged later.</p>
        <NudgeForm onCreate={handleCreateNudge} />
        <section className="mt-10" aria-labelledby="nudges-heading">
          <h2
            className="mb-4 text-left text-lg font-semibold"
            id="nudges-heading"
          >
            Your nudges
          </h2>
          <NudgeList
            nudges={nudges}
            onUpdate={handleUpdateNudge}
            onDelete={handleDeleteNudge}
            onComplete={handleCompleteNudge}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
