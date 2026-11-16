import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, type Group, type Mesh } from 'three'
import { game, PICKUP_COLORS } from './store'

export type Input = { x: number; z: number; jump: boolean; active: boolean }
type PlayerState = 'IDLE' | 'RUN' | 'JUMP' | 'FALL'

const ARENA = 3.6
const SPEED = 3.6
const ACCEL = 12
const JUMP = 7
const GRAVITY = 20
const HEIGHT = 1.95
const CAM_Y = 3.7
const CAM_Z = 7.4
/** x, y, z — the last one floats high enough to need a jump. */
const PICKUPS: [number, number, number][] = [
  [-2.3, 0.9, -1.4],
  [2.4, 0.9, -1.0],
  [-1.9, 0.9, 2.0],
  [1.7, 2.75, 1.7],
]

const C = { skin: '#c8906a', hair: '#1b1411', sweater: '#cdb893', sweaterDark: '#b39f7c', pants: '#1c1c26', shoe: '#f1f1f4', dark: '#16161d' }
const { damp } = MathUtils

function Box({ s, p, c }: { s: [number, number, number]; p: [number, number, number]; c: string }) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} flatShading roughness={0.85} />
    </mesh>
  )
}

/** Low-poly character built from boxes; faces +z, feet at y = 0. */
function Character({ refs }: { refs: Record<'body' | 'armL' | 'armR' | 'legL' | 'legR', RefObject<Group | null>> }) {
  return (
    <group ref={refs.body}>
      {/* legs */}
      {([['legL', 0.16], ['legR', -0.16]] as const).map(([k, x]) => (
        <group key={k} ref={refs[k]} position={[x, 0.82, 0]}>
          <Box s={[0.24, 0.72, 0.26]} p={[0, -0.36, 0]} c={C.pants} />
          <Box s={[0.26, 0.12, 0.4]} p={[0, -0.76, 0.06]} c={C.shoe} />
        </group>
      ))}
      {/* half-zip sweater */}
      <Box s={[0.66, 0.66, 0.38]} p={[0, 1.13, 0]} c={C.sweater} />
      <Box s={[0.66, 0.07, 0.38]} p={[0, 0.82, 0]} c={C.sweaterDark} />
      <Box s={[0.34, 0.1, 0.32]} p={[0, 1.5, 0]} c={C.sweaterDark} />
      <Box s={[0.03, 0.3, 0.02]} p={[0, 1.31, 0.195]} c={C.dark} />
      {/* arms */}
      {([['armL', 0.43], ['armR', -0.43]] as const).map(([k, x]) => (
        <group key={k} ref={refs[k]} position={[x, 1.4, 0]}>
          <Box s={[0.2, 0.58, 0.22]} p={[0, -0.26, 0]} c={C.sweater} />
          <Box s={[0.17, 0.15, 0.19]} p={[0, -0.63, 0]} c={C.skin} />
          {k === 'armL' && <Box s={[0.21, 0.07, 0.23]} p={[0, -0.535, 0]} c={C.dark} />}
        </group>
      ))}
      {/* head */}
      <Box s={[0.14, 0.1, 0.14]} p={[0, 1.52, 0]} c={C.skin} />
      <group position={[0, 1.76, 0]}>
        <Box s={[0.46, 0.46, 0.44]} p={[0, 0, 0]} c={C.skin} />
        <Box s={[0.06, 0.12, 0.1]} p={[0.25, 0, 0]} c={C.skin} />
        <Box s={[0.06, 0.12, 0.1]} p={[-0.25, 0, 0]} c={C.skin} />
        {/* short hair with faded sides */}
        <Box s={[0.48, 0.13, 0.47]} p={[0, 0.26, -0.005]} c={C.hair} />
        <Box s={[0.48, 0.2, 0.2]} p={[0, 0.11, -0.14]} c={C.hair} />
        {/* brows, eyes, smile */}
        <Box s={[0.1, 0.025, 0.02]} p={[0.1, 0.1, 0.225]} c={C.hair} />
        <Box s={[0.1, 0.025, 0.02]} p={[-0.1, 0.1, 0.225]} c={C.hair} />
        <Box s={[0.05, 0.05, 0.02]} p={[0.1, 0.045, 0.225]} c={C.dark} />
        <Box s={[0.05, 0.05, 0.02]} p={[-0.1, 0.045, 0.225]} c={C.dark} />
        <Box s={[0.06, 0.06, 0.04]} p={[0, -0.02, 0.235]} c={C.skin} />
        <Box s={[0.14, 0.03, 0.02]} p={[0, -0.115, 0.225]} c="#ffffff" />
        {/* moustache and goatee */}
        <Box s={[0.2, 0.03, 0.025]} p={[0, -0.08, 0.228]} c={C.hair} />
        <Box s={[0.26, 0.09, 0.04]} p={[0, -0.2, 0.215]} c={C.hair} />
        <Box s={[0.48, 0.05, 0.3]} p={[0, -0.215, 0.08]} c={C.hair} />
      </group>
    </group>
  )
}

