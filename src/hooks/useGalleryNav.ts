import { useEffect, useRef } from 'react'

type Options = {
  enabled: boolean
  onPrev: () => void
  onNext: () => void
  onExit?: () => void
}

export function useGalleryNav({ enabled, onPrev, onNext, onExit }: Options) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!enabled) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        onNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPrev()
      } else if (event.key === 'Escape') {
        onExit?.()
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      touchStart.current = { x: touch.clientX, y: touch.clientY }
    }

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current
      const touch = event.changedTouches[0]
      touchStart.current = null
      if (!start || !touch) return

      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
      if (dx < 0) onNext()
      else onPrev()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [enabled, onPrev, onNext, onExit])
}
