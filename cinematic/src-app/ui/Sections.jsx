import { useState } from 'react'
import {
  COMPANY,
  ISO,
  PRODUCTS,
  SECTORS,
  SERVICES,
  STATS,
  VIDEO_SLOTS,
  waUrl,
} from '../content.js'
import { motionSrc, productMedia } from '../media.js'

function Chapter({ n, children, ...props }) {
  return (
    <section {...props} className={`band ${props.className || ''}`}>
      <p className="chapter-no">{String(n).padStart(2, '0')}</p>
      {children}
    </section>
  )
}

export function Sections({ lang, t, formOpen, setFormOpen, selected }) {
  return (
    <main className="page film">
      <Stats lang={lang} />
      <Products lang={lang} t={t} />
      <Services lang={lang} t={t} />
      <Sectors lang={lang} t={t} />
      <Iso lang={lang} t={t} />
      <MotionSlots lang={lang} t={t} />
      <DemoForm lang={lang} t={t} open={formOpen} setOpen={setFormOpen} selected={selected} />
      <SiteFooter lang={lang} t={t} />
    </main>
  )
}

function Stats({ lang }) {
  return (
    <Chapter n={1} className="stats" id="stats">
      {STATS.map((s) => (
        <article key={s.n}>
          <strong>{s.n}</strong>
          <span>{s[lang]}</span>
        </article>
      ))}
    </Chapter>
  )
}

function Products({ lang, t }) {
  return (
    <Chapter n={2} id="productos">
      <header className="sec-head">
        <p>{t.equalNote}</p>
        <h2>{t.products}</h2>
      </header>
      <div className="grid products">
        {PRODUCTS.map((p) => {
          const media = productMedia(p.code)
          return (
          <article key={p.code} className="card" style={{ '--c': p.color }}>
            {media.still ? <img className="card-still" src={media.still} alt="" /> : <div className="card-still fallback" style={{ background: `linear-gradient(135deg, ${p.color}, #05070c)` }} />}
            <h3>{p.name}{p.alias ? <small> · {p.alias}</small> : null}</h3>
            <p className="sub">{p.sub[lang]}</p>
            <p>{p.desc[lang]}</p>
            <a className="text-wa" href={waUrl(lang, p)} target="_blank" rel="noreferrer">
              {t.consultCta}
            </a>
          </article>
          )
        })}
      </div>
    </Chapter>
  )
}

