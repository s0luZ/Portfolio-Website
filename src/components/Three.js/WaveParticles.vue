<template>
    <div class="wave-particles-container"></div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  let scene, camera, renderer, particles, pointCloud, controls, animationFrameId;
  let time = 0;
  
  onMounted(() => {
    initThree();
    animate(); // Restore animation loop
  });
  
  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose();
    }
    window.removeEventListener('resize', handleResize);
    window.visualViewport?.removeEventListener('resize', handleResize);
  });
  
  function initThree() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Set up camera for top-down view
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.y = 50;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);
  
    const container = document.querySelector('.wave-particles-container');
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(getPixelRatio());
    container.appendChild(renderer.domElement);
  
    // Particle count scales with resolution — fewer particles at all resolutions for a finer glitter
    const pixelCount = window.innerWidth * window.innerHeight;
    const refPixels = 1920 * 1080;
    const particleCount = Math.max(50000, Math.min(200000, Math.floor(200000 * pixelCount / refPixels)));
    particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3); // Store initial positions
  
    const color = new THREE.Color();
    
    // Calculate viewport dimensions at camera position
    const vFOV = THREE.MathUtils.degToRad(75);
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.y);
    const width = height * aspectRatio;
    
    // Create a grid distribution
    const columns = Math.sqrt(particleCount);
    const rows = columns;
    
    for (let i = 0; i < particleCount; i++) {
      const col = (i % columns);
      const row = Math.floor(i / columns);
      
      // Position particles in a grid with some randomness
      const x = (col / columns) * width - width/2 + (Math.random() - 0.5) * 3;
      const z = (row / rows) * height - height/2 + (Math.random() - 0.5) * 3;
      const y = 0;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Store initial positions for wave calculations
      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;
      
      // Static gold color with varying brightness - more variation for glitter effect
      const shade = Math.random() * 0.4 + 0.05; // More variation for glitter
      color.setRGB(
        1.0 * shade, // Red component
        0.84 * shade, // Green component
        0.0 * shade  // Blue component
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.15 + 0.05; // Much smaller particles for glitter effect
    }
  
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
    const baseParticleSize = 0.06;
    const material = new THREE.PointsMaterial({
      size: baseParticleSize * getGlitterSizeScale(window.innerWidth, window.innerHeight),
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
  
    pointCloud = new THREE.Points(particles, material);
    scene.add(pointCloud);
    pointCloud.userData.baseParticleSize = baseParticleSize;
    pointCloud.userData.initialPositions = initialPositions;
  
    // Disable controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
  
    // Resize Handling - also listen to visualViewport for zoom changes
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
  }

  function getPixelRatio() {
    const viewportScale = window.visualViewport?.scale ?? 1;
    const base = window.devicePixelRatio || 1;
    return Math.min(base * viewportScale, 4);
  }

  function getGlitterSizeScale(w, h) {
    const pixelCount = w * h;
    const refPixels = 1920 * 1080;
    const scale = Math.sqrt(pixelCount / refPixels);
    return Math.max(0.45, Math.min(0.6, scale));
  }
  
  function handleResize() {
    if (camera && renderer) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspectRatio = w / h;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(w, h);
      if (pointCloud?.material?.size !== undefined && pointCloud.userData?.baseParticleSize != null) {
        pointCloud.material.size = pointCloud.userData.baseParticleSize * getGlitterSizeScale(w, h);
      }
    }
  }
  
  function animate() {
    time += 0.003; // Slower: more obvious, relaxed ripple
    
    if (pointCloud) {
      const positions = particles.attributes.position.array;
      const initialPositions = pointCloud.userData.initialPositions;
      
      for (let i = 0; i < positions.length; i += 3) {
        const initialX = initialPositions[i];
        const initialZ = initialPositions[i + 2];
        
        const centerOffsetX = -20;
        const centerOffsetZ = 0;
        
        const distanceFromCenter = Math.sqrt(
          Math.pow(initialX - centerOffsetX, 2) + 
          Math.pow(initialZ - centerOffsetZ, 2)
        );
        
        // Slower waves (smaller time coeffs) and stronger amplitude for more obvious ripples
        const wave1 = Math.sin(distanceFromCenter * 0.06 - time * 0.6) * 2;
        const wave2 = Math.sin(distanceFromCenter * 0.03 - time * 0.35) * 1.4;
        const wave3 = Math.sin(distanceFromCenter * 0.012 - time * 0.15) * 1.2;
        
        const waveHeight = (wave1 + wave2 + wave3) * 0.38; // Stronger vertical ripple
        
        const horizontalWave = Math.sin(distanceFromCenter * 0.05 - time * 0.25) * 0.6;
        
        const shadowIntensity = Math.max(0, 1 - (distanceFromCenter / 100));
        const shadowWave = Math.sin(distanceFromCenter * 0.018 - time * 0.08) * shadowIntensity * 0.8;
        
        positions[i] = initialX + horizontalWave;
        positions[i + 1] = waveHeight + shadowWave;
        positions[i + 2] = initialZ + horizontalWave * 0.25;
      }
      
      particles.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  }
  </script>
  
  <style scoped>
  .wave-particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: transparent;
    pointer-events: none;
  }
  </style>