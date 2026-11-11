export type Work = {
  id: string
  student: string
  title?: string
  /** Ruta bajo /public, ej. /photos/ana-01.jpg */
  image: string
  /** Orden de colgado en el tendedero / recorrido */
  order: number
  /** Orientación del print en el muro */
  orientation?: 'portrait' | 'landscape'
}

export type Workshop = {
  title: string
  year: number
  concept: string
  subtitle?: string
  /** Ej. "Gimena Yahari" */
  teacher?: string
  /** Ej. "Fotógrafa" */
  teacherRole?: string
  works: Work[]
}

export type GuestbookEntry = {
  id: string
  name: string
  message: string
  createdAt: string
}
