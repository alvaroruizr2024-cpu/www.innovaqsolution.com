import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { PRODUCTS } from '../content.js'

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function CameraRig({ introDone, setIntroDone, selected, ringRef, reduced }) {
  const controls = useRef()
  const progress = useRef(reduced ? 1 : 0)
  const { camera } = useThree()
  const focus = useRef(new THREE.Vector3(0, 0.95, 0))
  const desired = useRef(new THREE.Vector3(8.6, 3.5, 8.6))

  useEffect(() => {
    if (reduced) {
      progress.current = 1
      setIntroDone(true)
    }
  }, [reduced, setIntroDone])

  useFrame((state, delta) => {
    if (!introDone) {
      progress.current = Math.min(1, progress.current + delta / 6.4)
      const t = easeInOut(progress.current)
      const angle = t * Math.PI * 2
      const dist = THREE.MathUtils.lerp(13.8, 10.6, t)
      const height = THREE.MathUtils.lerp(7.6, 3.45, t)
      camera.position.set(Math.cos(angle) * dist, height, Math.sin(angle) * dist)
      camera.lookAt(0, 0.92, 0)
      if (progress.current >= 1) setIntroDone(true)
      return
    }

    if (selected) {
      const index = PRODUCTS.findIndex((p) => p.code === selected)
      const localAngle = (index / PRODUCTS.length) * Math.PI * 2
      const ringY = ringRef.current?.rotation.y || 0
      const a = localAngle + ringY
      const radius = 6.15
      const px = Math.cos(a) * radius
      const pz = Math.sin(a) * radius
      focus.current.set(px, 1.05, pz)
      desired.current.set(px * 0.42 + Math.cos(a) * 4.6, 2.35, pz * 0.42 + Math.sin(a) * 4.6)
    } else {
      focus.current.set(0, 0.92, 0)
    }

    if (controls.current) {
      controls.current.target.lerp(focus.current, 1 - Math.pow(0.0008, delta))
      if (selected) {
        camera.position.lerp(desired.current, 1 - Math.pow(0.012, delta))
      }
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enabled={introDone}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      minDistance={7}
      maxDistance={16}
      maxPolarAngle={Math.PI / 2.08}
      minPolarAngle={0.32}
      target={[0, 0.92, 0]}
      autoRotate={introDone && !selected}
      autoRotateSpeed={0.28}
    />
  )
}
