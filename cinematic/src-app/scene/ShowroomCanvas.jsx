import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { PRODUCTS } from '../content.js'
import { ProductFigure } from './ProductFigure.jsx'
import { CameraRig } from './CameraRig.jsx'
import { Studio } from './Studio.jsx'

function Ring({ selected, hovered, onHover, onSelect, paused, ringRef }) {
  useFrame((_, delta) => {
    if (!ringRef.current) return
    const speed = paused ? 0.015 : 0.085
    ringRef.current.rotation.y += delta * speed
  })

  return (
    <group ref={ringRef}>
      {PRODUCTS.map((product, index) => (
        <ProductFigure
          key={product.code}
          product={product}
          index={index}
          total={PRODUCTS.length}
          selected={selected === product.code}
          hovered={hovered === product.code}
          onHover={onHover}
          onSelect={onSelect}
          paused={paused}
        />
      ))}
    </group>
  )
}

function Effects({ reduced, introDone }) {
  if (reduced) {
    return (
      <EffectComposer disableNormalPass>
        <Bloom intensity={0.55} luminanceThreshold={0.28} mipmapBlur />
        <Vignette offset={0.25} darkness={0.75} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField focusDistance={0.018} focalLength={0.018} bokehScale={introDone ? 2.6 : 3.4} height={480} />
      <Bloom intensity={0.85} luminanceThreshold={0.22} luminanceSmoothing={0.3} mipmapBlur />
      <ChromaticAberration offset={[0.0006, 0.0004]} radialModulation modulationOffset={0.4} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.22} />
      <Vignette offset={0.2} darkness={0.82} />
    </EffectComposer>
  )
}

export function ShowroomCanvas({ selected, hovered, onHover, onSelect, introDone, setIntroDone, reduced }) {
  const ringRef = useRef()
  const paused = Boolean(selected || hovered)
  const dpr = useMemo(() => (reduced ? [1, 1.25] : [1, 1.75]), [reduced])

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [13.8, 7.6, 0.2], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      onPointerMissed={() => onSelect(null)}
    >
      <Suspense fallback={null}>
        <Studio reduced={reduced} />
        <Ring
          selected={selected}
          hovered={hovered}
          onHover={onHover}
          onSelect={onSelect}
          paused={paused}
          ringRef={ringRef}
        />
        <CameraRig introDone={introDone} setIntroDone={setIntroDone} selected={selected} ringRef={ringRef} reduced={reduced} />
        <Effects reduced={reduced} introDone={introDone} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
