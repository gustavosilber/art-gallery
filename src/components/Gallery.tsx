import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Workshop } from '../content/types'
import { lineRows, sortedWorks } from '../content/walk'
import { useGalleryNav } from '../hooks/useGalleryNav'

type Mode = 'lines' | 'carousel'

type Props = {
  workshop: Workshop
  onExit: () => void
}

export function Gallery({ workshop, onExit }: Props) {
  const works = sortedWorks(workshop)
  const rows = lineRows(works, 3)

  const [mode, setMode] = useState<Mode>('lines')
  const [workIndex, setWorkIndex] = useState(0)
  const [uiVisible, setUiVisible] = useState(true)
  const [zooming, setZooming] = useState(false)
  const [trackX, setTrackX] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const yardRef = useRef<HTMLDivElement>(null)
  const wallXRef = useRef(0)
  const targetWallX = useRef(0)
  const wallRange = useRef(0)
  const wallRaf = useRef<number | null>(null)
  const current = works[workIndex]

  useEffect(() => {
    if (mode !== 'lines') return

    const yard = yardRef.current
    if (!yard) return

    const measureRange = () => {
      const stage = yard.parentElement
      if (!stage) return 0
      // Mitad del overflow: desde el centro se puede ir igual a izquierda y derecha
      return Math.max(0, (yard.offsetWidth - stage.clientWidth) / 2)
    }

    const clamp = (value: number, range: number) =>
      Math.max(-range, Math.min(range, value))

    const applyX = (value: number) => {
      wallXRef.current = value
      yard.style.transform = `translate3d(${value}px, 0, 0)`
    }

    const tick = () => {
      const currentX = wallXRef.current
      const next = currentX + (targetWallX.current - currentX) * 0.08
      applyX(next)
      if (Math.abs(targetWallX.current - next) > 0.2) {
        wallRaf.current = window.requestAnimationFrame(tick)
      } else {
        applyX(targetWallX.current)
        wallRaf.current = null
      }
    }

    const startTick = () => {
      if (wallRaf.current == null) {
        wallRaf.current = window.requestAnimationFrame(tick)
      }
    }

    const refreshRange = () => {
      wallRange.current = measureRange()
      targetWallX.current = clamp(targetWallX.current, wallRange.current)
      applyX(clamp(wallXRef.current, wallRange.current))
    }

    const onMove = (event: MouseEvent) => {
      const range = wallRange.current
      if (range <= 0) return
      // 0 al centro, -1 borde izq, +1 borde der
      const ratio = (event.clientX / window.innerWidth) * 2 - 1
      // Mirás a la izquierda → el muro corre a la derecha (simétrico)
      targetWallX.current = clamp(-ratio * range, range)
      startTick()
    }

    targetWallX.current = 0
    applyX(0)
    const measureId = window.setTimeout(refreshRange, 80)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', refreshRange)

    const images = [...yard.querySelectorAll('img')]
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', refreshRange)
    })

    return () => {
      window.clearTimeout(measureId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', refreshRange)
      images.forEach((image) => image.removeEventListener('load', refreshRange))
      if (wallRaf.current != null) window.cancelAnimationFrame(wallRaf.current)
      wallRaf.current = null
    }
  }, [mode])

  const centerActiveSlide = () => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('.carousel__slide.is-active')
    if (!slide) return
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
    setTrackX(window.innerWidth / 2 - slideCenter)
  }

  useEffect(() => {
    if (!uiVisible || mode === 'lines') return
    const id = window.setTimeout(() => setUiVisible(false), 3400)
    return () => window.clearTimeout(id)
  }, [uiVisible, mode, workIndex])

  useEffect(() => {
    if (mode !== 'carousel') return

    const sync = () => {
      window.requestAnimationFrame(centerActiveSlide)
    }

    sync()
    window.addEventListener('resize', sync)

    const images = trackRef.current?.querySelectorAll('img') ?? []
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', sync)
    })

    return () => {
      window.removeEventListener('resize', sync)
      images.forEach((image) => image.removeEventListener('load', sync))
    }
  }, [mode, workIndex, works])

  const openCarousel = (id: string) => {
    const index = works.findIndex((work) => work.id === id)
    if (index < 0) return
    setWorkIndex(index)
    setZooming(true)
    setMode('carousel')
    setUiVisible(true)
    window.setTimeout(() => setZooming(false), 700)
  }

  const backToLines = () => {
    setMode('lines')
    setUiVisible(true)
  }

  const goPrev = () => {
    if (mode !== 'carousel' || works.length === 0) return
    setWorkIndex((value) => (value <= 0 ? works.length - 1 : value - 1))
    setUiVisible(true)
  }

  const goNext = () => {
    if (mode !== 'carousel' || works.length === 0) return
    setWorkIndex((value) => (value >= works.length - 1 ? 0 : value + 1))
    setUiVisible(true)
  }

  useGalleryNav({
    enabled: mode === 'carousel',
    onPrev: goPrev,
    onNext: goNext,
    onExit: backToLines,
  })

  return (
    <section
      className={[
        'gallery',
        `gallery--${mode}`,
        uiVisible || mode === 'lines' ? 'is-ui' : '',
        zooming ? 'is-zooming' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseMove={() => mode === 'carousel' && setUiVisible(true)}
    >
      <header className="gallery__chrome gallery__chrome--top">
        <button type="button" className="ghost" onClick={onExit}>
          Inicio
        </button>
        {mode === 'carousel' ? (
          <button type="button" className="ghost" onClick={backToLines}>
            Muro
          </button>
        ) : (
          <span className="gallery__top-label">{workshop.year}</span>
        )}
      </header>

      {mode === 'lines' ? (
        <div className="lines">
          <div className="lines__intro">
            <p className="lines__kicker">Muestra</p>
            <h2 className="lines__title">{workshop.title}</h2>
            {workshop.subtitle ? (
              <p className="lines__subtitle">{workshop.subtitle}</p>
            ) : null}
          </div>

          <div className="lines__stage" aria-label="Tendedero de obras">
            <div ref={yardRef} className="lines__yard">
              {rows.map((row, rowIndex) => (
                <div className="lines__row" key={`row-${rowIndex}`}>
                  <span className="lines__wire" aria-hidden="true" />
                  <ul className="lines__prints">
                    {row.map((work, printIndex) => {
                      const orientation = work.orientation ?? 'landscape'
                      const tilt = ((rowIndex + printIndex) % 5) - 2
                      return (
                        <li key={work.id} className="lines__slot">
                          <button
                            type="button"
                            className={`lines__print lines__print--${orientation}`}
                            style={{ ['--tilt' as string]: `${tilt * 0.7}deg` }}
                            onClick={() => openCarousel(work.id)}
                            aria-label={`${work.student}${work.title ? `, ${work.title}` : ''}`}
                          >
                            <span className="lines__pin lines__pin--left" aria-hidden="true" />
                            <span className="lines__pin lines__pin--right" aria-hidden="true" />
                            <span className="lines__mat">
                              <img
                                src={work.image}
                                alt=""
                                className="lines__image"
                                loading="lazy"
                              />
                            </span>
                            <span className="lines__caption">
                              <span className="lines__student">{work.student}</span>
                              {work.title ? (
                                <span className="lines__work">{work.title}</span>
                              ) : null}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="site-credit site-credit--gallery">
            diseño y desarrollo <span className="site-credit__brand">+Silber</span>
            <span className="site-credit__sep">|</span>
            Gustavo Silber
          </p>
        </div>
      ) : (
        <div className="carousel" aria-live="polite">
          <div
            ref={trackRef}
            className="carousel__track"
            style={{ transform: `translate3d(${trackX}px, 0, 0)` }}
          >
            {works.map((work, index) => {
              const active = index === workIndex
              const orientation = work.orientation ?? 'landscape'
              const label = work.title
                ? `${work.title}, ${work.student}`
                : work.student
              return (
                <figure
                  key={work.id}
                  className={[
                    'carousel__slide',
                    `carousel__slide--${orientation}`,
                    active ? 'is-active' : 'is-side',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={active ? 'true' : undefined}
                  {...(!active
                    ? {
                        role: 'button' as const,
                        tabIndex: 0,
                        'aria-label': `Ver ${label}`,
                        onClick: () => {
                          setWorkIndex(index)
                          setUiVisible(true)
                        },
                        onKeyDown: (event: KeyboardEvent) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setWorkIndex(index)
                            setUiVisible(true)
                          }
                        },
                      }
                    : {})}
                >
                  <img
                    src={work.image}
                    alt={label}
                    className="carousel__image"
                    draggable={false}
                  />
                </figure>
              )
            })}
          </div>

          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            aria-label="Obra anterior"
            onClick={goPrev}
          >
            <svg viewBox="0 0 24 48" aria-hidden="true">
              <path d="M16 4 L6 24 L16 44" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            aria-label="Obra siguiente"
            onClick={goNext}
          >
            <svg viewBox="0 0 24 48" aria-hidden="true">
              <path d="M8 4 L18 24 L8 44" />
            </svg>
          </button>

          {current ? (
            <footer className="gallery__chrome gallery__chrome--bottom">
              <div className="gallery__caption">
                <h2 className="gallery__student">{current.student}</h2>
                {current.title ? (
                  <p className="gallery__work-title">{current.title}</p>
                ) : null}
              </div>
              <p className="gallery__progress">
                {workIndex + 1} / {works.length}
              </p>
            </footer>
          ) : null}
        </div>
      )}
    </section>
  )
}
