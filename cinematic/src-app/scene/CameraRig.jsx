import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { PRODUCTS } from '../content.js'

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const RING_RADIUS = 6.15
const FOV_WIDE = 39
const FOV_FRAMED = 33

/**
 * Cámara de "steadicam": órbita de apertura de 360°, luego órbita lenta con una
 * respiración casi imperceptible (fov y altura del foco), y al seleccionar un producto
 * un dolly-in con cierre de óptica (39° → 33°) y rack focus real vía focusRef.
 */
export function CameraRig({ introDone, setIntroDone, selected, hovered, ringRef, focusRef, reduced }) {
  const controls = useRef()
  const progress = useRef(reduced ? 1 : 0)
  const { camera } = useThree()
  const desired = useRef(new THREE.Vector3(8.6, 3.5, 8.6))
  const framed = selected || hovered

  useEffect(() => {
    if (reduced) {
      progress.current = 1
      setIntroDone(true)
    }
  }, [reduced, setIntroDone])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const focus = focusRef.current

    if (!introDone) {
      progress.current = Math.min(1, progress.current + delta / 6.4)
      const p = easeInOut(progress.current)
      const angle = p * Math.PI * 2
      const dist = THREE.MathUtils.lerp(14.2, 10.6, p)
      const height = THREE.MathUtils.lerp(7.8, 3.45, p)
      camera.position.set(Math.cos(angle) * dist, height, Math.sin(angle) * dist)
      camera.lookAt(0, 0.92, 0)
      focus.set(0, 0.92, 0)
      if (progress.current >= 1) setIntroDone(true)
      return
    }

    if (framed) {
      const index = PRODUCTS.findIndex((p) => p.code === framed)
      const localAngle = (index / PRODUCTS.length) * Math.PI * 2
      const ringY = ringRef.current?.rotation.y || 0
      // el grupo del anillo gira +ringY sobre Y, lo que mueve un punto de ángulo θ a θ − ringY
      const a = localAngle - ringY
      const px = Math.cos(a) * RING_RADIUS
      const pz = Math.sin(a) * RING_RADIUS
      // Cada figura mira en tangente al anillo (rotación -a+π): su pantalla apunta hacia
      // (sin a, 0, -cos a). La cámara se coloca sobre ese eje, un poco por fuera del anillo
      // y elevada: la figura queda delante de su pantalla, en tres cuartos, y con 33° de fov
      // ocupa ~un tercio del encuadre sin cortar el bisel.
      const fx = Math.sin(a)
      const fz = -Math.cos(a)
      const ox = Math.cos(a)
      const oz = Math.sin(a)
      // más lejos y desplazada hacia fuera: la figura no tapa su pantalla (queda en 3/4)
      // 45° fuera del eje de la pantalla y más alta: la figura queda a un lado y la
      // pantalla se ve completa detrás, en escorzo
      // (la pantalla del producto sube ~1 m al encuadrar, ver ProductFigure)
      const along = selected ? 5.0 : 5.6
      const out = selected ? 3.6 : 4.0
      const height = selected ? 2.6 : 2.8
      focus.set(px - fx * 0.3, selected ? 1.75 : 1.6, pz - fz * 0.3)
      desired.current.set(px + fx * along + ox * out, height, pz + fz * along + oz * out)
    } else {
      // respiración: el foco sube y baja 4 cm, como una steadicam en reposo
      const bob = reduced ? 0 : Math.sin(t * 0.45) * 0.04
      focus.set(0, 0.92 + bob, 0)
    }

    // cierre de óptica al encuadrar + respiración de fov (±0.3°)
    const breathe = reduced ? 0 : Math.sin(t * 0.7) * 0.3
    const targetFov = (framed ? FOV_FRAMED : FOV_WIDE) + breathe
    const nextFov = THREE.MathUtils.damp(camera.fov, targetFov, 3, delta)
    if (Math.abs(nextFov - camera.fov) > 0.001) {
      camera.fov = nextFov
      camera.updateProjectionMatrix()
    }

    if (controls.current) {
      controls.current.target.lerp(focus, 1 - Math.pow(0.0006, delta))
      if (framed) camera.position.lerp(desired.current, 1 - Math.pow(0.01, delta))
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enabled={introDone}
      enablePan={false}
      enableDamping
      dampingFactor={0.055}
      minDistance={4}
      maxDistance={16}
      maxPolarAngle={Math.PI / 2.08}
      minPolarAngle={0.3}
      target={[0, 0.92, 0]}
      autoRotate={introDone && !framed}
      autoRotateSpeed={0.26}
    />
  )
}
