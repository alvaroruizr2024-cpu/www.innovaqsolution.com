import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Environment, Lightformer, Preload, SoftShadows } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  DepthOfField,
  HueSaturation,
  N8AO,
  Noise,
  SMAA,
  ToneMapping,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { BRAND, PRODUCTS } from '../content.js'
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

/**
 * Iluminación basada en imagen (IBL) sin descargar ningún HDRI: un set de estudio
 * construido con Lightformers y renderizado una sola vez a un cubemap. Es lo que
 * da reflejos reales en los metales, el clearcoat, las pantallas y el piso.
 */
function StudioEnvironment({ reduced }) {
  return (
    <Environment resolution={reduced ? 128 : 512} frames={1} background={false}>
      <color attach="background" args={['#05070c']} />
      {/* Softbox cenital: luz principal, grande y suave */}
      <Lightformer form="ring" intensity={4} color="#e6eef7" position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[9, 9, 1]} />
      {/* Contraluz cálido (naranja de marca) */}
      <Lightformer form="rect" intensity={2.8} color={BRAND.orange} position={[8.5, 3, 2.5]} rotation-y={-Math.PI / 2} scale={[6.5, 2.4, 1]} />
      {/* Contraluz frío (azul de marca) */}
      <Lightformer form="rect" intensity={3} color="#2B9BCB" position={[-8.5, 3.6, -2]} rotation-y={Math.PI / 2} scale={[6.5, 2.8, 1]} />
      {/* Kicker verde al fondo */}
      <Lightformer form="rect" intensity={1.1} color={BRAND.green} position={[0, 2.6, -9]} scale={[5, 1.5, 1]} />
      {/* Tira frontal baja: reflejo horizontal en pantallas y piso (look de estudio de cine) */}
      <Lightformer form="rect" intensity={0.8} color="#a9bfd4" position={[0, 1.1, 9.5]} rotation-y={Math.PI} scale={[11, 0.9, 1]} />
      <Lightformer form="circle" intensity={0.5} color="#ffffff" position={[3, 5.5, 6]} scale={2.5} />
    </Environment>
  )
}

function Effects({ quality, introDone, framed, focusRef }) {
  const ultra = quality === 'ultra'
  if (!ultra) {
    return (
      <EffectComposer disableNormalPass multisampling={0}>
        <SMAA />
        <Bloom intensity={0.5} luminanceThreshold={0.34} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <SMAA />
      {/* Oclusión ambiental de contacto (n8ao): asienta pedestales, biseles y engranajes */}
      <N8AO aoRadius={1.1} intensity={1.6} distanceFalloff={0.9} quality="medium" halfRes />
      {/* Rack focus real: el foco sigue al producto encuadrado (o al centro del anillo) */}
      <DepthOfField
        target={focusRef.current}
        worldFocusRange={framed ? 2.4 : 7.5}
        bokehScale={framed ? 3.6 : introDone ? 2.0 : 3.0}
        height={800}
      />
      <Bloom intensity={framed ? 1.0 : 0.78} luminanceThreshold={0.22} luminanceSmoothing={0.3} mipmapBlur radius={0.7} />
      {/* Grading: un punto de contraste y saturación contenida, look de cámara de cine */}
      <BrightnessContrast brightness={-0.015} contrast={0.11} />
      <HueSaturation saturation={-0.06} />
      <ChromaticAberration offset={[0.00042, 0.00028]} radialModulation modulationOffset={0.4} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.13} />
      <Vignette offset={0.18} darkness={0.82} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}

export function ShowroomCanvas({ selected, hovered, onHover, onSelect, introDone, setIntroDone, quality, reducedMotion, onReady }) {
  const ringRef = useRef()
  const focusRef = useRef(new THREE.Vector3(0, 0.92, 0))
  const paused = Boolean(selected || hovered)
  const reduced = quality === 'performance'
  const dpr = useMemo(() => (reduced ? [1, 1.2] : [1, 2]), [reduced])

  return (
    <Canvas
      shadows={reduced ? false : { type: THREE.PCFSoftShadowMap }}
      dpr={dpr}
      camera={{ position: [14.2, 7.8, 0.2], fov: 39, near: 0.1, far: 90 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        // El tone mapping vive al final de la cadena de post-proceso (ToneMapping effect):
        // así bloom y DoF trabajan en HDR lineal y no sobre valores ya comprimidos.
        gl.toneMapping = THREE.NoToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMappingExposure = 1.0
        gl.shadowMap.autoUpdate = true
        onReady?.()
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <AdaptiveDpr pixelated={false} />
      {!reduced && !reducedMotion && <SoftShadows size={22} samples={14} focus={0.55} />}
      <Suspense fallback={null}>
        <StudioEnvironment reduced={reduced} />
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
          focusRef={focusRef}
          reduced={reduced || reducedMotion}
        />
        <Effects quality={quality} introDone={introDone} framed={Boolean(selected || hovered)} focusRef={focusRef} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
