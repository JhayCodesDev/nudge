import EmptyState from "./EmptyState";
import NudgeCard from "./NudgeCard";

function NudgeList({ nudges, onUpdate, onDelete, onComplete }) {
  if (nudges.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {nudges.map((nudge) => (
        <NudgeCard
          key={nudge.id}
          nudge={nudge}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default NudgeList;
