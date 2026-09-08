export const NUDGE_PRIORITIES = ['low', 'medium', 'high']

export function createNudge({ title, note = '', dueAt, priority = 'medium' }) {
  const timestamp = new Date().toISOString()

  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: title.trim(),
    note: note.trim(),
    dueAt,
    priority,
    completed: false,
    completedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

/**
 * A nudge is stored as:
 * { id, title, note, dueAt, priority, completed, completedAt, createdAt, updatedAt }
 */
export function isNudge(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.note === 'string' &&
    typeof value.dueAt === 'string' &&
    NUDGE_PRIORITIES.includes(value.priority) &&
    typeof value.completed === 'boolean' &&
    (value.completedAt === null || typeof value.completedAt === 'string') &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  )
}
