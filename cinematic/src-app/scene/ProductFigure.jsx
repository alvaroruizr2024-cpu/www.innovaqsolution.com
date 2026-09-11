import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { hologramFragment, hologramVertex } from '../shaders.js'
import { productMedia } from '../media.js'
import { LoopScreen, StillBillboard } from './MediaLayers.jsx'

function useHolo(color, accent) {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uAccent: { value: new THREE.Color(accent) },
          uTime: { value: 0 },
          uBoost: { value: 0 },
        },
        vertexShader: hologramVertex,
        fragmentShader: hologramFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [color, accent],
  )
}

function Metal({ color, roughness = 0.16, metalness = 0.88, emissiveIntensity = 0.28, physical = true, children, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      {children}
      {physical ? (
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          clearcoat={0.72}
          clearcoatRoughness={0.18}
          envMapIntensity={1.55}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      )}
    </mesh>
  )
}

function Gear({ radius = 0.38, teeth = 10, color, speed = 1, lite }) {
  const ref = useRef()
  const tooth = useMemo(() => new THREE.BoxGeometry(0.12, 0.08, 0.16), [])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * speed
  })
  const n = lite ? Math.min(teeth, 7) : teeth
  return (
    <group ref={ref}>
      <Metal color={color}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, 0.12, lite ? 12 : 28]} />
      </Metal>
      <Metal color={color}>
        <torusGeometry args={[radius, 0.05, lite ? 6 : 12, lite ? 16 : 32]} />
      </Metal>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} rotation={[0, -a, 0]} geometry={tooth} castShadow>
            <meshPhysicalMaterial color={color} metalness={0.92} roughness={0.14} emissive={color} emissiveIntensity={0.2} clearcoat={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

function ProductMesh({ product, lite }) {
  const { shape, color, accent } = product
  const hi = lite ? 12 : 32
  switch (shape) {
    case 'shield':
      return (
        <group>
          <Metal color={color} scale={[1, 1.22, 0.38]}>
            <octahedronGeometry args={[0.58, 0]} />
          </Metal>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.46, 0.02, 8, hi]} />
            <meshPhysicalMaterial color="#f4f1ea" metalness={0.75} roughness={0.16} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.014, 8, hi]} />
            <meshPhysicalMaterial color={accent} metalness={0.4} roughness={0.2} emissive={color} emissiveIntensity={0.55} />
          </mesh>
          <Metal color={accent} position={[0, 0.02, 0.12]} scale={0.35}>
            <octahedronGeometry args={[0.22, 0]} />
          </Metal>
        </group>
      )
    case 'stack':
      return (
        <group>
          {[
            [0.7, 0.14, -0.34],
            [0.56, 0.14, -0.12],
            [0.42, 0.14, 0.1],
            [0.28, 0.14, 0.32],
          ].map(([w, h, y], i) => (
            <Metal key={i} color={i % 2 ? accent : color} position={[0, y, 0]}>
              <boxGeometry args={[w * 1.35, h, w * 0.85]} />
            </Metal>
          ))}
          <mesh position={[0.02, 0.08, 0.44]} rotation={[-0.4, 0.2, 0]}>
            <planeGeometry args={[0.38, 0.24]} />
            <meshStandardMaterial color="#0b1a22" emissive={color} emissiveIntensity={0.35} />
          </mesh>
        </group>
      )
    case 'gears':
      return (
        <group>
          <group position={[-0.22, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <Gear radius={0.38} teeth={10} color={color} speed={0.6} lite={lite} />
          </group>
          <group position={[0.28, -0.1, 0.1]} rotation={[Math.PI / 2, 0.4, 0.2]}>
            <Gear radius={0.24} teeth={8} color={accent} speed={-0.9} lite={lite} />
          </group>
        </group>
      )
    case 'book':
      return (
        <group>
          <Metal color={color} position={[-0.18, 0, 0]} rotation={[0, 0.22, 0.1]}>
            <boxGeometry args={[0.3, 0.46, 0.045]} />
          </Metal>
          <Metal color="#f4f1ea" position={[0.18, 0, 0]} rotation={[0, -0.22, -0.1]}>
            <boxGeometry args={[0.3, 0.46, 0.04]} />
          </Metal>
          <Metal color={accent} position={[0, 0.4, 0]}>
            <icosahedronGeometry args={[0.13, 0]} />
          </Metal>
        </group>
      )
    case 'bars':
      return (
        <group>
          {[0.24, 0.4, 0.58, 0.34].map((h, i) => (
            <Metal key={i} color={i === 2 ? accent : color} position={[(i - 1.5) * 0.2, h / 2 - 0.3, 0]}>
              <boxGeometry args={[0.14, h, 0.14]} />
            </Metal>
          ))}
          <Metal color={accent} position={[0, 0.5, 0]} rotation={[0.4, 0.6, 0.2]}>
            <octahedronGeometry args={[0.16, 0]} />
          </Metal>
        </group>
      )
    case 'plant':
      return (
        <group>
          <Metal color="#5a4030" position={[0, -0.3, 0]} physical={false}>
            <cylinderGeometry args={[0.04, 0.055, 0.48, 8]} />
          </Metal>
          <Metal color={color} position={[0, 0.12, 0]}>
            <icosahedronGeometry args={[0.3, lite ? 0 : 1]} />
          </Metal>
          <Metal color={accent} position={[0.22, 0.02, 0.08]} scale={0.55}>
            <icosahedronGeometry args={[0.24, 0]} />
          </Metal>
          <Metal color={color} position={[-0.18, -0.04, 0.1]} scale={0.42}>
            <sphereGeometry args={[0.2, 12, 12]} />
          </Metal>
        </group>
      )
    case 'plate':
      return (
        <group>
          <Metal color={color} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.06, 12, hi]} />
          </Metal>
          <Metal color="#f4f1ea" position={[0, 0.025, 0]} rotation={[Math.PI / 2, 0, 0]} metalness={0.25} roughness={0.32}>
            <circleGeometry args={[0.36, hi]} />
          </Metal>
          <Metal color={accent} position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </Metal>
        </group>
      )
    case 'tower':
      return (
        <group>
          <Metal color={color} position={[0, 0.12, 0]}>
            <boxGeometry args={[0.44, 0.9, 0.34]} />
          </Metal>
          <Metal color="#07141c" position={[0, 0.6, 0]}>
            <boxGeometry args={[0.52, 0.08, 0.4]} />
          </Metal>
          {[-0.12, 0.08, 0.28].map((y) =>
            [-0.1, 0.1].map((x) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.175]}>
                <planeGeometry args={[0.1, 0.11]} />
                <meshStandardMaterial color="#f4f1ea" emissive="#f4d9a0" emissiveIntensity={0.7} toneMapped={false} />
              </mesh>
            )),
          )}
        </group>
      )
    case 'cross':
      return (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.032, 10, hi]} />
            <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.16} emissive={color} emissiveIntensity={0.32} />
          </mesh>
          <Metal color={color}>
            <boxGeometry args={[0.18, 0.66, 0.15]} />
          </Metal>
          <Metal color={accent}>
            <boxGeometry args={[0.54, 0.18, 0.15]} />
          </Metal>
        </group>
      )
    case 'city':
      return (
        <group>
          <Metal color={color} position={[0, -0.34, 0]} metalness={0.45} roughness={0.4}>
            <boxGeometry args={[0.78, 0.05, 0.78]} />
          </Metal>
          {[
            [-0.2, 0.26, -0.18],
            [0.18, 0.4, -0.12],
            [-0.14, 0.16, 0.2],
            [0.22, 0.22, 0.18],
            [0.02, 0.32, 0.02],
          ].map(([x, h, z], i) => (
            <Metal key={i} color={i === 1 ? accent : color} position={[x, h / 2 - 0.3, z]}>
              <boxGeometry args={[0.18, h, 0.18]} />
            </Metal>
          ))}
        </group>
      )
    case 'mic':
      return (
        <group>
          <Metal color={color} position={[0, 0.32, 0]}>
            <capsuleGeometry args={[0.12, 0.22, 8, lite ? 10 : 18]} />
          </Metal>
          <Metal color="#d6d3cd" position={[0, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.46, 10]} />
          </Metal>
          <Metal color={accent} position={[0, -0.3, 0]}>
            <coneGeometry args={[0.22, 0.14, 16]} />
          </Metal>
        </group>
      )
    default:
      return (
        <Metal color={color}>
          <icosahedronGeometry args={[0.42, 0]} />
        </Metal>
      )
  }
}

