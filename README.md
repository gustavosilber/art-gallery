# Galería del taller de fotografía

Sitio fullscreen y minimalista: un tendedero de obras y, al hacer clic, un recorrido tipo galería.

## Recorrido

1. **Intro** del taller (título, año, concepto)
2. **Muro / tendedero**: todas las fotos colgadas en alambres
3. **Galería**: clic en una obra → carrusel con peek de la siguiente

## Cómo cargar contenido

Todo vive en [`src/content/workshop.ts`](src/content/workshop.ts):

1. Poné las fotos en `public/photos/`
2. Editá `title`, `year`, `concept`
3. Agregá cada obra en `works` con `student`, `image`, `order` y opcional `orientation` (`portrait` | `landscape`)

## Desarrollo

```bash
npm install
npm run dev
```

## Controles en la galería

- `←` / `→` o espacio: obra anterior / siguiente
- swipe en móvil
- `Esc` o **Muro**: vuelve al tendedero
