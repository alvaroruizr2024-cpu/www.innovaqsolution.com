import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { PRODUCTS } from '../content.js'
import { ProductFigure } from './ProductFigure.jsx'
import { CameraRig } from './CameraRig.jsx'
import { Studio } from './Studio.jsx'

function Ring({ selected, hovered, onHover, onSelect, paused, ringRef, quality }) {
  useFrame((_, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.y += delta * (paused ? 0.012 : 0.08)
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
          quality={quality}
        />
      ))}
    </group>
  )
}

function Effects({ quality, introDone, framed }) {
  const ultra = quality === 'ultra'
  if (!ultra) {
    return (
      <EffectComposer disableNormalPass>
        <Bloom intensity={0.5} luminanceThreshold={0.3} mipmapBlur />
        <Vignette offset={0.28} darkness={0.72} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField
        focusDistance={framed ? 0.012 : 0.018}
        focalLength={framed ? 0.014 : 0.02}
        bokehScale={framed ? 3.6 : introDone ? 2.4 : 3.2}
        height={720}
      />
      <Bloom intensity={framed ? 1.15 : 0.9} luminanceThreshold={0.18} luminanceSmoothing={0.28} mipmapBlur />
      <ChromaticAberration offset={[0.00055, 0.00035]} radialModulation modulationOffset={0.42} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.18} />
      <Vignette offset={0.18} darkness={0.84} />
    </EffectComposer>
  )
}

export function ShowroomCanvas({ selected, hovered, onHover, onSelect, introDone, setIntroDone, quality }) {
  const ringRef = useRef()
  const paused = Boolean(selected || hovered)
  const reduced = quality === 'performance'
  const dpr = useMemo(() => (reduced ? [1, 1.15] : [1, 2]), [reduced])

  return (
    <Canvas
      shadows={!reduced}
      dpr={dpr}
      camera={{ position: [14.2, 7.8, 0.2], fov: 40, near: 0.1, far: 70 }}
      gl={{
        antialias: !reduced,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.12
        gl.outputColorSpace = gl.outputColorSpace
      }}
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
          quality={quality}
        />
        <CameraRig
          introDone={introDone}
          setIntroDone={setIntroDone}
          selected={selected}
          hovered={hovered}
          ringRef={ringRef}
          reduced={reduced}
        />
        <Effects quality={quality} introDone={introDone} framed={Boolean(selected || hovered)} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
