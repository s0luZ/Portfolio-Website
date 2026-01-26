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
            <p class="role">Web Designer | Front-End Developer</p>
          </div>
          
          <ul class="nav-links">
            <li><router-link to="/" class="nav-link">Home</router-link></li>
            <li><router-link to="/about" class="nav-link ">About me</router-link></li> 
            <li><router-link to="/projects" class="nav-link active">Projects</router-link></li>
            <li><router-link to="/skills" class="nav-link">Skills & Tech Stack</router-link></li>
            <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
          </ul>
        </nav>
        <Transition name="fade" appear>
          <div v-show="showContent" class="about-me-content">
            <div class="about-me-wrapper">
              <h2>Projects</h2>
              <br>

              <p>
                1st Choice Savings Client Booking Application Design and Development.
              </p>
              <p class="project-description">
                Role: UI/UX + Frontend Developer
                <br>
                Stack: Vue.js, Node.js, MySQL, Figma
                <br>
                Features: Booking flow, branch selection, admin scheduling
                <br>
                Focus: Accessibility + responsive layout
              </p>
              <h3 class="project-section">Admin</h3>
              <div class="project-gallery">
                <img v-for="(img, i) in adminImages" :key="'admin-' + i" :src="img" :alt="'1st Choice Admin screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>

              <h3 class="project-section">User</h3>
              <div class="project-gallery">
                <img v-for="(img, i) in userImages" :key="'user-' + i" :src="img" :alt="'1st Choice User screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>

              <br><br>
              <p>Veltrix Shipping Company Homepage Design</p>

              <p class="project-description">
                Role: UI/UX + Frontend Developer
                <br>
                Stack: Figma
                <br>
                Features: Booking, Comany Information, Services, Contact Us
                <br>
                Focus: Accessibility + responsive layout
              </p>

              <div class="project-gallery veltrix-gallery">
                <img :src="veltrixImage" alt="Veltrix shipping company homepage" class="project-img veltrix-img" @click="openLightbox(veltrixImage)" />
              </div>

              <br><br>
              <p>Trackpro Tires</p>

              <p class="project-description">
                Role: Graphics Designer
                <br>
                Stack: Adobe Photoshop and Illustrator
                <br>
                Features: Minimalistic, premium branding
              </p>

              <h3 class="project-section">Logo</h3>
              <div class="project-gallery trackpro-gallery">
                <img v-for="(img, i) in trackproLogoImages" :key="'logo-' + i" :src="img.src" :alt="img.alt" class="project-img" @click="openLightbox(img.src)" />
              </div>

              <h3 class="project-section">Calling Card</h3>
              <div class="project-gallery trackpro-gallery">
                <img v-for="(img, i) in trackproCallingCardImages" :key="'callingcard-' + i" :src="img.src" :alt="img.alt" class="project-img" @click="openLightbox(img.src)" />
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </main>

    <!-- Full-screen image lightbox -->
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
import veltrixImage from '../assets/Veltrix/Veltrix.png';

// Trackpro Tires - Logo images
import tpRectBlackJpg from '../assets/Track Pro Tires/Logo/TP Rect Black.jpg';
import tpRectWhiteJpg from '../assets/Track Pro Tires/Logo/TP Rect White.jpg';
import tpSquareBlackJpg from '../assets/Track Pro Tires/Logo/TP Square Black.jpg';
import tpSquareWhiteJpg from '../assets/Track Pro Tires/Logo/TP Square White.jpg';

// Trackpro Tires - Calling Card images
import ccBackWhite from '../assets/Track Pro Tires/Calling Card/CC Back White.jpg';
import ccBack from '../assets/Track Pro Tires/Calling Card/CC Back.jpg';
import ccFrontWhite from '../assets/Track Pro Tires/Calling Card/CC Front White.jpg';
import ccFront from '../assets/Track Pro Tires/Calling Card/CC Front.jpg';

const adminImages = [admin101, admin102, admin103];
const userImages = [user1, user2, user3, user4, user5, user6];

const trackproLogoImages = [
  { src: tpRectBlackJpg, alt: 'Trackpro Tires Logo - Rectangle Black' },
  { src: tpRectWhiteJpg, alt: 'Trackpro Tires Logo - Rectangle White' },
  { src: tpSquareBlackJpg, alt: 'Trackpro Tires Logo - Square Black' },
  { src: tpSquareWhiteJpg, alt: 'Trackpro Tires Logo - Square White' }
];

const trackproCallingCardImages = [
  { src: ccBackWhite, alt: 'Trackpro Tires Calling Card - Back White' },
  { src: ccBack, alt: 'Trackpro Tires Calling Card - Back' },
  { src: ccFrontWhite, alt: 'Trackpro Tires Calling Card - Front White' },
  { src: ccFront, alt: 'Trackpro Tires Calling Card - Front' }
];

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
  overflow-x: hidden;
}

.main-content {
  flex: 12;
  position: relative;
  background-color: transparent;
  border-radius: 0px;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
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
}

.side-nav {
  width: 35%;
  backdrop-filter: blur(0px);
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
  font-size: 3.35rem;
  font-weight: 600;
  margin-bottom: 0rem;
}

.about-me-wrapper p {
  margin: 0rem 0;
  font-size: 1.5rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.about-me-wrapper p.project-description {
  font-size: 0.95rem;
}

.veltrix-description {
  font-size: 1.2rem !important;
}

.veltrix-gallery {
  grid-template-columns: 1fr;
  max-width: 100%;
  justify-items: end;
}

.veltrix-gallery {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: flex-start !important;
  margin-left: auto;
  width: 100%;
  grid-template-columns: none !important;
}

.veltrix-img {
  max-width: 600px !important;
  width: auto !important;
  margin-left: auto !important;
  display: block;
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
  justify-items: end;
  align-items: flex-end;
}

.trackpro-gallery {
  grid-template-columns: repeat(2, 1fr);
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

/* Custom scrollbar for about-me-content */
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

/* Fixed glitter + transparent main from 992px down so glitter stays visible at lower resolutions */
@media (max-width: 992px) {
  .main-content {
    background-color: transparent;
  }

  /* Border via ::after so it stays above the fixed particles-bg (z=0) and below content (z=2) */
  .main-content::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  .particles-bg {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
}

@media (max-width: 768px) {
  .landing-container {
    padding: 1rem;
  }

  .particles-wrapper {
    padding: 1rem;
  }

  .copyright {
    bottom: 0.5rem;
    left: 1rem;
    font-size: 0.7rem;
  }

  .nav-header h1 {
    font-size: 1.35rem;
  }

  /* Fixed page size: main does not scroll */
  .main-content {
    height: calc(100vh - 2rem);
    overflow: hidden;
  }

  /* Keep glitter inside the main-content border on mobile (override 992px fixed/100vw) */
  .particles-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 100%;
  }

  /* Scroll lives here: nav (top) scrolls away when scrolling down, projects come into view */
  .particles-wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .side-nav {
    width: 100%;
  }
  
  .about-me-content {
    position: relative;
    right: 0;
    width: 100%;
    margin-top: 2rem;
    max-height: none;
  }

  .about-me-wrapper {
    padding-right: 0rem;
  }

  .project-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .project-img {
    max-width: 100%;
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

/* Transition styles */
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

/* Full-screen lightbox */
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