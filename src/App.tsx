import { useEffect } from 'react'
import Contact from './components/Contact'
import Header from './components/Header'
import Hero from './components/Hero'
import { About, Experience, Testimonials, Work } from './components/Sections'
import { ui } from './data/content'
import { useLang } from './i18n'

/** Fade sections in as they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const { t } = useLang()
  useReveal()

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <footer className="border-t border-line py-8">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 text-sm text-mute">
          <p>
            © {new Date().getFullYear()} · {t(ui.footer)}
          </p>
          <a href="#top" className="hover:text-ink">
            ↑
          </a>
        </div>
      </footer>
    </>
  )
}
