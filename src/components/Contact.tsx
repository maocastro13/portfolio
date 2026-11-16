import { useState, type FormEvent } from 'react'
import { profile, ui } from '../data/content'
import { useLang } from '../i18n'
import { GitHubIcon, LinkedInIcon } from './Icons'

// EmailJS public identifiers (safe to ship in client code).
const EMAILJS = { service: 'service_egph01u', template: 'template_fw5ee76', publicKey: 'aWRHk1eabYC3gy4Rj' }
const TO_EMAIL = 'maocastro13@gmail.com'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company')) return // honeypot: bots fill hidden fields
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: data.get('name'),
          to_name: profile.name,
          from_email: data.get('email'),
          to_email: TO_EMAIL,
          message: data.get('message'),
        },
        { publicKey: EMAILJS.publicKey },
      )
      form.reset()
      setStatus('ok')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow">{t(ui.contact.eyebrow)}</p>
          <h2 className="h2">{t(ui.contact.title)}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">{t(ui.contact.text)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>

        <form data-reveal onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-mute">{t(ui.contact.name)}</span>
              <input name="name" required autoComplete="name" className="field" />
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-mute">{t(ui.contact.email)}</span>
              <input name="email" type="email" required autoComplete="email" className="field" />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-2 block text-mute">{t(ui.contact.message)}</span>
            <textarea name="message" required rows={5} className="field resize-y" />
          </label>
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
              {t(status === 'sending' ? ui.contact.sending : ui.contact.send)}
            </button>
            <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {status === 'ok' && t(ui.contact.ok)}
              {status === 'error' && t(ui.contact.error)}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
