import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { hologramFragment, hologramVertex } from '../shaders.js'

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

function Metal({ color, roughness = 0.22, metalness = 0.85, emissiveIntensity = 0.22, children, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      {children}
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}

function Gear({ radius = 0.38, teeth = 10, color, t }) {
  const tooth = useMemo(() => {
    const g = new THREE.BoxGeometry(0.12, 0.08, 0.16)
    return g
  }, [])
  return (
    <group rotation={[t * 0.8, 0, 0]}>
      <Metal color={color} position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, 0.12, 24]} />
      </Metal>
      <Metal color={color}>
        <torusGeometry args={[radius, 0.05, 10, 28]} />
      </Metal>
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} rotation={[0, -a, 0]} geometry={tooth} castShadow>
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.18} emissive={color} emissiveIntensity={0.18} />
          </mesh>
        )
      })}
    </group>
  )
}

function ProductMesh({ product, t }) {
  const { shape, color } = product
  switch (shape) {
    case 'shield':
      return (
        <group>
          <Metal color={color} rotation={[0, 0, 0]} scale={[1, 1.15, 0.42]}>
            <octahedronGeometry args={[0.55, 0]} />
          </Metal>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.018, 8, 40]} />
            <meshStandardMaterial color="#f4f1ea" metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <torusGeometry args={[0.3, 0.012, 8, 40]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.25} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        </group>
      )
    case 'stack':
      return (
        <group>
          {[0.42, 0.34, 0.26, 0.18].map((w, i) => (
            <Metal key={i} color={color} position={[0, -0.28 + i * 0.2, 0]}>
              <boxGeometry args={[w * 1.4, 0.16, w]} />
            </Metal>
          ))}
        </group>
      )
    case 'gears':
      return (
        <group>
          <group position={[-0.22, 0.05, 0]}>
            <Gear radius={0.36} teeth={9} color={color} t={t} />
          </group>
          <group position={[0.26, -0.12, 0.08]} rotation={[0.4, 0.3, 0]}>
            <Gear radius={0.24} teeth={8} color={color} t={-t} />
          </group>
        </group>
      )
    case 'book':
      return (
        <group>
          <Metal color={color} position={[-0.16, 0, 0]} rotation={[0, 0.18, 0.08]}>
            <boxGeometry args={[0.28, 0.42, 0.04]} />
          </Metal>
          <Metal color="#f4f1ea" position={[0.16, 0, 0]} rotation={[0, -0.18, -0.08]}>
            <boxGeometry args={[0.28, 0.42, 0.035]} />
          </Metal>
          <Metal color={color} position={[0, 0.36, 0]}>
            <sphereGeometry args={[0.11, 20, 20]} />
          </Metal>
        </group>
      )
    case 'bars':
      return (
        <group>
          {[0.22, 0.38, 0.55].map((h, i) => (
            <Metal key={i} color={color} position={[(i - 1) * 0.22, h / 2 - 0.28, 0]}>
              <boxGeometry args={[0.16, h, 0.16]} />
            </Metal>
          ))}
          <Metal color={color} position={[0, 0.46, 0]} rotation={[0, t * 0.4, 0]}>
            <octahedronGeometry args={[0.14, 0]} />
          </Metal>
        </group>
      )
    case 'plant':
      return (
        <group>
          <Metal color="#5a4030" position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.035, 0.05, 0.42, 8]} />
          </Metal>
          <Metal color={color} position={[0, 0.08, 0]}>
            <icosahedronGeometry args={[0.28, 0]} />
          </Metal>
          <Metal color={color} position={[0.2, -0.02, 0.05]} scale={0.55}>
            <icosahedronGeometry args={[0.22, 0]} />
          </Metal>
        </group>
      )
    case 'plate':
      return (
        <group>
          <Metal color={color} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.38, 0.055, 12, 40]} />
          </Metal>
          <Metal color="#f4f1ea" position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} metalness={0.3} roughness={0.35}>
            <circleGeometry args={[0.34, 40]} />
          </Metal>
          <Metal color={color} position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.16, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </Metal>
        </group>
      )
    case 'tower':
      return (
        <group>
          <Metal color={color} position={[0, 0.08, 0]}>
            <boxGeometry args={[0.42, 0.82, 0.32]} />
          </Metal>
          <Metal color="#0a1c28" position={[0, 0.54, 0]}>
            <boxGeometry args={[0.48, 0.08, 0.36]} />
          </Metal>
          {[-0.1, 0.08, 0.26].map((y) =>
            [-0.1, 0.1].map((x) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.165]}>
                <planeGeometry args={[0.1, 0.1]} />
                <meshStandardMaterial color="#f4f1ea" emissive="#f4d9a0" emissiveIntensity={0.55} />
              </mesh>
            )),
          )}
        </group>
      )
    case 'cross':
      return (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.4, 0.03, 10, 40]} />
            <meshStandardMaterial color={color} metalness={0.75} roughness={0.2} emissive={color} emissiveIntensity={0.25} />
          </mesh>
          <Metal color={color}>
            <boxGeometry args={[0.18, 0.62, 0.14]} />
          </Metal>
          <Metal color={color}>
            <boxGeometry args={[0.5, 0.18, 0.14]} />
          </Metal>
        </group>
      )
    case 'city':
      return (
        <group>
          <Metal color={color} position={[0, -0.32, 0]} metalness={0.4} roughness={0.45}>
            <boxGeometry args={[0.72, 0.05, 0.72]} />
          </Metal>
          {[
            [-0.18, 0.22, -0.16],
            [0.16, 0.34, -0.1],
            [-0.12, 0.14, 0.18],
            [0.2, 0.2, 0.16],
          ].map(([x, h, z], i) => (
            <Metal key={i} color={color} position={[x, h / 2 - 0.28, z]}>
              <boxGeometry args={[0.2, h, 0.2]} />
            </Metal>
          ))}
        </group>
      )
    case 'mic':
      return (
        <group>
          <Metal color={color} position={[0, 0.28, 0]}>
            <capsuleGeometry args={[0.11, 0.2, 8, 16]} />
          </Metal>
          <Metal color="#d6d3cd" position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.42, 10]} />
          </Metal>
          <Metal color={color} position={[0, -0.28, 0]}>
            <coneGeometry args={[0.2, 0.12, 16]} />
          </Metal>
        </group>
      )
    default:
      return (
        <Metal color={color}>
          <icosahedronGeometry args={[0.4, 0]} />
        </Metal>
      )
  }
}

