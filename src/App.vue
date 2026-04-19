<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import WaveParticles from './components/Three.js/WaveParticles.vue';

const showIntro = ref(true);
let introTimer;

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dwellMs = reduce ? 450 : 2200;
  introTimer = window.setTimeout(() => {
    showIntro.value = false;
  }, dwellMs);
});

onBeforeUnmount(() => {
  if (introTimer != null) window.clearTimeout(introTimer);
});
</script>

<template>
  <div class="app-layout">
    <div class="app-bg-fill" aria-hidden="true"></div>
    <div class="wave-particles-host" aria-hidden="true">
      <WaveParticles />
    </div>
    <div class="app-view">
      <router-view />
    </div>
    <Transition name="intro">
      <div
        v-if="showIntro"
        class="intro-splash"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
      >
        <p id="intro-title" class="intro-line">
          <span class="intro-name">Isaiah Macaraeg</span><span class="intro-portfolio">Portfolio</span>
        </p>
      </div>
    </Transition>
  </div>
</template>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  position: relative;
}

.app-layout {
  position: relative;
  min-height: 100vh;
}

/* Full-bleed base so the gutter outside the framed wave is solid, not see-through to GL */
.app-bg-fill {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: var(--primary-bg);
  pointer-events: none;
}

.wave-particles-host {
  position: fixed;
  top: var(--page-frame-inset);
  right: var(--page-frame-inset);
  bottom: var(--page-frame-inset);
  left: var(--page-frame-inset);
  z-index: 1;
  pointer-events: none;
}

.app-view {
  position: relative;
  z-index: 2;
  min-height: 100vh;
}

.intro-splash {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 2rem;
  background-color: var(--primary-bg);
  text-align: center;
}

.intro-line {
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-size: clamp(1.35rem, 4.2vw, 2.35rem);
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: 0.03em;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Regular (400): thin strokes vs Bold/700, still a step up from Light on “Portfolio” */
.intro-name {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  letter-spacing: 0.025em;
}

/* Raleway Light */
.intro-portfolio {
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  margin-left: 0.55em;
  letter-spacing: 0.04em;
}

.intro-enter-active {
  transition: opacity 0.65s ease;
}

.intro-leave-active {
  transition: opacity 0.75s ease;
}

.intro-enter-from,
.intro-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .intro-enter-active,
  .intro-leave-active {
    transition-duration: 0.12s;
  }
}

body {
  margin: 0;
  overflow: hidden;
}
</style>
