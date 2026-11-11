import type { Work, Workshop } from './types'

/** Orden de colgado / recorrido de la muestra. */
export function sortedWorks(workshop: Workshop): Work[] {
  return [...workshop.works].sort((a, b) => a.order - b.order)
}

/** Reparte las obras en filas del tendedero. */
export function lineRows(works: Work[], rowCount = 3): Work[][] {
  const rows: Work[][] = Array.from({ length: rowCount }, () => [])
  works.forEach((work, index) => {
    rows[index % rowCount]?.push(work)
  })
  return rows.filter((row) => row.length > 0)
}