export function ProductFigure({ product, index, total, selected, hovered, onHover, onSelect, paused }) {
  const group = useRef()
  const holo = useHolo(product.color, product.accent)
  const angle = (index / total) * Math.PI * 2
  const radius = 6.15
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    holo.uniforms.uTime.value = t
    holo.uniforms.uBoost.value = THREE.MathUtils.damp(holo.uniforms.uBoost.value, selected || hovered ? 1 : 0, 6, delta)
    const spin = paused ? 0.15 : 0.55
    group.current.rotation.y += delta * spin
    const lift = selected ? 0.28 : hovered ? 0.14 : 0
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.95 + lift + Math.sin(t * 1.1 + index) * 0.04, 4, delta)
    const s = selected ? 1.12 : hovered ? 1.06 : 1
    const cur = group.current.scale.x
    const next = THREE.MathUtils.damp(cur, s, 6, delta)
    group.current.scale.setScalar(next)
  })

  return (
    <group position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
      <mesh receiveShadow position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.72, 40]} />
        <meshStandardMaterial color="#141820" metalness={0.8} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.62, 0.7, 0.16, 32]} />
        <meshStandardMaterial color="#0c1018" metalness={0.85} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.58, 40]} />
        <meshStandardMaterial
          color={product.color}
          emissive={product.color}
          emissiveIntensity={selected || hovered ? 1.2 : 0.35}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight color={product.color} intensity={selected ? 3.2 : hovered ? 2.1 : 0.85} distance={3.4} position={[0, 1.1, 0]} />
      <group
        ref={group}
        position={[0, 0.95, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(product.code)
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(product.code)
        }}
      >
        <ProductMesh product={product} t={index} />
        <mesh scale={1.18}>
          <sphereGeometry args={[0.58, 28, 28]} />
          <primitive object={holo} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
