import type { Work, Workshop } from './types'

/** Fotos de muestra “tipo curso”: detalles, animales, naturaleza cercana. */
const photos = [
  '/photos/d01.jpg',
  '/photos/d02.jpg',
  '/photos/d03.jpg',
  '/photos/d04.jpg',
  '/photos/d05.jpg',
  '/photos/d06.jpg',
  '/photos/d07.jpg',
  '/photos/d08.jpg',
  '/photos/d09.jpg',
  '/photos/d10.jpg',
  '/photos/d11.jpg',
  '/photos/d12.jpg',
  '/photos/d13.jpg',
  '/photos/d14.jpg',
  '/photos/d16.jpg',
  '/photos/d17.jpg',
  '/photos/d18.jpg',
  '/photos/d19.jpg',
  '/photos/d20.jpg',
  '/photos/d21.jpg',
  '/photos/d22.jpg',
  '/photos/d23.jpg',
  '/photos/d24.jpg',
  '/photos/d25.jpg',
  '/photos/d26.jpg',
  '/photos/d27.jpg',
  '/photos/d28.jpg',
  '/photos/d29.jpg',
  '/photos/d30.jpg',
  '/photos/d31.jpg',
  '/photos/d32.jpg',
  '/photos/d33.jpg',
  '/photos/d34.jpg',
  '/photos/d35.jpg',
  '/photos/d36.jpg',
  '/photos/d37.jpg',
  '/photos/d38.jpg',
  '/photos/d39.jpg',
  '/photos/d40.jpg',
  '/photos/c03.jpg',
  '/photos/c04.jpg',
  '/photos/c05.jpg',
  '/photos/c08.jpg',
  '/photos/c09.jpg',
  '/photos/c12.jpg',
  '/photos/c14.jpg',
  '/photos/c15.jpg',
  '/photos/c16.jpg',
  '/photos/c18.jpg',
  '/photos/c19.jpg',
]

/** Orientación real de cada archivo (alto > ancho → portrait). */
const photoOrientation: Record<string, 'portrait' | 'landscape'> = {
  '/photos/deborah-fonceca-01.jpg': 'portrait',
  '/photos/deborah-fonceca-02.jpg': 'portrait',
  '/photos/deborah-fonceca-03.jpg': 'portrait',
  '/photos/c03.jpg': 'portrait',
  '/photos/c04.jpg': 'landscape',
  '/photos/c05.jpg': 'landscape',
  '/photos/c08.jpg': 'landscape',
  '/photos/c09.jpg': 'landscape',
  '/photos/c12.jpg': 'landscape',
  '/photos/c14.jpg': 'landscape',
  '/photos/c15.jpg': 'portrait',
  '/photos/c16.jpg': 'landscape',
  '/photos/c18.jpg': 'portrait',
  '/photos/c19.jpg': 'landscape',
  '/photos/d01.jpg': 'portrait',
  '/photos/d02.jpg': 'landscape',
  '/photos/d03.jpg': 'landscape',
  '/photos/d04.jpg': 'landscape',
  '/photos/d05.jpg': 'landscape',
  '/photos/d06.jpg': 'landscape',
  '/photos/d07.jpg': 'landscape',
  '/photos/d08.jpg': 'portrait',
  '/photos/d09.jpg': 'landscape',
  '/photos/d10.jpg': 'portrait',
  '/photos/d11.jpg': 'landscape',
  '/photos/d12.jpg': 'portrait',
  '/photos/d13.jpg': 'landscape',
  '/photos/d14.jpg': 'portrait',
  '/photos/d16.jpg': 'portrait',
  '/photos/d17.jpg': 'landscape',
  '/photos/d18.jpg': 'landscape',
  '/photos/d19.jpg': 'landscape',
  '/photos/d20.jpg': 'landscape',
  '/photos/d21.jpg': 'landscape',
  '/photos/d22.jpg': 'portrait',
  '/photos/d23.jpg': 'portrait',
  '/photos/d24.jpg': 'landscape',
  '/photos/d25.jpg': 'landscape',
  '/photos/d26.jpg': 'landscape',
  '/photos/d27.jpg': 'landscape',
  '/photos/d28.jpg': 'landscape',
  '/photos/d29.jpg': 'landscape',
  '/photos/d30.jpg': 'portrait',
  '/photos/d31.jpg': 'landscape',
  '/photos/d32.jpg': 'landscape',
  '/photos/d33.jpg': 'portrait',
  '/photos/d34.jpg': 'landscape',
  '/photos/d35.jpg': 'landscape',
  '/photos/d36.jpg': 'portrait',
  '/photos/d37.jpg': 'portrait',
  '/photos/d38.jpg': 'landscape',
  '/photos/d39.jpg': 'landscape',
  '/photos/d40.jpg': 'landscape',
}

