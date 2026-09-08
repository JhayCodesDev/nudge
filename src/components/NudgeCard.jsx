import { formatDueAt } from '../utils/dates.js'

function NudgeCard({ nudge }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-slate-900">{nudge.title}</h3>
        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-700">
          {nudge.priority}
        </span>
      </div>
      {nudge.note && <p className="mt-2 text-sm text-slate-600">{nudge.note}</p>}
      <p className="mt-3 text-sm text-slate-700">
        <span className="font-medium">Due:</span> {formatDueAt(nudge.dueAt)}
      </p>
    </article>
  )
}

export default NudgeCard
