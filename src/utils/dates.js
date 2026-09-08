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
