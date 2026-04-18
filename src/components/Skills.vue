<template>
  <div class="landing-container">
    <main class="main-content">
      <p class="copyright">&#169; 2025 Isaiah Macaraeg</p>
      <div class="particles-wrapper">
        <WaveParticles />
        <nav class="side-nav">
          <div class="nav-header">
            <h1>Isaiah Macaraeg</h1>
            <p class="role">Web Designer | Software Developer</p>
          </div>

          <ul class="nav-links">
            <li><router-link to="/" class="nav-link">Home</router-link></li>
            <li><router-link to="/about" class="nav-link">About me</router-link></li>
            <li><router-link to="/projects" class="nav-link">Projects</router-link></li>
            <li><router-link to="/skills" class="nav-link active">Skills & Tech Stack</router-link></li>
            <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
          </ul>
        </nav>
        <Transition name="fade" appear>
          <div v-show="showContent" class="about-me-content">
            <div class="about-me-wrapper">
              <h2>Skills & Tech Stack</h2>
              <p>
                Technologies and tools I use for building interfaces, prototypes, and interactive experiences.
              </p>

              <h3 class="section-title">Frontend</h3>
              <p class="section-list">Vue.js, React.js, Three.js, HTML, CSS, WordPress</p>

              <h3 class="section-title">Design</h3>
              <p class="section-list">Figma (UI/UX), Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Adobe Premiere Pro</p>

              <h3 class="section-title">Tools & workflow</h3>
              <p class="section-list">Git, npm, Vite</p>

              <p class="experience-note">
                Experience from coursework, hands-on projects, and continuous learning.
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import WaveParticles from './Three.js/WaveParticles.vue';
import { ref, onMounted } from 'vue';

const showContent = ref(false);

onMounted(() => {
  showContent.value = true;
});
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  color: white;
  padding: 2rem;
  overflow-x: hidden;
}

.main-content {
  flex: 12;
  position: relative;
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
}

.particles-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
}

.side-nav {
  width: 35%;
  backdrop-filter: blur(0);
  border-radius: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.nav-header {
  margin-bottom: 2rem;
}

.nav-header h1 {
  display: flex;
  flex-direction: column;
  font-size: clamp(1.5rem, 4.5vw + 1.25rem, 3rem);
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.role {
  color: #8b8f98;
  margin-top: 0.5rem;
  font-size: 1.05rem;
  font-weight: 400;
  white-space: nowrap;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.125rem;
  transition: opacity 0.3s ease;
  opacity: 0.7;
  font-weight: 500;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
}

.about-me-content {
  float: right;
  text-align: right;
  position: absolute;
  z-index: 2;
  overflow-y: auto;
  top: 1rem;
  width: 40%;
  max-height: calc(100vh - 4rem);
  right: -2.2rem;
}

.about-me-wrapper {
  padding-right: 3.5rem;
  padding-top: 7rem;
}

.about-me-wrapper h2 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0;
}

.about-me-wrapper p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
  opacity: 0.95;
}

.section-list {
  margin-bottom: 0.5rem !important;
}

.experience-note {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.85;
}

.copyright {
  position: absolute;
  bottom: 1rem;
  left: 2rem;
  color: #ffffff;
  font-size: 0.9rem;
  opacity: 0.5;
  z-index: 10;
  pointer-events: none;
}

.about-me-content::-webkit-scrollbar {
  width: 8px;
}

.about-me-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.about-me-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.about-me-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .landing-container {
    padding: 1rem;
  }

  .particles-wrapper {
    padding: 1rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .main-content {
    height: calc(100vh - 2rem);
    overflow: hidden;
  }

  .copyright {
    bottom: 0.5rem;
    left: 1rem;
    font-size: 0.7rem;
  }

  .nav-header h1 {
    font-size: 1.35rem;
  }

  .about-me-content {
    position: relative;
    right: 0;
    width: 100%;
    margin-top: 2rem;
    max-height: none;
    overflow-y: visible;
  }

  .about-me-wrapper {
    padding-right: 0rem;
  }
}

@media (max-width: 480px) {
  .landing-container {
    padding: 0.75rem;
  }

  .particles-wrapper {
    padding: 0.75rem;
  }

  .main-content {
    height: calc(100vh - 1.5rem);
  }

  .nav-header h1 {
    font-size: 1.15rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
