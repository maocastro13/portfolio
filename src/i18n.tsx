import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'
/** A value available in both languages. */
export type L<T = string> = Record<Lang, T>

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: <T>(v: L<T>) => T }
const LangContext = createContext<Ctx | null>(null)
const KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (v) => v[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
