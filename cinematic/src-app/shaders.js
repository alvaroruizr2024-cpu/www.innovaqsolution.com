export const hologramVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const hologramFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uTime;
  uniform float uBoost;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 2.4);
    float scan = 0.55 + 0.45 * sin(vWorldPos.y * 18.0 + uTime * 2.4);
    float pulse = 0.88 + 0.12 * sin(uTime * 1.6 + vWorldPos.x * 2.0);
    vec3 base = mix(uColor, uAccent, fresnel * 0.65);
    vec3 col = base * (0.22 + fresnel * 1.15) * scan * pulse;
    col += uAccent * fresnel * (0.35 + uBoost * 0.55);
    float alpha = 0.72 + fresnel * 0.26 + uBoost * 0.08;
    gl_FragColor = vec4(col, alpha);
  }
`

export const fogVertex = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const fogFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying vec3 vWorldPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  void main() {
    float n = noise(vWorldPos * 0.18 + vec3(0.0, uTime * 0.07, uTime * 0.04));
    float h = smoothstep(-0.4, 3.4, vWorldPos.y);
    float radial = 1.0 - smoothstep(2.0, 14.0, length(vWorldPos.xz));
    float density = n * (1.0 - h) * radial * 0.42;
    vec3 col = mix(uColorA, uColorB, n);
    gl_FragColor = vec4(col, density);
  }
`

export const rimVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 3.0);
    gl_FragColor = vec4(uColor, fresnel * 0.55);
  }
`
