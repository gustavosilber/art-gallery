import type { Workshop } from '../content/types'

type Props = {
  workshop: Workshop
  workCount: number
  onEnter: () => void
  onGuestbook: () => void
}

export function Intro({ workshop, workCount, onEnter, onGuestbook }: Props) {
  return (
    <section className="intro" aria-label="Presentación del taller">
      <div className="intro__atmosphere" aria-hidden="true" />
      <div className="intro__frame">
        <p className="intro__year">{workshop.year}</p>
        <h1 className="intro__title">{workshop.title}</h1>
        {workshop.subtitle ? (
          <p className="intro__subtitle">{workshop.subtitle}</p>
        ) : null}
        {workshop.teacher ? (
          <p className="intro__teacher">
            <span className="intro__teacher-label">Prof.</span>{' '}
            {workshop.teacher}
            {workshop.teacherRole ? (
              <span className="intro__teacher-role">, {workshop.teacherRole}</span>
            ) : null}
          </p>
        ) : null}
        <p className="intro__concept">{workshop.concept}</p>
        <div className="intro__actions">
          <button type="button" className="btn" onClick={onEnter}>
            Ver la muestra
          </button>
          <button type="button" className="btn btn--ghost" onClick={onGuestbook}>
            Libro de visitas
          </button>
          <p className="intro__meta">{workCount} obras</p>
        </div>
      </div>

      <p className="site-credit">
        diseño y desarrollo <span className="site-credit__brand">+Silber</span>
        <span className="site-credit__sep">|</span>
        Gustavo Silber
      </p>
    </section>
  )
}
