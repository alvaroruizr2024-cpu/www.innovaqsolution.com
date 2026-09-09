import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { fogFragment, fogVertex } from '../shaders.js'
import { BRAND } from '../content.js'

function VolumetricFog() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColorA: { value: new THREE.Color('#0b1c2c') },
          uColorB: { value: new THREE.Color(BRAND.blue) },
          uTime: { value: 0 },
        },
        vertexShader: fogVertex,
        fragmentShader: fogFragment,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  )
  useFrame((_, d) => {
    mat.uniforms.uTime.value += d
  })
  return (
    <mesh position={[0, 1.4, 0]}>
      <cylinderGeometry args={[12.5, 12.5, 4.2, 40, 1, true]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

function GodRay({ color, position, rotation, scale = [1.1, 6.5, 1.1] }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <coneGeometry args={[1, 1, 24, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={0.045} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function Studio({ reduced }) {
  const disc = useRef()
  useFrame((_, d) => {
    if (disc.current) disc.current.rotation.z += d * 0.015
  })

  return (
    <>
      <color attach="background" args={['#05070c']} />
      <fog attach="fog" args={['#05070c', 10, 28]} />
      <hemisphereLight args={['#9eb6c8', '#08080c', 0.28]} />
      <spotLight
        position={[7, 10, 4]}
        angle={0.42}
        penumbra={0.7}
        intensity={48}
        color={BRAND.orange}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-8, 8, -3]} angle={0.5} penumbra={0.8} intensity={28} color={BRAND.blue} />
      <spotLight position={[0, 9, -8]} angle={0.35} penumbra={0.6} intensity={18} color={BRAND.green} />
      <pointLight position={[0, 2.4, 0]} intensity={6} color="#cdd8e6" distance={10} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[16, 64]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={reduced ? 256 : 1024}
          mixBlur={0.85}
          mixStrength={2.4}
          roughness={0.82}
          depthScale={0.6}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0d12"
          metalness={0.72}
          mirror={0.35}
        />
      </mesh>

      <mesh ref={disc} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[6.85, 7.05, 80]} />
        <meshBasicMaterial color={BRAND.blue} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0]}>
        <ringGeometry args={[5.15, 5.28, 80]} />
        <meshBasicMaterial color={BRAND.orange} transparent opacity={0.22} />
      </mesh>

      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[2.1, 2.3, 0.08, 48]} />
        <meshStandardMaterial color="#10141c" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.16, 32]} />
        <meshStandardMaterial color="#161b24" metalness={0.85} roughness={0.3} />
      </mesh>

      {!reduced && <VolumetricFog />}
      <GodRay color={BRAND.orange} position={[4.2, 4.2, 2.2]} rotation={[0.15, 0, -0.35]} />
      <GodRay color={BRAND.blue} position={[-3.8, 4.4, -1.6]} rotation={[0.1, 0.4, 0.3]} />
      <GodRay color={BRAND.green} position={[0.4, 4.6, -3.4]} rotation={[0.25, 0, 0]} scale={[0.9, 6.2, 0.9]} />

      <Sparkles count={reduced ? 20 : 70} scale={[14, 5, 14]} size={2.2} speed={0.25} color="#d7e4f2" opacity={0.45} />
      <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={20} blur={2.4} far={8} color="#000" />
    </>
  )
}
