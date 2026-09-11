import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { PRODUCTS } from '../content.js'
import { ProductFigure } from './ProductFigure.jsx'
import { CameraRig } from './CameraRig.jsx'
import { Studio } from './Studio.jsx'

function Ring({ selected, hovered, onHover, onSelect, paused, ringRef, quality, reducedMotion }) {
  useFrame((_, delta) => {
    if (!ringRef.current || reducedMotion) return
    ringRef.current.rotation.y += delta * (paused ? 0.01 : 0.075)
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
          paused={paused || reducedMotion}
          quality={quality}
          reducedMotion={reducedMotion}
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
        <Bloom intensity={0.48} luminanceThreshold={0.32} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField
        focusDistance={framed ? 0.011 : 0.017}
        focalLength={framed ? 0.013 : 0.018}
        bokehScale={framed ? 3.4 : introDone ? 2.2 : 3.0}
        height={780}
      />
      <Bloom intensity={framed ? 1.05 : 0.82} luminanceThreshold={0.2} luminanceSmoothing={0.32} mipmapBlur />
      <ChromaticAberration offset={[0.00045, 0.0003]} radialModulation modulationOffset={0.38} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.14} />
      <Vignette offset={0.16} darkness={0.8} />
    </EffectComposer>
  )
}

export function ShowroomCanvas({ selected, hovered, onHover, onSelect, introDone, setIntroDone, quality, reducedMotion }) {
  const ringRef = useRef()
  const paused = Boolean(selected || hovered)
  const reduced = quality === 'performance'
  const dpr = useMemo(() => (reduced ? [1, 1.2] : [1, 2]), [reduced])

  return (
    <Canvas
      shadows={!reduced}
      dpr={dpr}
      camera={{ position: [14.2, 7.8, 0.2], fov: 39, near: 0.1, far: 70 }}
      gl={{
        antialias: !reduced,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMappingExposure = 1.06
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <AdaptiveDpr pixelated={false} />
      <Suspense fallback={null}>
        <Studio reduced={reduced || reducedMotion} />
        <Ring
          selected={selected}
          hovered={hovered}
          onHover={onHover}
          onSelect={onSelect}
          paused={paused}
          ringRef={ringRef}
          quality={quality}
          reducedMotion={reducedMotion}
        />
        <CameraRig
          introDone={introDone}
          setIntroDone={setIntroDone}
          selected={selected}
          hovered={hovered}
          ringRef={ringRef}
          reduced={reduced || reducedMotion}
        />
        <Effects quality={quality} introDone={introDone} framed={Boolean(selected || hovered)} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
