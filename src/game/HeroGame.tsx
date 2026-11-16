import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Canvas } from '@react-three/fiber'
import { specialties, ui } from '../data/content'
import { useLang } from '../i18n'
import Scene, { type Input } from './Scene'
import { game, PICKUP_COLORS, useCollected } from './store'

const KEYS: Record<string, [number, number]> = {
  w: [0, -1], arrowup: [0, -1],
  s: [0, 1], arrowdown: [0, 1],
  a: [-1, 0], arrowleft: [-1, 0],
  d: [1, 0], arrowright: [1, 0],
}

export default function HeroGame() {
  const { t } = useLang()
  const collected = useCollected()
  const done = collected.every(Boolean)
  const wrap = useRef<HTMLDivElement>(null)
  const debugEl = useRef<HTMLPreElement>(null)
  const input = useRef<Input>({ x: 0, z: 0, jump: false, active: false })
  const held = useRef(new Set<string>())
  const knob = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [focused, setFocused] = useState(false)
  const [debug, setDebug] = useState(false)
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  const [toast, setToast] = useState<number | null>(null)
  const prev = useRef(collected)

  // Stop rendering when the hero is off screen.
  useEffect(() => {
    if (!wrap.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  // Announce the skill that was just collected.
  useEffect(() => {
    const i = collected.findIndex((v, j) => v && !prev.current[j])
    prev.current = collected
    if (i < 0) return
    setToast(i)
    const id = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(id)
  }, [collected])

  function syncKeys() {
    let x = 0
    let z = 0
    held.current.forEach((k) => {
      const d = KEYS[k]
      if (d) {
        x += d[0]
        z += d[1]
      }
    })
    Object.assign(input.current, { x, z, jump: held.current.has(' ') })
  }

  // Keys only count while the game itself has focus, so page scrolling is never hijacked.
  function onKey(e: KeyboardEvent, down: boolean) {
    if (e.target !== e.currentTarget) return
    const k = e.key.toLowerCase()
    if (!(k in KEYS) && k !== ' ') return
    e.preventDefault()
    if (down) {
      held.current.add(k)
      input.current.active = true
    } else held.current.delete(k)
    syncKeys()
  }

  function onStick(e: PointerEvent<HTMLDivElement>) {
    if (e.type === 'pointerdown') e.currentTarget.setPointerCapture(e.pointerId)
    const end = e.type === 'pointerup' || e.type === 'pointercancel'
    if (!end && !e.currentTarget.hasPointerCapture(e.pointerId)) return
    const r = e.currentTarget.getBoundingClientRect()
    let x = end ? 0 : (e.clientX - r.left - r.width / 2) / (r.width / 2)
    let z = end ? 0 : (e.clientY - r.top - r.height / 2) / (r.height / 2)
    const len = Math.hypot(x, z)
    if (len > 1) {
      x /= len
      z /= len
    }
    Object.assign(input.current, { x, z, active: true })
    if (knob.current) knob.current.style.transform = `translate(${x * 26}px, ${z * 26}px)`
  }

  const count = collected.filter(Boolean).length
  const hint = touch ? ui.game.hintTouch : focused ? ui.game.hintPlaying : ui.game.hintKeys

  return (
    <div
      ref={wrap}
      tabIndex={0}
      role="application"
      aria-label={t(ui.game.label)}
      onKeyDown={(e) => onKey(e, true)}
      onKeyUp={(e) => onKey(e, false)}
      onFocus={(e) => e.target === e.currentTarget && setFocused(true)}
      onBlur={(e) => {
        if (e.target !== e.currentTarget) return
        setFocused(false)
        held.current.clear()
        syncKeys()
      }}
      className={`relative h-full w-full cursor-pointer select-none overflow-hidden rounded-3xl border transition-colors focus:outline-none ${focused ? 'border-accent/60' : 'border-line/70'}`}
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.7, 7.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene input={input} collected={collected} debugEl={debugEl} />
      </Canvas>

      {/* score */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5" aria-hidden>
        {PICKUP_COLORS.map((c, i) => (
          <span
            key={c}
            className="h-2.5 w-2.5 rotate-45 border transition-colors duration-300"
            style={{ borderColor: c, background: collected[i] ? c : 'transparent' }}
          />
        ))}
        <span className="ml-1.5 font-display text-xs text-mute">
          {count}/{PICKUP_COLORS.length}
        </span>
      </div>

      {/* debug */}
      <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setDebug((d) => !d)}
          aria-pressed={debug}
          className={`chip font-mono transition-colors hover:border-accent ${debug ? 'border-accent! text-ink!' : ''}`}
        >
          {'</>'} {t(ui.game.debug)}
        </button>
        <pre
          ref={debugEl}
          className={`rounded-lg border border-line bg-bg/85 p-3 font-mono text-[11px] leading-relaxed text-accent-2 ${debug ? '' : 'hidden'}`}
        />
      </div>

      {/* messages */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-center gap-2 px-3 text-center" role="status" aria-live="polite">
        {toast !== null && !done && (
          <p className="rounded-full border bg-bg/90 px-4 py-1.5 text-sm font-semibold" style={{ borderColor: PICKUP_COLORS[toast], color: PICKUP_COLORS[toast] }}>
            ✓ {t(specialties[toast].title)}
          </p>
        )}
        {done ? (
          <p className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 rounded-full border border-accent bg-bg/90 px-4 py-1.5 text-sm font-semibold">
            {t(ui.game.done)}
            <button type="button" onClick={() => game.reset()} className="text-accent underline underline-offset-4 hover:text-white">
              {t(ui.game.again)}
            </button>
          </p>
        ) : (
          toast === null && <p className={`text-xs text-mute ${touch ? 'max-w-[9rem] pb-3' : ''}`}>{t(hint)}</p>
        )}
      </div>

      {/* touch controls */}
      {touch && (
        <>
          <div
            onPointerDown={onStick}
            onPointerMove={onStick}
            onPointerUp={onStick}
            onPointerCancel={onStick}
            className="absolute bottom-3 left-3 flex h-20 w-20 touch-none items-center justify-center rounded-full border border-line bg-bg/60"
            aria-hidden
          >
            <div ref={knob} className="h-8 w-8 rounded-full bg-accent/80" />
          </div>
          <button
            type="button"
            onPointerDown={() => Object.assign(input.current, { jump: true, active: true })}
            onPointerUp={() => (input.current.jump = false)}
            onPointerCancel={() => (input.current.jump = false)}
            className="absolute bottom-5 right-3 h-16 w-16 touch-none rounded-full border border-accent bg-bg/60 text-xs font-semibold text-accent"
          >
            {t(ui.game.jump)}
          </button>
        </>
      )}
    </div>
  )
}
