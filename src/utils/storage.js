import { isNudge } from './nudge.js'

const STORAGE_KEY = 'nudge:nudges'

export function loadNudges() {
  try {
    const savedNudges = localStorage.getItem(STORAGE_KEY)

    if (!savedNudges) {
      return []
    }

    const parsedNudges = JSON.parse(savedNudges)

    return Array.isArray(parsedNudges) ? parsedNudges.filter(isNudge) : []
  } catch {
    return []
  }
}

export function saveNudges(nudges) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nudges))
  } catch {
    // The app remains usable if browser storage is unavailable.
  }
}
