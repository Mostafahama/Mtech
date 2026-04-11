import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

/**
 * CONFIGURATION CONSTANTS
 */
export const ECO_CONFIG = {
    PLANET_RADIUS: 2.5,
    PLANET_SEGMENTS: 256,
    STAR_COUNT: 8000,
    GALAXY_RADIUS: 300,
    COLORS: {
        GOLD: 0xD5B182,
        NAVY: 0x0A101F,
        PURPLE: 0x5C4A7E,
        GLOW: 0xFFE0B2
    }
};

export interface PillarData {
  id: string;
  name: string;
  subtitle: string;
  callout: string;
  initial: string;
  position: { x: number; y: number };
  features: string[];
  bubblePos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// ============================================
// CELESTIAL FACTORY
// ============================================
export class CelestialFactory {
  private static bumpTexture: THREE.CanvasTexture | null = null;

  static createNebulaSkybox(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(300, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(ECO_CONFIG.COLORS.GOLD) },
        uColor2: { value: new THREE.Color(ECO_CONFIG.COLORS.NAVY) },
        uColor3: { value: new THREE.Color(ECO_CONFIG.COLORS.PURPLE) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;

        // Worley Noise Function
        vec2 random2(vec2 p) {
          return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
        }

        void main() {
          vec2 st = vUv * 4.0;
          float m_dist = 1.0;
          for (int y= -1; y <= 1; y++) {
            for (int x= -1; x <= 1; x++) {
              vec2 neighbor = vec2(float(x), float(y));
              vec2 point = random2(floor(st) + neighbor);
              point = 0.5 + 0.5 * sin(uTime * 0.1 + 6.2831 * point);
              float dist = distance(fract(st), neighbor + point);
              m_dist = min(m_dist, dist);
            }
          }
          
          vec3 color = mix(uColor2, uColor3, m_dist);
          color = mix(color, uColor1, 1.0 - m_dist * 1.5);
          gl_FragColor = vec4(color, 0.4 + 0.2 * m_dist);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.random() * Math.PI * 2;
    return mesh;
  }

  static createStarfield(): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(ECO_CONFIG.STAR_COUNT * 3);
    const sizes = new Float32Array(ECO_CONFIG.STAR_COUNT);
    const seeds = new Float32Array(ECO_CONFIG.STAR_COUNT);

    for (let i = 0; i < ECO_CONFIG.STAR_COUNT; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 600;
      const z = (Math.random() - 0.5) * 600;
      positions.set([x, y, z], i * 3);

      const r = Math.random();
      if (r < 0.70) sizes[i] = 0.06;
      else if (r < 0.95) sizes[i] = 0.12;
      else sizes[i] = 0.25;

      seeds[i] = Math.random() * 100.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute float seed;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          float freq = (size > 0.15) ? 1.2 : (size > 0.08 ? 0.7 : 0.3);
          vAlpha = 0.4 + 0.6 * sin(uTime * freq + seed);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  }

  static createGalaxyCore(): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, 'rgba(255, 238, 177, 1)');
    grad.addColorStop(0.2, 'rgba(213, 177, 130, 0.6)'); 
    grad.addColorStop(0.5, 'rgba(10, 16, 31, 0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const material = new THREE.SpriteMaterial({ 
        map: new THREE.CanvasTexture(canvas), 
        blending: THREE.AdditiveBlending,
        transparent: true 
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(20, 18, 1);
    return sprite;
  }

  static createProceduralBumpMap(): THREE.CanvasTexture {
    if (this.bumpTexture) return this.bumpTexture;
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 512, 512);
    
    for(let i=0; i<60; i++) {
        const x = Math.random()*512;
        const y = Math.random()*512;
        const r = 2 + Math.random()*20;
        const grad = ctx.createRadialGradient(x,y,0, x,y,r);
        grad.addColorStop(0, '#666666');
        grad.addColorStop(1, '#888888');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    
    this.bumpTexture = new THREE.CanvasTexture(canvas);
    this.bumpTexture.wrapS = this.bumpTexture.wrapT = THREE.RepeatWrapping;
    return this.bumpTexture;
  }
}

// ============================================
// PILLAR FACTORY
// ============================================
export class PillarFactory {
  static createPlanet(p: PillarData, bumpMap: THREE.Texture, index: number): THREE.Group {
    const group = new THREE.Group();
    group.position.set(p.position.x, p.position.y, 0);

    const material = new THREE.MeshPhysicalMaterial({
      color: ECO_CONFIG.COLORS.GOLD,
      metalness: 0.6,
      roughness: 0.5,
      bumpMap: bumpMap,
      bumpScale: 0.15,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      emissive: 0x3D2817,
      emissiveIntensity: 0.2
    });

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(ECO_CONFIG.PLANET_RADIUS, ECO_CONFIG.PLANET_SEGMENTS, ECO_CONFIG.PLANET_SEGMENTS), 
      material
    );
    sphere.userData = { 
        id: p.id, 
        type: 'planet',
        offsets: this.createFloatingOffsets(index),
        rotationAxis: this.createRotationAxis()
    };
    sphere.castShadow = true;
    group.add(sphere);

