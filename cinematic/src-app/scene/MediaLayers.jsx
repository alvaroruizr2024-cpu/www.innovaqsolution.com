import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export function StillBillboard({ url, width = 1.42, height = 0.8, position = [0, 1.62, -0.62] }) {
  const texture = useLoader(THREE.TextureLoader, url)
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
    texture.needsUpdate = true
  }, [texture])

  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive="#ffffff"
        emissiveIntensity={0.62}
        roughness={0.18}
        metalness={0.12}
        toneMapped={false}
      />
    </mesh>
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

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}
