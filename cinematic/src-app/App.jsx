import { useCallback, useEffect, useMemo, useState } from 'react'
import { COPY, PRODUCTS, neighbor } from './content.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { ShowroomCanvas } from './scene/ShowroomCanvas.jsx'
import { Overlay } from './ui/Overlay.jsx'
import { Sections } from './ui/Sections.jsx'

function detectQuality() {
  if (typeof window === 'undefined') return 'performance'
  const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const small = window.matchMedia?.('(max-width: 720px)')?.matches
  const low = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  const save = navigator.connection?.saveData
  if (motion || small || low || save) return 'performance'
  return 'ultra'
}

export default function App() {
  const [lang, setLang] = useState('es')
  const [introDone, setIntroDone] = useState(false)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const [quality, setQuality] = useState('performance')
  const t = COPY[lang]

  useEffect(() => {
    setQuality(detectQuality())
    try {
      const c = document.createElement('canvas')
      setWebgl(Boolean(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setWebgl(false)
    }
  }, [])

  const select = useCallback((code) => {
    setSelected(code)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'Escape') {
        setSelected(null)
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelected((cur) => neighbor(cur || hovered || PRODUCTS[0].code, 1).code)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelected((cur) => neighbor(cur || hovered || PRODUCTS[0].code, -1).code)
      }
      if (e.key === 'Enter' && hovered) setSelected(hovered)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hovered])

  const openForm = () => {
    setFormOpen(true)
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const canvas = useMemo(() => {
    if (!webgl) return <div className="nowebgl" />
    return (
      <ErrorBoundary>
        <ShowroomCanvas
          selected={selected}
          hovered={hovered}
          onHover={setHovered}
          onSelect={select}
          introDone={introDone}
          setIntroDone={setIntroDone}
          quality={quality}
        />
      </ErrorBoundary>
    )
  }, [webgl, selected, hovered, introDone, quality, select])

  return (
    <div id="top" className={`app ${introDone ? 'settled' : 'orbiting'} q-${quality}`}>
      <div className="stage">{canvas}</div>
      <Overlay
        lang={lang}
        setLang={setLang}
        introDone={introDone}
        skipIntro={() => setIntroDone(true)}
        selected={selected}
        hovered={hovered}
        onSelect={select}
        onOpenForm={openForm}
        t={t}
        quality={quality}
        setQuality={setQuality}
      />
      <Sections lang={lang} t={t} formOpen={formOpen} setFormOpen={setFormOpen} selected={selected} />
    </div>
  )
}
