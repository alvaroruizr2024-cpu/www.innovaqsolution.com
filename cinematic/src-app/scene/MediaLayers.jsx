import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Pantalla cinematográfica: el still fotorealista se muestra como panel emisivo
 * dentro de un bisel metálico fino, con una lámina de vidrio delante que recoge los
 * reflejos del set (Lightformers). El bisel proyecta sombra real sobre el pedestal.
 */
export function StillBillboard({ url, width = 1.42, height = 0.8, position = [0, 1.62, -0.62], accent = '#2B9BCB' }) {
  const texture = useLoader(THREE.TextureLoader, url)
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.needsUpdate = true
  }, [texture])

  const bezel = 0.035
  return (
    <group position={position}>
      {/* bisel: metal cepillado que refleja el set; su cara trasera se ve desde el lado cercano del anillo */}
      <mesh position={[0, 0, -0.016]} castShadow receiveShadow>
        <boxGeometry args={[width + bezel * 2, height + bezel * 2, 0.028]} />
        <meshPhysicalMaterial color="#232c38" metalness={0.95} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.25} envMapIntensity={1.6} />
      </mesh>
      {/* barra de luz en la trasera (como el panel trasero de una pantalla de estudio) */}
      <mesh position={[0, -height * 0.34, -0.031]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.72, 0.03]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} />
      </mesh>
      {/* panel emisivo (el still) */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={1.05}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      {/* vidrio: sheen y reflejos del set, sin refracción (barato) */}
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={2.2}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export function LoopScreen({ url, width = 1.05, height = 0.59, position = [0.72, 1.28, 0.12], rotation = [0, -0.35, 0] }) {
  const video = useMemo(() => {
    const el = document.createElement('video')
    el.src = url
    el.crossOrigin = 'anonymous'
    el.loop = true
    el.muted = true
    el.playsInline = true
    el.autoplay = true
    el.preload = 'auto'
    el.play().catch(() => {})
    return el
  }, [url])

  useEffect(() => () => {
    video.pause()
    video.removeAttribute('src')
    video.load()
  }, [video])

  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    return tex
  }, [video])

  const bezel = 0.03
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.014]} castShadow>
        <boxGeometry args={[width + bezel * 2, height + bezel * 2, 0.024]} />
        <meshPhysicalMaterial color="#232c38" metalness={0.95} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.25} envMapIntensity={1.5} />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.05} metalness={0} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={2} depthWrite={false} />
      </mesh>
    </group>
  )
}
