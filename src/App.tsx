import { useState } from 'react'
import { Gallery } from './components/Gallery'
import { Guestbook } from './components/Guestbook'
import { Intro } from './components/Intro'
import { workshop } from './content/workshop'

type View = 'intro' | 'gallery' | 'guestbook'

export default function App() {
  const [view, setView] = useState<View>('intro')

  return (
    <main className="app">
      {view === 'intro' ? (
        <Intro
          workshop={workshop}
          workCount={workshop.works.length}
          onEnter={() => setView('gallery')}
          onGuestbook={() => setView('guestbook')}
        />
      ) : view === 'guestbook' ? (
        <Guestbook onBack={() => setView('intro')} />
      ) : (
        <Gallery workshop={workshop} onExit={() => setView('intro')} />
      )}
    </main>
  )
}
