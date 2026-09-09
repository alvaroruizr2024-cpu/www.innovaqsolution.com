import { useEffect, useMemo, useState } from 'react'
import { COPY } from './content.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { ShowroomCanvas } from './scene/ShowroomCanvas.jsx'
import { Overlay } from './ui/Overlay.jsx'
import { Sections } from './ui/Sections.jsx'

function preferReduced() {
  if (typeof window === 'undefined') return false
  const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const small = window.matchMedia?.('(max-width: 720px)')?.matches
  const low = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  return Boolean(motion || (small && low))
}

export default function App() {
  const [lang, setLang] = useState('es')
  const [introDone, setIntroDone] = useState(false)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const [reduced, setReduced] = useState(false)
  const t = COPY[lang]

  useEffect(() => {
    setReduced(preferReduced())
    try {
      const c = document.createElement('canvas')
      const ok = c.getContext('webgl2') || c.getContext('webgl')
      setWebgl(Boolean(ok))
    } catch {
      setWebgl(false)
    }
  }, [])

  const openForm = () => {
    setFormOpen(true)
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const skipIntro = () => setIntroDone(true)

  const canvas = useMemo(() => {
    if (!webgl) return <div className="nowebgl" />
    return (
      <ErrorBoundary>
        <ShowroomCanvas
          selected={selected}
          hovered={hovered}
          onHover={setHovered}
          onSelect={setSelected}
          introDone={introDone}
          setIntroDone={setIntroDone}
          reduced={reduced}
        />
      </ErrorBoundary>
    )
  }, [webgl, selected, hovered, introDone, reduced])

  return (
    <div id="top" className={`app ${introDone ? 'settled' : 'orbiting'}`}>
      <div className="stage">{canvas}</div>
      <Overlay
        lang={lang}
        setLang={setLang}
        introDone={introDone}
        skipIntro={skipIntro}
        selected={selected}
        hovered={hovered}
        onSelect={setSelected}
        onOpenForm={openForm}
        t={t}
      />
      <Sections lang={lang} t={t} formOpen={formOpen} setFormOpen={setFormOpen} selected={selected} />
    </div>
  )
}