    // Halo Light
    const halo = new THREE.PointLight(ECO_CONFIG.COLORS.GOLD, 1.5, 8, 2);
    halo.userData = { type: 'halo' };
    group.add(halo);

    // CSS Label Logic
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.innerHTML = `
        <div class="label-initial">${p.initial}</div>
        <div class="label-name">${p.name.toUpperCase()}</div>
        <div class="label-subtitle">${p.subtitle}</div>
        <div class="label-action">→ EXPLORE</div>
    `;
    const label = new CSS2DObject(labelDiv);
    label.position.set(0, -ECO_CONFIG.PLANET_RADIUS - 1.5, 0);
    group.add(label);

    return group;
  }

  private static createFloatingOffsets(index: number) {
    return {
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      freqX: 0.3 + index * 0.05,
      freqY: 0.4 + index * 0.02,
      freqZ: 0.25 + index * 0.03
    };
  }

  private static createRotationAxis(): THREE.Vector3 {
    return new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
  }

  static createPillarData(base: any[]): PillarData[] {
    const mocks = [
        ["Scalable Architectures", "Cloud Integration", "Educational VR", "EdTech Innovation"],
        ["Full-stack Mastery", "Agile SDLC", "CI/CD Pipelines", "Bespoke Solutions"],
        ["360 Digital Branding", "Performance Marketing", "Social Synergy", "Creative Direction"],
        ["Cinematic Production", "Event Orchestration", "Media Coverage", "Visual Storytelling"]
    ];
    return base.map((b, i) => ({
      ...b,
      features: mocks[i],
      initial: b.name[0]
    }));
  }
}

// ============================================
// NETWORK FACTORY
// ============================================
export class NetworkFactory {
  static createNetworkArcs(pillars: PillarData[]): THREE.Line[] {
    const arcs: THREE.Line[] = [];
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float flow = mod(vUv.x - uTime * 0.5, 1.0);
          float alpha = mix(0.1, 0.8, sin(vUv.x * 3.14 + uTime * 2.0) * 0.5 + 0.5);
          gl_FragColor = vec4(0.835, 0.694, 0.509, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    pillars.forEach((p, i) => {
      const nextP = pillars[(i + 1) % pillars.length];
      const start = new THREE.Vector3(p.position.x, p.position.y, 0);
      const end = new THREE.Vector3(nextP.position.x, nextP.position.y, 0);
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5).setLength(12);
      
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(100);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const uvs = new Float32Array(points.length * 2);
      for(let j=0; j<points.length; j++) uvs[j*2] = j/points.length;
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      arcs.push(new THREE.Line(geo, mat));

      // HUD Lines
      const anchors: { [key: string]: THREE.Vector3 } = {
        'top-left': new THREE.Vector3(-18, 12, 0),
        'top-right': new THREE.Vector3(18, 12, 0),
        'bottom-right': new THREE.Vector3(18, -12, 0),
        'bottom-left': new THREE.Vector3(-18, -12, 0)
      };
      const anchor = anchors[p.bubblePos];
      const hubGeo = new THREE.BufferGeometry().setFromPoints([mid, anchor]);
      arcs.push(new THREE.Line(hubGeo, new THREE.LineBasicMaterial({ color: ECO_CONFIG.COLORS.GOLD, transparent: true, opacity: 0.15 })));
    });

    return arcs;
  }
}

// ============================================
// POST-PROCESSING SETUP
// ============================================
export function initPostProcessing(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): EffectComposer {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.8, 0.15);
  composer.addPass(bloomPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  composer.addPass(fxaaPass);

  return composer;
}
