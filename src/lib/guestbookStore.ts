import { guestbookSeed } from '../content/guestbook'
import type { GuestbookEntry } from '../content/types'

const STORAGE_KEY = 'art-gallery.guestbook.v1'

function readStored(): GuestbookEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isEntry)
  } catch {
    return []
  }
}

function isEntry(value: unknown): value is GuestbookEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Partial<GuestbookEntry>
  return (
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    typeof entry.message === 'string' &&
    typeof entry.createdAt === 'string'
  )
}

function sortEntries(entries: GuestbookEntry[]) {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function loadGuestbook(): GuestbookEntry[] {
  const stored = readStored()
  const byId = new Map<string, GuestbookEntry>()
  for (const entry of guestbookSeed) byId.set(entry.id, entry)
  for (const entry of stored) byId.set(entry.id, entry)
  return sortEntries([...byId.values()])
}

export function addGuestbookEntry(input: {
  name: string
  message: string
}): GuestbookEntry {
  const entry: GuestbookEntry = {
    id: `local-${crypto.randomUUID()}`,
    name: input.name.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  }

  const stored = readStored()
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...stored]))
  return entry
}
