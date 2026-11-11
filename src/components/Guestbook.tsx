import { useMemo, useState, type FormEvent } from 'react'
import { addGuestbookEntry, loadGuestbook } from '../lib/guestbookStore'
import type { GuestbookEntry } from '../content/types'

type Props = {
  onBack: () => void
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return ''
  }
}

export function Guestbook({ onBack }: Props) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => loadGuestbook())
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const countLabel = useMemo(() => {
    const n = entries.length
    return n === 1 ? '1 mensaje' : `${n} mensajes`
  }, [entries.length])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextName = name.trim()
    const nextMessage = message.trim()

    if (nextName.length < 2) {
      setError('Escribí tu nombre.')
      return
    }
    if (nextMessage.length < 3) {
      setError('Escribí un mensaje un poco más largo.')
      return
    }
    if (nextMessage.length > 420) {
      setError('El mensaje es demasiado largo.')
      return
    }

    const entry = addGuestbookEntry({ name: nextName, message: nextMessage })
    setEntries((current) => [entry, ...current])
    setName('')
    setMessage('')
    setError('')
  }

  return (
    <section className="guestbook" aria-label="Libro de visitas">
      <header className="guestbook__top">
        <button type="button" className="ghost" onClick={onBack}>
          Inicio
        </button>
        <p className="guestbook__count">{countLabel}</p>
      </header>

      <div className="guestbook__frame">
        <p className="guestbook__kicker">Libro de visitas</p>
        <h1 className="guestbook__title">Dejá tu huella</h1>
        <p className="guestbook__lead">
          Un lugar para saludar, contar qué te llegó de la muestra o simplemente firmar.
        </p>

        <form className="guestbook__form" onSubmit={onSubmit}>
          <label className="guestbook__field">
            <span className="guestbook__label">Nombre</span>
            <input
              className="guestbook__input"
              name="name"
              autoComplete="nickname"
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="guestbook__field">
            <span className="guestbook__label">Mensaje</span>
            <textarea
              className="guestbook__textarea"
              name="message"
              rows={4}
              maxLength={420}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <div className="guestbook__form-foot">
            <button type="submit" className="btn">
              Firmar
            </button>
            {error ? <p className="guestbook__error">{error}</p> : null}
          </div>
        </form>

        <ul className="guestbook__list">
          {entries.map((entry) => (
            <li key={entry.id} className="guestbook__entry">
              <div className="guestbook__entry-head">
                <h2 className="guestbook__name">{entry.name}</h2>
                <time className="guestbook__date" dateTime={entry.createdAt}>
                  {formatDate(entry.createdAt)}
                </time>
              </div>
              <p className="guestbook__message">{entry.message}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="site-credit">
        diseño y desarrollo <span className="site-credit__brand">+Silber</span>
        <span className="site-credit__sep">|</span>
        Gustavo Silber
      </p>
    </section>
  )
}
