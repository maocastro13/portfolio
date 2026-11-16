import { useState } from 'react'
import { profile, ui } from '../data/content'
import { useLang } from '../i18n'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  ['about', ui.nav.about],
  ['work', ui.nav.work],
  ['experience', ui.nav.experience],
  ['testimonials', ui.nav.testimonials],
  ['contact', ui.nav.contact],
] as const

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg">
        {t(ui.skip)}
      </a>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3 font-display font-bold">
          <img src={profile.logo} alt="" width={36} height={30} className="h-8 w-auto" />
          <span>{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-sm text-mute transition-colors hover:text-ink">
              {t(label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            aria-label={t(ui.switchLang)}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold tracking-wide hover:border-accent"
          >
            <span className={lang === 'en' ? 'text-accent' : 'text-mute'}>EN</span>
            <span className="mx-1 text-line">/</span>
            <span className={lang === 'es' ? 'text-accent' : 'text-mute'}>ES</span>
          </button>
          <button
            type="button"
            className="rounded-full border border-line p-2 md:hidden"
            aria-label={t(ui.menu)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg md:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-mute hover:text-ink">
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
