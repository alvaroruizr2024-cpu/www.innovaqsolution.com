import { useCallback, useEffect, useMemo, useState } from 'react'
import { COPY, PRODUCTS, neighbor } from './content.js'
import { productMedia } from './media.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { ShowroomCanvas } from './scene/ShowroomCanvas.jsx'
import { Overlay } from './ui/Overlay.jsx'
import { Sections } from './ui/Sections.jsx'

const QUALITY_KEY = 'innovaq-cinematic-quality'
const HINT_KEY = 'innovaq-cinematic-hint'

function detectQuality() {
  if (typeof window === 'undefined') return 'ultra'
  try {
    const stored = localStorage.getItem(QUALITY_KEY)
    if (stored === 'ultra' || stored === 'performance') return stored
  } catch {
    /* ignore */
  }
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const narrow = window.matchMedia?.('(max-width: 900px)')?.matches
  const save = navigator.connection?.saveData
  const touchPhone = narrow && (navigator.maxTouchPoints > 1 || /Mobi|Android/i.test(navigator.userAgent))
  if (reduce || save || touchPhone) return 'performance'
  return 'ultra'
}

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)
}

export default function App() {
  const [lang, setLang] = useState('es')
  const [introDone, setIntroDone] = useState(false)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [webgl, setWebgl] = useState(true)
  const [quality, setQuality] = useState('ultra')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hint, setHint] = useState(false)
  const t = COPY[lang]

  useEffect(() => {
    setQuality(detectQuality())
    setReducedMotion(prefersReducedMotion())
    try {
      if (!localStorage.getItem(HINT_KEY)) setHint(true)
    } catch {
      setHint(true)
    }
    try {
      const c = document.createElement('canvas')
      setWebgl(Boolean(c.getContext('webgl2') || c.getContext('webgl')))
    } catch {
      setWebgl(false)
    }
    PRODUCTS.forEach((p) => {
      const still = productMedia(p.code).still
      if (!still) return
      const img = new Image()
      img.decoding = 'async'
      img.src = still
    })
  }, [])

  useEffect(() => {
    if (reducedMotion) setIntroDone(true)
  }, [reducedMotion])

  const changeQuality = useCallback((next) => {
    setQuality(next)
    try {
      localStorage.setItem(QUALITY_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const dismissHint = useCallback(() => {
    setHint(false)
    try {
      localStorage.setItem(HINT_KEY, '1')
    } catch {
      /* ignore */
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
        dismissHint()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        dismissHint()
        setSelected((cur) => neighbor(cur || hovered || PRODUCTS[0].code, 1).code)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        dismissHint()
        setSelected((cur) => neighbor(cur || hovered || PRODUCTS[0].code, -1).code)
      }
      if (e.key === 'Enter' && hovered) setSelected(hovered)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hovered, dismissHint])

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
          reducedMotion={reducedMotion}
        />
      </ErrorBoundary>
    )
  }, [webgl, selected, hovered, introDone, quality, reducedMotion, select])

  return (
    <div id="top" className={`app ${introDone ? 'settled' : 'orbiting'} q-${quality} ${reducedMotion ? 'reduced-motion' : ''}`}>
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
        setQuality={changeQuality}
        hint={hint && introDone}
        onDismissHint={dismissHint}
      />
      <Sections lang={lang} t={t} formOpen={formOpen} setFormOpen={setFormOpen} selected={selected} />
    </div>
  )
}