function Pickup({ i, taken }: { i: number; taken: boolean }) {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }, dt) => {
    const m = ref.current
    if (!m) return
    m.rotation.y += dt * 1.6
    m.position.y = PICKUPS[i][1] + Math.sin(clock.elapsedTime * 2 + i) * 0.08
    m.scale.setScalar(damp(m.scale.x, taken ? 0 : 1, 10, dt))
  })
  return (
    <mesh ref={ref} position={PICKUPS[i]}>
      <octahedronGeometry args={[0.26]} />
      <meshStandardMaterial color={PICKUP_COLORS[i]} emissive={PICKUP_COLORS[i]} emissiveIntensity={0.9} flatShading />
    </mesh>
  )
}

export default function Scene({
  input,
  collected,
  debugEl,
}: {
  input: RefObject<Input>
  collected: boolean[]
  debugEl: RefObject<HTMLPreElement | null>
}) {
  const root = useRef<Group>(null)
  const shadow = useRef<Mesh>(null)
  const refs = {
    body: useRef<Group>(null),
    armL: useRef<Group>(null),
    armR: useRef<Group>(null),
    legL: useRef<Group>(null),
    legR: useRef<Group>(null),
  }
  const sim = useRef({ vx: 0, vz: 0, vy: 0, heading: 0, phase: 0, squash: 0, state: 'IDLE' as PlayerState, acc: 0, frames: 0 })

  useFrame(({ camera, clock, gl }, rawDt) => {
    const g = root.current
    const { body, armL, armR, legL, legR } = { body: refs.body.current, armL: refs.armL.current, armR: refs.armR.current, legL: refs.legL.current, legR: refs.legR.current }
    if (!g || !body || !armL || !armR || !legL || !legR) return
    const dt = Math.min(rawDt, 0.05)
    const s = sim.current
    const inp = input.current
    const t = clock.elapsedTime

    // --- movement ---
    let ix = inp.x
    let iz = inp.z
    const len = Math.hypot(ix, iz)
    if (len > 1) {
      ix /= len
      iz /= len
    }
    s.vx = damp(s.vx, ix * SPEED, ACCEL, dt)
    s.vz = damp(s.vz, iz * SPEED, ACCEL, dt)
    const wasAir = g.position.y > 0
    if (!wasAir && inp.jump) s.vy = JUMP
    s.vy -= GRAVITY * dt
    g.position.x += s.vx * dt
    g.position.z += s.vz * dt
    g.position.y += s.vy * dt
    if (g.position.y <= 0) {
      if (wasAir) s.squash = 1
      g.position.y = 0
      s.vy = 0
    }
    const r = Math.hypot(g.position.x, g.position.z)
    if (r > ARENA) {
      g.position.x *= ARENA / r
      g.position.z *= ARENA / r
    }
    const speed = Math.hypot(s.vx, s.vz)
    if (speed > 0.3) s.heading = Math.atan2(s.vx, s.vz)
    const turn = Math.atan2(Math.sin(s.heading - g.rotation.y), Math.cos(s.heading - g.rotation.y))
    g.rotation.y += turn * Math.min(1, dt * 12)

    // --- state machine ---
    const air = g.position.y > 0
    s.state = air ? (s.vy > 0 ? 'JUMP' : 'FALL') : speed > 0.4 ? 'RUN' : 'IDLE'

    // --- procedural animation ---
    const run = Math.min(speed / SPEED, 1)
    s.phase += dt * speed * 3.4
    const swing = Math.sin(s.phase) * 0.95 * run
    const waving = !inp.active && t % 6 < 2.2 // greet until the visitor takes control
    let aLx = -swing
    let aRx = swing
    let aLz = 0.06
    let aRz = -0.06
    let lLx = swing
    let lRx = -swing
    if (air) {
      aLz = 2.5
      aRz = -2.5
      aLx = aRx = 0
      lLx = 0.55
      lRx = -0.35
    } else if (waving) {
      aRz = -2.55 + Math.sin(t * 9) * 0.3
    }
    const k = 18
    armL.rotation.x = damp(armL.rotation.x, aLx, k, dt)
    armR.rotation.x = damp(armR.rotation.x, aRx, k, dt)
    armL.rotation.z = damp(armL.rotation.z, aLz, k, dt)
    armR.rotation.z = damp(armR.rotation.z, aRz, k, dt)
    legL.rotation.x = damp(legL.rotation.x, lLx, k, dt)
    legR.rotation.x = damp(legR.rotation.x, lRx, k, dt)
    s.squash = damp(s.squash, 0, 9, dt)
    body.scale.y = 1 - s.squash * 0.16 + Math.sin(t * 2.2) * 0.008
    body.position.y = Math.abs(Math.sin(s.phase)) * 0.06 * run
    body.rotation.x = run * 0.12

    if (shadow.current) {
      shadow.current.position.set(g.position.x, 0.012, g.position.z)
      shadow.current.scale.setScalar(Math.max(0.35, 1 - g.position.y * 0.3))
    }

    // --- collectibles ---
    PICKUPS.forEach(([px, py, pz], i) => {
      const dy = Math.max(0, py - (g.position.y + HEIGHT), g.position.y - py)
      if (Math.hypot(px - g.position.x, dy, pz - g.position.z) < 0.6) game.collect(i)
    })

    // --- follow camera ---
    const cx = damp(camera.position.x, g.position.x * 0.85, 4, dt)
    const cz = damp(camera.position.z - CAM_Z, g.position.z * 0.85, 4, dt)
    camera.position.set(cx, CAM_Y, cz + CAM_Z)
    camera.lookAt(cx, 1.25, cz)

    // --- debug read-out (a few times per second, straight to the DOM) ---
    s.acc += rawDt
    s.frames++
    if (s.acc >= 0.25) {
      if (debugEl.current) {
        const { calls, triangles } = gl.info.render
        debugEl.current.textContent =
          `state      ${s.state}\n` +
          `fps        ${Math.round(s.frames / s.acc)}\n` +
          `draw calls ${calls}\n` +
          `triangles  ${triangles}\n` +
          `position   ${g.position.x.toFixed(1)}, ${g.position.y.toFixed(1)}, ${g.position.z.toFixed(1)}\n` +
          `speed      ${speed.toFixed(1)} m/s`
      }
      s.acc = 0
      s.frames = 0
    }
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 5]} intensity={2} />
      <directionalLight position={[-5, 3, -4]} intensity={1.3} color="#a78bfa" />

      {/* arena */}
      <mesh rotation-x={-Math.PI / 2}>
        <circleGeometry args={[ARENA + 0.6, 48]} />
        <meshStandardMaterial color="#14141f" roughness={1} />
      </mesh>
      {[1.4, 2.8, ARENA + 0.55].map((rad, i) => (
        <mesh key={rad} rotation-x={-Math.PI / 2} position-y={0.006}>
          <ringGeometry args={[rad - 0.02, rad + 0.02, 64]} />
          <meshBasicMaterial color={i === 2 ? '#a78bfa' : '#2a2a40'} />
        </mesh>
      ))}

      <mesh ref={shadow} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.42, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>

      <group ref={root}>
        <Character refs={refs} />
      </group>

      {PICKUPS.map((_, i) => (
        <Pickup key={i} i={i} taken={collected[i]} />
      ))}
    </>
  )
}
