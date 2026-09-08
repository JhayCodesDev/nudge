export function formatDueAt(dueAt) {
  const date = new Date(dueAt)

  if (Number.isNaN(date.getTime())) {
    return 'No due date'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function getNudgeStatus(nudge, now = new Date()) {
  if (nudge.completed) {
    return 'completed'
  }

  const dueAt = new Date(nudge.dueAt)

  return dueAt.getTime() > now.getTime() ? 'upcoming' : 'overdue'
}

export function getSnoozeDueAt(minutes, now = new Date()) {
  return new Date(now.getTime() + minutes * 60 * 1000).toISOString()
}