export function ProductFigure({ product, index, total, selected, hovered, onHover, onSelect, paused, quality, reducedMotion }) {
  const group = useRef()
  const holo = useHolo(product.color, product.accent)
  const angle = (index / total) * Math.PI * 2
  const radius = 6.15
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const lite = quality === 'performance'
  const media = productMedia(product.code)
  const hot = selected || hovered

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    holo.uniforms.uTime.value = t
    holo.uniforms.uBoost.value = THREE.MathUtils.damp(holo.uniforms.uBoost.value, hot ? 1 : 0, 6, delta)
    if (!reducedMotion) group.current.rotation.y += delta * (paused ? 0.1 : 0.48)
    const lift = selected ? 0.34 : hovered ? 0.18 : 0
    const bob = reducedMotion ? 0 : Math.sin(t * 1.05 + index) * 0.04
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.98 + lift + bob, 4, delta)
    const s = selected ? 1.16 : hovered ? 1.08 : 1
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 6, delta))
  })

  return (
    <group position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
      <mesh receiveShadow position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, lite ? 24 : 48]} />
        <meshStandardMaterial color="#141820" metalness={0.82} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.66, 0.74, 0.18, lite ? 16 : 36]} />
        <meshStandardMaterial color="#0c1018" metalness={0.86} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 0.62, lite ? 24 : 48]} />
        <meshStandardMaterial
          color={product.color}
          emissive={product.color}
          emissiveIntensity={hot ? 1.45 : 0.38}
          transparent
          opacity={0.95}
        />
      </mesh>
      <pointLight color={product.color} intensity={selected ? 4.2 : hovered ? 2.6 : 0.9} distance={3.8} position={[0, 1.15, 0]} />
      <group
        ref={group}
        position={[0, 0.98, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(product.code)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(product.code)
        }}
      >
        <ProductMesh product={product} lite={lite} />
        {!media.still && (
          <mesh scale={1.22}>
            <sphereGeometry args={[0.6, lite ? 16 : 28, lite ? 16 : 28]} />
            <primitive object={holo} attach="material" />
          </mesh>
        )}
        {media.still && <StillBillboard url={media.still} />}
        {media.loop && !lite && <LoopScreen url={media.loop} />}
        {hot && (
          <Html position={[0, 1.55, 0]} center distanceFactor={10} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
            <div className="world-label" style={{ '--c': product.color }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {product.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}