function Services({ lang, t }) {
  return (
    <Chapter n={3} id="servicios">
      <header className="sec-head">
        <p>INNOVAQ</p>
        <h2>{t.services}</h2>
      </header>
      <div className="grid services">
        {SERVICES.map((s) => (
          <article key={s.title.es} className="card">
            <h3>{s.title[lang]}</h3>
            <p>{s.desc[lang]}</p>
            <ul>
              {s.items[lang].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Chapter>
  )
}

function Sectors({ lang, t }) {
  return (
    <Chapter n={4} id="sectores">
      <header className="sec-head">
        <p>B2B</p>
        <h2>{t.sectors}</h2>
      </header>
      <div className="sector-row">
        {SECTORS.map((s) => (
          <article key={s.name.es}>
            <span>{s.icon}</span>
            <strong>{s.name[lang]}</strong>
          </article>
        ))}
      </div>
    </Chapter>
  )
}

function Iso({ lang, t }) {
  return (
    <Chapter n={5} id="credenciales" className="iso">
      <header className="sec-head">
        <p>{t.credentials}</p>
        <h2>{t.isoTitle}</h2>
        <p className="lede">{t.isoSub}</p>
        <p className="lede">{t.credSub}</p>
      </header>
      <div className="iso-row">
        {ISO.map((iso) => (
          <article key={iso.n} style={{ '--c': iso.color }}>
            <span>ISO</span>
            <strong>{iso.n}</strong>
            <small>{iso.label[lang]}</small>
          </article>
        ))}
      </div>
    </Chapter>
  )
}

function MotionSlots({ lang, t }) {
  return (
    <Chapter n={6} id="motion">
      <header className="sec-head">
        <p>{t.motion}</p>
        <h2>{t.videoTitle}</h2>
        <p className="lede">{t.videoSub}</p>
      </header>
      <div className="grid videos">
        {VIDEO_SLOTS.map((slot) => {
          const src = motionSrc(slot.id)
          return (
          <figure key={slot.id} className="video-slot">
            <div className="video-frame">
              <img src="./motion/poster.svg" alt="" />
              {src ? (
                <video controls playsInline loop muted preload="metadata" poster="./motion/poster.svg" src={src} />
              ) : null}
            </div>
            <figcaption>
              <strong>{slot[lang]}</strong>
              <span>{src ? t.videoReady : t.videoEmpty}</span>
              <code>motion/{slot.file}</code>
            </figcaption>
          </figure>
          )
        })}
      </div>
    </Chapter>
  )
}

function DemoForm({ lang, t, open, setOpen, selected }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: selected || 'SIG360',
    intent: 'demo',
    message: '',
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const product = PRODUCTS.find((p) => p.code === form.interest)
    const intentLabel = form.intent === 'trial' ? (lang === 'es' ? 'Prueba' : 'Trial') : 'Demo'
    const subject = encodeURIComponent(`${intentLabel} INNOVAQ · ${product?.name || form.interest} · ${form.company}`)
    const body = encodeURIComponent(
      [
        `Nombre: ${form.name}`,
        `Empresa: ${form.company}`,
        `Email: ${form.email}`,
        `Interés: ${product?.name || form.interest}`,
        `Tipo: ${intentLabel}`,
        '',
        form.message,
        '',
        'Consulta corporativa — sin precios en landing.',
        COMPANY.city,
        `RUC ${COMPANY.ruc}`,
      ].join('\n'),
    )
    window.open(`mailto:${COMPANY.email}?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
  }

  return (
    <section id="demo" className={`band form-band ${open ? 'open' : ''}`}>
      <p className="chapter-no">07</p>
      <header className="sec-head">
        <p>{COMPANY.email}</p>
        <h2>{t.formTitle}</h2>
        <p className="lede">{t.formSub}</p>
      </header>
      {sent ? (
        <div className="thanks">
          <h3>{t.sent}</h3>
          <p>{t.sentBody}</p>
          <a className="btn wa" href={waUrl(lang, PRODUCTS.find((p) => p.code === form.interest))} target="_blank" rel="noreferrer">
            {t.wa}
          </a>
        </div>
      ) : (
        <form className="demo-form" onSubmit={submit}>
          <label>
            {t.name}
            <input required value={form.name} onChange={(e) => set('name', e.target.value)} />
          </label>
          <label>
            {t.company}
            <input required value={form.company} onChange={(e) => set('company', e.target.value)} />
          </label>
          <label>
            {t.email}
            <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </label>
          <label>
            {t.interest}
            <select value={form.interest} onChange={(e) => set('interest', e.target.value)}>
              {PRODUCTS.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} — {p.sub[lang]}
                </option>
              ))}
              <option value="ISO">{lang === 'es' ? 'Implementación ISO' : 'ISO Implementation'}</option>
              <option value="MINTRA">{lang === 'es' ? 'Auditoría MINTRA' : 'MINTRA Audit'}</option>
            </select>
          </label>
          <fieldset>
            <legend>{t.trial} / {t.demo}</legend>
            <label className="radio">
              <input type="radio" name="intent" checked={form.intent === 'demo'} onChange={() => set('intent', 'demo')} />
              {t.demo}
            </label>
            <label className="radio">
              <input type="radio" name="intent" checked={form.intent === 'trial'} onChange={() => set('intent', 'trial')} />
              {t.trial}
            </label>
          </fieldset>
          <label className="full">
            {t.message}
            <textarea rows={4} value={form.message} onChange={(e) => set('message', e.target.value)} />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn ghost">
              {t.send}
            </button>
            <a className="btn wa" href={waUrl(lang, PRODUCTS.find((p) => p.code === form.interest))} target="_blank" rel="noreferrer">
              {t.wa}
            </a>
          </div>
        </form>
      )}
      <button type="button" className="close-form" hidden={!open} onClick={() => setOpen(false)}>
        {t.close}
      </button>
    </section>
  )
}

export function SiteFooter({ lang, t }) {
  return (
    <footer className="site-foot">
      <div>
        <strong>{COMPANY.name}</strong>
        <p>{COMPANY.slogan[lang]}</p>
        <p>RUC {COMPANY.ruc} · {COMPANY.city}</p>
        <p>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · {COMPANY.phone}
        </p>
      </div>
      <div>
        <a href="../global/">{t.portal}</a>
        <p>{t.consult}</p>
        <p>{t.footer}</p>
      </div>
    </footer>
  )
}
