import { useEffect, useState } from 'react'
import { loadNudges, saveNudges } from './storage.js'

export function useNudges() {
  const [nudges, setNudges] = useState(loadNudges)

  useEffect(() => {
    saveNudges(nudges)
  }, [nudges])

  return { nudges, setNudges }
}
