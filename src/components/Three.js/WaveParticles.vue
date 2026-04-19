<template>
  <div ref="el" class="arc-particles"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const el = ref(null);
let scene, camera, renderer, geo, mat, raf, ro;
let t = 0;

function sz(e) {
  const r = e.getBoundingClientRect();
  return { w: Math.round(r.width)||e.clientWidth||window.innerWidth, h: Math.round(r.height)||e.clientHeight||window.innerHeight };
}
function dpr() { return Math.min((window.visualViewport?.scale??1)*(window.devicePixelRatio||1), 4); }
function grain(w, h) { return Math.max(0.35, Math.min(0.52, Math.sqrt(w*h/(1920*1080)))); }

function density(nx, nz) {
  // Arc center shifted further upper-right so the cloud extends into that corner
  const cx = -1.1, cz = -1.5;
  const R = 1.65;
  const dx = nx - cx, dz = nz - cz;
  const r = Math.sqrt(dx*dx + dz*dz);
  const distFromRing = r - R;
  const angle = Math.atan2(dz, dx);
  // Wider angular range — extends further right and further down-left
  const aMin = -0.05, aMax = 1.65;
  if (angle < aMin || angle > aMax) return 0;
  const aFade = Math.pow(Math.min((angle - aMin)/0.3, (aMax - angle)/0.3, 1.0), 0.5);
  const sig = distFromRing < 0 ? 0.28 : 0.60;
  const radial = Math.exp(-(distFromRing*distFromRing)/(sig*sig));
  const core = Math.exp(-(distFromRing*distFromRing)/(0.09*0.09)) * 1.8;
  return Math.min(1, (radial + core) * aFade);
}

function build(container) {
  const {w:cw, h:ch} = sz(container);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);
  camera = new THREE.PerspectiveCamera(72, cw/ch, 0.1, 1000);
  camera.position.set(0, 42, 0);
  camera.lookAt(0, 0, 0);
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'high-performance'});
  renderer.setSize(cw, ch, true);
  renderer.setPixelRatio(dpr());
  container.appendChild(renderer.domElement);

  const fh = 2 * Math.tan(72*Math.PI/360) * 42;
  const fw = fh * (cw/ch);
  const hW = fw/2, hH = fh/2;

  const N = Math.max(80000, Math.min(200000, Math.floor(160000*(cw*ch)/(1920*1080))));
  const pos  = new Float32Array(N*3);
  const col  = new Float32Array(N*3);
  const base = new Float32Array(N*3);
  const jx   = new Float32Array(N);
  const jz   = new Float32Array(N);
  const jy   = new Float32Array(N);

  let placed=0, tries=0;
  while (placed < N && tries < N*20) {
    tries++;
    // Sample over a wider normalized range so top-right corner gets covered
    const nx = (Math.random()-0.5) * 2.6;
    const nz = (Math.random()-0.5) * 2.6;
    const den = density(nx, nz);
    if (den < 0.001 || Math.random() > den) continue;
    const i = placed;
    const x = nx*hW, z = nz*hH;
    base[i*3]=x;  base[i*3+1]=0; base[i*3+2]=z;
    pos[i*3]=x;   pos[i*3+1]=0;  pos[i*3+2]=z;
    jx[i] = Math.random()*Math.PI*2;
    jz[i] = Math.random()*Math.PI*2;
    jy[i] = Math.random()*Math.PI*2;
    const b = Math.pow(den, 0.4) * (0.3 + Math.random() * 0.7);
    const rng = Math.random() * 0.06;
    col[i*3]   = b * (0.87 + rng);
    col[i*3+1] = b * (0.89 + rng * 0.6);
    col[i*3+2] = b * (0.95 + rng * 0.3);
    placed++;
  }
  for (let i=placed; i<N; i++) {
    const x=(Math.random()-0.5)*fw, z=(Math.random()-0.5)*fh;
    base[i*3]=x; base[i*3+1]=0; base[i*3+2]=z;
    pos[i*3]=x;  pos[i*3+1]=0;  pos[i*3+2]=z;
    jx[i]=Math.random()*Math.PI*2; jz[i]=Math.random()*Math.PI*2; jy[i]=Math.random()*Math.PI*2;
    col[i*3] = 0.012;
    col[i*3+1] = 0.012;
    col[i*3+2] = 0.015;
  }

  geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  mat = new THREE.PointsMaterial({
    size: 0.048*grain(cw,ch), sizeAttenuation:true, transparent:true,
    opacity: 0.42, vertexColors:true, blending:THREE.AdditiveBlending, depthWrite:false
  });
  const cloud = new THREE.Points(geo, mat);
  cloud.userData = { base, jx, jy, jz, N };
  scene.add(cloud);

  ro = new ResizeObserver(()=>resize(container));
  ro.observe(container);
  window.addEventListener('resize', ()=>resize(container));
  tick();
}

function resize(container) {
  if (!renderer||!camera) return;
  const {w,h} = sz(container);
  if (!w||!h) return;
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(dpr());
  renderer.setSize(w, h, true);
  if (mat) mat.size = 0.048*grain(w,h);
}

function tick() {
  t += 0.003;
  const cloud = scene.children[0];
  if (cloud) {
    const pa = geo.attributes.position.array;
    const {base, jx, jy, jz, N} = cloud.userData;
    const gX = Math.sin(t*0.18)*1.8 + Math.sin(t*0.07)*1.1 + Math.sin(t*0.31)*0.5;
    const gZ = Math.cos(t*0.14)*1.6 + Math.cos(t*0.09)*1.0 + Math.cos(t*0.25)*0.6;
    const gY = Math.sin(t*0.11)*0.4 + Math.sin(t*0.19)*0.25;
    for (let i=0; i<N; i++) {
      const mx = Math.sin(t*0.8+jx[i])*0.12;
      const mz = Math.cos(t*0.7+jz[i])*0.12;
      const my = Math.sin(t*0.6+jy[i])*0.06;
      pa[i*3]   = base[i*3]   + gX + mx;
      pa[i*3+1] = base[i*3+1] + gY + my;
      pa[i*3+2] = base[i*3+2] + gZ + mz;
    }
    geo.attributes.position.needsUpdate = true;
  }
  renderer.render(scene, camera);
  raf = requestAnimationFrame(tick);
}

onMounted(()=>{ if (el.value) build(el.value); });
onBeforeUnmount(()=>{
  cancelAnimationFrame(raf);
  renderer?.dispose();
  ro?.disconnect();
});
</script>

<style scoped>
.arc-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.arc-particles :deep(canvas) {
  display: block;
}
</style>