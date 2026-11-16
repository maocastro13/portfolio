import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { AnimationMixer, LoopOnce, LoopRepeat, MathUtils, type Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const MODEL = `${import.meta.env.BASE_URL}models/avatar.glb`
const IDLE = 'saludo'
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Avatar({ anim, onDone }: { anim: string; onDone: () => void }) {
  const group = useRef<Group>(null)
  const { scene, animations } = useLoader(GLTFLoader, MODEL, (l) => l.setMeshoptDecoder(MeshoptDecoder))
  const mixer = useMemo(() => new AnimationMixer(scene), [scene])

  useEffect(() => {
    const clip = animations.find((c) => c.name === anim)
    if (!clip) return
    const action = mixer.clipAction(clip)
    const once = anim !== IDLE
    action.reset().setLoop(once ? LoopOnce : LoopRepeat, Infinity)
    action.clampWhenFinished = once
    action.fadeIn(0.3).play()
    if (reducedMotion() && !once) action.paused = true
    const finished = () => once && onDone()
    mixer.addEventListener('finished', finished)
    return () => {
      mixer.removeEventListener('finished', finished)
      action.fadeOut(0.3)
    }
  }, [anim, animations, mixer, onDone])

  // Subtle turn towards the pointer.
  useFrame(({ pointer }, delta) => {
    mixer.update(delta)
    if (!group.current || reducedMotion()) return
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45, 0.06)
  })

  return (
    <group ref={group} position={[0, -1.12, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function AvatarCanvas({ anim, onDone }: { anim: string; onDone: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // Stop rendering when the hero is off screen.
  useEffect(() => {
    if (!wrap.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.6], fov: 26 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 5]} intensity={1.7} />
        <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#a78bfa" />
        <Suspense fallback={null}>
          <Avatar anim={anim} onDone={onDone} />
        </Suspense>
      </Canvas>
    </div>
  )
}
