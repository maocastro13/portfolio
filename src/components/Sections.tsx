import { experience, profile, projects, skills, specialties, testimonials, ui } from '../data/content'
import { useLang } from '../i18n'
import { PICKUP_COLORS, useCollected } from '../game/store'
import { GitHubIcon, LinkedInIcon, PlayIcon } from './Icons'

export function About() {
  const { t } = useLang()
  const collected = useCollected()
  return (
    <section id="about" className="section">
      <div className="container-x">
        <div data-reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{t(ui.about.eyebrow)}</p>
            <h2 className="h2">{t(ui.about.title)}</h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-mute">
            {t(profile.about).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <ul data-reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((s, i) => (
            <li
              key={s.title.en}
              className="card p-6 transition-[border-color,box-shadow] duration-500"
              style={collected[i] ? { borderColor: PICKUP_COLORS[i], boxShadow: `0 0 28px -10px ${PICKUP_COLORS[i]}` } : undefined}
            >
              <span className="flex items-center justify-between font-display text-sm text-accent">
                0{i + 1}
                {collected[i] && (
                  <span className="text-xs" style={{ color: PICKUP_COLORS[i] }}>
                    ✓ {t(ui.game.unlocked)}
                  </span>
                )}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold">{t(s.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{t(s.text)}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="card mt-4 p-6 sm:p-8">
          <h3 className="font-display text-lg font-semibold">{t(ui.skills)}</h3>
          <dl className="mt-5 grid gap-6 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.group.en}>
                <dt className="text-sm text-mute">{t(g.group)}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="chip text-ink!">
                      {it}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Work() {
  const { t } = useLang()
  return (
    <section id="work" className="section border-y border-line bg-surface/40">
      <div className="container-x">
        <div data-reveal>
          <p className="eyebrow">{t(ui.work.eyebrow)}</p>
          <h2 className="h2">{t(ui.work.title)}</h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((p) => (
            <li key={p.name} data-reveal className="card flex flex-col overflow-hidden">
              <img
                src={p.image}
                alt=""
                width={315}
                height={250}
                loading="lazy"
                decoding="async"
                className="aspect-[315/250] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{t(p.description)}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-medium">
                  {p.itch && (
                    <a href={p.itch} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-white">
                      <PlayIcon width={14} height={14} /> {t(ui.work.play)}
                      <span className="sr-only"> — {p.name}</span>
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-mute hover:text-ink">
                      <GitHubIcon width={14} height={14} /> {t(ui.work.code)}
                      <span className="sr-only"> — {p.name}</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Experience() {
  const { t } = useLang()
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <div data-reveal>
          <p className="eyebrow">{t(ui.experience.eyebrow)}</p>
          <h2 className="h2">{t(ui.experience.title)}</h2>
        </div>
        <ol className="relative mt-12 space-y-10 before:absolute before:bottom-2 before:left-6 before:top-2 before:w-px before:bg-line">
          {experience.map((job) => (
            <li key={job.company + job.date.en} data-reveal className="relative grid gap-x-8 gap-y-3 pl-16 lg:grid-cols-[17rem_1fr]">
              <img
                src={job.logo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                className="absolute left-0 top-0 h-12 w-12 rounded-full border border-line bg-raised object-contain"
              />
              <div>
                <h3 className="font-display font-semibold leading-snug">{t(job.title)}</h3>
                <p className="mt-1 text-sm text-accent">{job.company}</p>
                <p className="mt-1 text-sm text-mute">{t(job.date)}</p>
              </div>
              <ul className="space-y-2 text-[0.95rem] leading-relaxed text-mute">
                {t(job.points).map((pt) => (
                  <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Testimonials() {
  const { t } = useLang()
  return (
    <section id="testimonials" className="section border-y border-line bg-surface/40">
      <div className="container-x">
        <div data-reveal>
          <p className="eyebrow">{t(ui.testimonials.eyebrow)}</p>
          <h2 className="h2">{t(ui.testimonials.title)}</h2>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((p) => (
            <li key={p.name} data-reveal>
              <figure className="card flex h-full flex-col p-6">
                <blockquote className="flex-1 leading-relaxed text-ink/90">“{t(p.quote)}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={p.image} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-mute">{p.role}</p>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" aria-label={`${p.name} — LinkedIn`} className="text-mute hover:text-accent">
                    <LinkedInIcon />
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
