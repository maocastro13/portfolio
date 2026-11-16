import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { profile, stats, ui } from '../data/content'
import { useLang } from '../i18n'
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons'

const HeroGame = lazy(() => import('../game/HeroGame'))

/** If WebGL is unavailable the game simply does not render. */
class Safe3D extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Hero() {
  const { t } = useLang()
  const [ready, setReady] = useState(false)
  const [pre, mark, post] = t(profile.headline)

  // Load the 3D bundle only once the page is interactive.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 300)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-8 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow">{t(profile.role)}</p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {pre}
            <span className="text-gradient">{mark}</span>
            {post}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{t(profile.intro)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              {t(ui.hero.cta)} <ArrowIcon />
            </a>
            <a href={`${import.meta.env.BASE_URL}${profile.cv}`} download className="btn btn-ghost">
              <DownloadIcon /> {t(ui.hero.cv)}
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost px-3!">
              <LinkedInIcon />
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-ghost px-3!">
              <GitHubIcon />
            </a>
          </div>
        </div>

        <div className="order-first lg:order-none">
          <div className="relative mx-auto h-[340px] max-w-md sm:h-[420px] lg:h-[520px] lg:max-w-none">
            <Safe3D>
              <Suspense fallback={null}>{ready && <HeroGame />}</Suspense>
            </Safe3D>
          </div>
        </div>
      </div>

      <div className="container-x relative pb-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col-reverse bg-surface p-5 sm:p-6">
              <dt className="mt-1 text-sm leading-snug text-mute">{t(s.label)}</dt>
              <dd className="font-display text-3xl font-bold sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
