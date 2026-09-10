import { COMPANY, PRODUCTS, neighbor, productIndex, waUrl } from '../content.js'
import { productMedia } from '../media.js'

export function Overlay({
  lang,
  setLang,
  introDone,
  skipIntro,
  selected,
  hovered,
  onSelect,
  onOpenForm,
  t,
  quality,
  setQuality,
}) {
  const activeCode = selected || hovered
  const active = PRODUCTS.find((p) => p.code === activeCode)
  const product = selected ? PRODUCTS.find((p) => p.code === selected) : null
  const idx = productIndex(activeCode || PRODUCTS[0].code)
  const media = active ? productMedia(active.code) : {}

  const goRel = (dir) => {
    const from = selected || hovered || PRODUCTS[0].code
    onSelect(neighbor(from, dir).code)
  }

  return (
    <div className="hud" aria-live="polite">
      <header className="hud-top">
        <a className="brand" href="#top">
          <img src="./logo.jpg" alt="INNOVAQ" />
          <span>
            <strong>INNOVAQ</strong>
            <small>SOLUTIONS SAC</small>
          </span>
        </a>
        <nav className="hud-nav">
          <a href="#productos">{t.products}</a>
          <a href="#servicios">{t.services}</a>
          <a href="#sectores">{t.sectors}</a>
          <a href="#demo">{t.demo}</a>
          <a href="../global/" className="ghost">
            {t.portal}
          </a>
        </nav>
        <div className="hud-tools">
          <button
            type="button"
            className={`lang ${quality === 'ultra' ? 'on' : ''}`}
            onClick={() => setQuality(quality === 'ultra' ? 'performance' : 'ultra')}
          >
            {quality === 'ultra' ? t.qualityUltra : t.qualityPerf}
          </button>
          <details className="mobile-menu">
            <summary aria-label="Menu">☰</summary>
            <div>
              <a href="#productos">{t.products}</a>
              <a href="#servicios">{t.services}</a>
              <a href="#sectores">{t.sectors}</a>
              <a href="#demo">{t.demo}</a>
              <a href="../global/">{t.portal}</a>
            </div>
          </details>
          <button type="button" className="lang" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label="Language">
            {lang === 'es' ? 'ES' : 'EN'}
            <span>/ {lang === 'es' ? 'EN' : 'ES'}</span>
          </button>
        </div>
      </header>

      <div className={`letterbox ${introDone ? 'hidden' : ''}`} />

      <div className={`hud-left ${active ? 'dim' : ''}`}>
        <p className="badge">{t.badge}</p>
        <h1>{t.title}</h1>
        <p className="lede">{t.subtitle}</p>
        <p className="equal">{t.equalNote}</p>
        <div className="cta-row">
          <a className="btn wa" href={waUrl(lang, product)} target="_blank" rel="noreferrer">
            {t.wa}
          </a>
          <button type="button" className="btn ghost" onClick={onOpenForm}>
            {t.demo}
          </button>
        </div>
        <p className="consult">{t.consult}</p>
        <p className="keys">{t.keysHint}</p>
      </div>

      <aside className="hud-right">
        <p className="kicker">{introDone ? t.interactHint : t.orbitHint}</p>
        <ol className="plist">
          {PRODUCTS.map((p, i) => {
            const m = productMedia(p.code)
            return (
              <li key={p.code}>
                <button
                  type="button"
                  className={activeCode === p.code ? 'on' : ''}
                  style={{ '--c': p.color }}
                  onClick={() => onSelect(selected === p.code ? null : p.code)}
                >
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nm">{p.name}</span>
                  {m.still || m.loop ? <span className="dot" title="media" /> : null}
                </button>
              </li>
            )
          })}
        </ol>
      </aside>

      {active && (
        <div className="hud-card glass">
          <p className="card-kicker" style={{ color: active.color }}>
            {String(idx + 1).padStart(2, '0')} / 11 · {active.sub[lang]}
          </p>
          <h2>
            {active.name}
            {active.alias ? <small> · {active.alias}</small> : null}
          </h2>
          <p>{active.desc[lang]}</p>
          <ul>
            {active.features[lang].slice(0, 5).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="media-flags">
            {media.still ? <span>{t.stillReady}</span> : null}
            {media.loop ? <span>{t.videoReady}</span> : null}
          </p>
          <div className="card-actions">
            <a className="btn wa slim" href={waUrl(lang, active)} target="_blank" rel="noreferrer">
              {t.consultCta}
            </a>
            <button type="button" className="btn ghost slim" onClick={() => goRel(-1)}>
              ← {t.prev}
            </button>
            <button type="button" className="btn ghost slim" onClick={() => goRel(1)}>
              {t.next} →
            </button>
            {selected && (
              <button type="button" className="btn ghost slim" onClick={() => onSelect(null)}>
                {t.close}
              </button>
            )}
          </div>
        </div>
      )}

      <nav className="film-rail" aria-label={t.film}>
        <button type="button" className="rail-nav" onClick={() => goRel(-1)} aria-label={t.prev}>
          ←
        </button>
        {PRODUCTS.map((p, i) => (
          <button
            key={p.code}
            type="button"
            className={activeCode === p.code ? 'on' : ''}
            style={{ '--c': p.color }}
            onClick={() => onSelect(selected === p.code ? null : p.code)}
            title={p.name}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
        <button type="button" className="rail-nav" onClick={() => goRel(1)} aria-label={t.next}>
          →
        </button>
      </nav>

      <div className="mobile-rail" aria-label={t.products}>
        {PRODUCTS.map((p, i) => (
          <button
            key={p.code}
            type="button"
            className={activeCode === p.code ? 'on' : ''}
            style={{ '--c': p.color }}
            onClick={() => onSelect(selected === p.code ? null : p.code)}
          >
            {String(i + 1).padStart(2, '0')} {p.name}
          </button>
        ))}
      </div>

      <a className="wa-float" href={waUrl(lang, product || active)} target="_blank" rel="noreferrer">
        {t.wa}
      </a>

      {!introDone && (
        <button type="button" className="skip" onClick={skipIntro}>
          {t.skip}
        </button>
      )}

      <footer className="hud-bottom">
        <span>{t.film}</span>
        <span>{COMPANY.city}</span>
        <span>RUC {COMPANY.ruc}</span>
        <span>{COMPANY.phone}</span>
      </footer>
    </div>
  )
}
