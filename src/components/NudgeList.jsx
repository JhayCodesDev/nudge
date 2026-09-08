import EmptyState from "./EmptyState";
import NudgeCard from "./NudgeCard";
import { getNudgeStatus } from "../utils/dates.js";
import { useCurrentTime } from "../utils/useCurrentTime.js";

function NudgeList({ nudges, onUpdate, onDelete, onComplete }) {
  const now = useCurrentTime();

  if (nudges.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {nudges.map((nudge) => (
        <NudgeCard
          key={nudge.id}
          nudge={nudge}
          status={getNudgeStatus(nudge, now)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default NudgeList;