const students = [
  'Clara Mendoza',
  'Martina Solís',
  'Inés Romero',
  'Elena Vargas',
  'Paula Fernández',
  'Sofía Navarro',
  'Lucía Benítez',
  'Valentina Ruiz',
  'Camila Ortiz',
  'Julián Costa',
  'Marcos Vidal',
  'Tomás Herrera',
] as const

const titles = [
  'Hoja con rocío',
  'Pájaro en el alambrado',
  'Perro del vecino',
  'Gato a la sombra',
  'Flor de vereda',
  'Corteza rajada',
  'Insecto en la mesa',
  'Pluma en el piso',
  'Rama torcida',
  'Huella en el barro',
  'Abeja en el yuyo',
  'Semilla abierta',
  'Musgo en la piedra',
  'Mariposa quieta',
  'Hormigas en fila',
  'Charco con hojas',
  'Nido vacío',
  'Espinas chicas',
  'Lagartija al sol',
  'Pétalo caído',
  'Araña en la esquina',
  'Pasto cortado',
  'Caracol después de la lluvia',
  'Sombra de rama',
  'Piedra con liquen',
  'Bicho de luz',
  'Flor seca',
  'Pata de perro',
  'Oruga en la hoja',
  'Gotas en el vidrio',
  'Planta en maceta rota',
  'Pájaro de lejos',
  'Hueso chico',
  'Yuyo pisado',
  'Alambre con óxido',
  'Hoja comida',
  'Gato mirando',
  'Tronco cortado',
  'Semillas en la mano',
  'Mosca en la pared',
  'Raíz afuera',
  'Flor violeta',
  'Pluma blanca',
  'Rama con savia',
  'Perro durmiendo',
  'Piedra mojada',
  'Hoja amarilla',
  'Bicho bajo piedra',
  'Cola de gato',
  'Fin de la tarde',
]

const deborahWorks: Work[] = [
  {
    id: 'deborah-fonceca-1',
    student: 'Deborah Fonceca',
    title: 'Lechuza al sol',
    image: '/photos/deborah-fonceca-01.jpg',
    order: 1,
    orientation: 'portrait',
  },
  {
    id: 'deborah-fonceca-2',
    student: 'Deborah Fonceca',
    title: 'Lechuza en el poste',
    image: '/photos/deborah-fonceca-02.jpg',
    order: 2,
    orientation: 'portrait',
  },
  {
    id: 'deborah-fonceca-3',
    student: 'Deborah Fonceca',
    title: 'Mirada al árbol',
    image: '/photos/deborah-fonceca-03.jpg',
    order: 3,
    orientation: 'portrait',
  },
]

function buildWorks(): Work[] {
  const works: Work[] = [...deborahWorks]
  const counts = new Map<string, number>()

  for (let order = 1; order <= 50; order += 1) {
    const student = students[(order - 1) % students.length]
    const taken = (counts.get(student) ?? 0) + 1
    counts.set(student, taken)

    const slug = student.toLowerCase().replace(/\s+/g, '-')
    const image = photos[(order - 1) % photos.length] ?? '/photos/d01.jpg'

    works.push({
      id: `${slug}-${taken}`,
      student,
      title: titles[(order - 1) % titles.length],
      image,
      order: order + deborahWorks.length,
      orientation: photoOrientation[image] ?? 'landscape',
    })
  }

  return works
}

/**
 * Única fuente de contenido del sitio.
 * 1. Editá este archivo
 * 2. Tirás las fotos en /public/photos/
 * 3. Listo
 */
export const workshop: Workshop = {
  title: 'Taller de Fotografía',
  subtitle: 'Apuntes de lo cercano',
  year: 2026,
  teacher: 'Gimena Yahari',
  teacherRole: 'Fotógrafa',
  concept:
    'Doce alumnos miraron lo de cerca: hojas, animales, veredas y detalles del camino. No son fotos de estudio; son ejercicios de atención. Esta muestra digital acompaña la exposición impresa.',
  works: buildWorks(),
}
