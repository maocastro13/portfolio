import { useSyncExternalStore } from 'react'

/** One colour per collectible, in the same order as `specialties` in content.ts. */
export const PICKUP_COLORS = ['#a78bfa', '#22d3ee', '#fbbf24', '#f472b6']

let collected: boolean[] = PICKUP_COLORS.map(() => false)
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())

export const game = {
  collect(i: number) {
    if (collected[i]) return
    collected = collected.map((v, j) => v || j === i)
    emit()
  },
  reset() {
    collected = PICKUP_COLORS.map(() => false)
    emit()
  },
}

/** Which skills the visitor has collected in the hero mini-game. */
export const useCollected = () =>
  useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => {
        subs.delete(cb)
      }
    },
    () => collected,
  )
