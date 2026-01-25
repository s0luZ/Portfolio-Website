<template>
  <div class="landing-container">
    <main class="main-content">
      <p class="copyright">&#169; 2025 Isaiah Macaraeg</p>
      <div class="particles-bg">
        <WaveParticles />
      </div>
      <div class="particles-wrapper">
        <nav class="side-nav">
          <div class="nav-header">
            <h1>Isaiah Macaraeg</h1>
            <p class="role">Frontend Developer</p>
          </div>
          
          <ul class="nav-links">
            <li><router-link to="/" class="nav-link">Home</router-link></li>
            <li><router-link to="/about" class="nav-link">About me</router-link></li> 
            <li><router-link to="/projects" class="nav-link active">Projects</router-link></li>
            <li><router-link to="/skills" class="nav-link">Skills & Tech Stack</router-link></li>
            <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
          </ul>
        </nav>
        <Transition name="fade" appear>
          <div v-show="showContent" class="about-me-content">
            <div class="about-me-wrapper">
              <h2>Projects</h2>
              <p>
                1st Choice Savings Client Booking Application Design and Development.
              </p>

              <h3 class="project-section">Admin</h3>
              <div class="project-gallery">
                <img v-for="(img, i) in adminImages" :key="'admin-' + i" :src="img" :alt="'1st Choice Admin screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>

              <h3 class="project-section">User</h3>
              <div class="project-gallery">
                <img v-for="(img, i) in userImages" :key="'user-' + i" :src="img" :alt="'1st Choice User screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxSrc" class="lightbox-backdrop" @click.self="closeLightbox">
          <img :src="lightboxSrc" class="lightbox-img" alt="Full size" />
          <button type="button" class="lightbox-close" aria-label="Close" @click="closeLightbox">×</button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import WaveParticles from './Three.js/WaveParticles.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

import admin101 from '../assets/1st Choice/Admin/101.png';
import admin102 from '../assets/1st Choice/Admin/102.png';
import admin103 from '../assets/1st Choice/Admin/103.png';
import user1 from '../assets/1st Choice/User/1.png';
import user2 from '../assets/1st Choice/User/2.png';
import user3 from '../assets/1st Choice/User/3.png';
import user4 from '../assets/1st Choice/User/4.png';
import user5 from '../assets/1st Choice/User/5.png';
import user6 from '../assets/1st Choice/User/6.png';

const adminImages = [admin101, admin102, admin103];
const userImages = [user1, user2, user3, user4, user5, user6];

const showContent = ref(false);
const lightboxSrc = ref(null);

function openLightbox(src) {
  lightboxSrc.value = src;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxSrc.value = null;
  document.body.style.overflow = '';
}

onMounted(() => {
  showContent.value = true;
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  color: white;
  padding: 2rem;
}

.main-content {
  flex: 12;
  position: relative;
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  border: 2.5px solid rgba(255, 255, 255, 0.5);
  height: calc(100vh - 4rem);
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particles-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 1.5rem;
}

.side-nav {
  flex: 0 0 35%;
  backdrop-filter: blur(0);
  border-radius: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.nav-header {
  margin-bottom: 2rem;
}

.nav-header h1 {
  font-size: clamp(1.5rem, 4.5vw + 1.25rem, 3rem);
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: normal;
  word-break: break-word;
}

.role {
  color: #8b8f98;
  margin-top: 0.5rem;
  font-size: 1.05rem;
  font-weight: 400;
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
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
}

.about-me-content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  text-align: right;
  z-index: 2;
}

.about-me-wrapper {
  padding-right: 0;
  padding-top: 2rem;
}

.about-me-wrapper h2 {
  font-size: 4.35rem;
  font-weight: 600;
  margin-bottom: 0;
}

.about-me-wrapper p {
  margin: 0;
  font-size: 2rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.project-section {
  font-size: 2rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  opacity: 0.95;
}

.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.project-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  object-fit: contain;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-img:hover {
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 2.25rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.lightbox-close:hover {
  opacity: 0.9;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-to,
.lightbox-leave-from {
  opacity: 1;
}
</style>
