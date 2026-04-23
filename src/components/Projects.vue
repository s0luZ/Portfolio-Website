<template>
  <div class="landing-container">
    <main class="main-content">
      <p class="copyright">&#169; 2025 Isaiah Macaraeg</p>
      <div class="particles-wrapper">
        <nav class="side-nav">
          <div class="nav-header">
            <h1>Isaiah Macaraeg</h1>
            <p class="role">Web Designer | Software Developer</p>
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
          <div v-show="showContent" class="about-me-content projects-page-content">
            <div class="about-me-wrapper">
              <br>
              <ul class="main-project-list" role="list">
                <li v-for="p in mainProjects" :key="p.id" class="main-project-item">
                  <button
                    type="button"
                    class="main-project-trigger"
                    :class="{ 'main-project-trigger--single-line': p.id === 'trackpro' }"
                    @click="openProjectModal(p.id)"
                  >
                    {{ p.title }}
                  </button>
                </li>
              </ul>

            </div>
          </div>
        </Transition>
      </div>
    </main>

    <!-- Project details modal -->
    <Teleport to="body">
      <Transition name="project-modal">
        <div
          v-if="projectModalId"
          class="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="projectModalTitleId"
          @click.self="closeProjectModal"
        >
          <div class="project-modal-panel">
            <button type="button" class="project-modal-close" aria-label="Close project details" @click="closeProjectModal">×</button>

            <div v-if="projectModalId === 'first-choice'" :id="projectModalTitleId" class="project-modal-body">
              <h3 class="project-modal-heading">1st Choice Savings Client Booking Application Design and Development.</h3>
              <p class="project-description">
                Role: UI/UX + Frontend Developer
                <br>
                Stack: Vue.js, Node.js, MySQL, Figma
                <br>
                Features: Booking flow, branch selection, admin scheduling
                <br>
                Focus: Accessibility + responsive layout
              </p>
              <h4 class="project-section">Admin</h4>
              <div class="project-gallery modal-gallery">
                <img v-for="(img, i) in adminImages" :key="'admin-' + i" :src="img" :alt="'1st Choice Admin screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>
              <h4 class="project-section">User</h4>
              <div class="project-gallery modal-gallery">
                <img v-for="(img, i) in userImages" :key="'user-' + i" :src="img" :alt="'1st Choice User screen ' + (i + 1)" class="project-img" @click="openLightbox(img)" />
              </div>
            </div>

            <div v-else-if="projectModalId === 'veltrix'" :id="projectModalTitleId" class="project-modal-body">
              <h3 class="project-modal-heading">Veltrix Shipping Company Homepage Design</h3>
              <p class="project-description">
                Role: UI/UX + Frontend Developer
                <br>
                Stack: Figma
                <br>
                Features: Booking, Comany Information, Services, Contact Us
                <br>
                Focus: Accessibility + responsive layout
              </p>
              <div class="project-gallery veltrix-gallery modal-gallery">
                <img :src="veltrixImage" alt="Veltrix shipping company homepage" class="project-img veltrix-img" @click="openLightbox(veltrixImage)" />
              </div>
            </div>

            <div v-else-if="projectModalId === 'trackpro'" :id="projectModalTitleId" class="project-modal-body">
              <h3 class="project-modal-heading">Trackpro Tires Branding Design</h3>
              <p class="project-description">
                Role: Graphics Designer
                <br>
                Stack: Adobe Photoshop and Illustrator
                <br>
                Features: Minimalistic, premium branding
              </p>
              <h4 class="project-section">Logo</h4>
              <div class="project-gallery trackpro-gallery modal-gallery">
                <img v-for="(img, i) in trackproLogoImages" :key="'logo-' + i" :src="img.src" :alt="img.alt" class="project-img" @click="openLightbox(img.src)" />
              </div>
              <h4 class="project-section">Calling Card</h4>
              <div class="project-gallery trackpro-gallery modal-gallery">
                <img v-for="(img, i) in trackproCallingCardImages" :key="'callingcard-' + i" :src="img.src" :alt="img.alt" class="project-img" @click="openLightbox(img.src)" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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

const mainProjects = [
  {
    id: 'first-choice',
    title: '1st Choice Savings Client Booking Application Design and Development.'
  },
  {
    id: 'veltrix',
    title: 'Veltrix Shipping Company Homepage Design'
  },
  {
    id: 'trackpro',
    title: 'Trackpro Tires Branding Design'
  }
];

const showContent = ref(false);
const lightboxSrc = ref(null);
const projectModalId = ref(null);
const projectModalTitleId = 'project-modal-title';

function openProjectModal(id) {
  projectModalId.value = id;
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModalId.value = null;
  if (!lightboxSrc.value) {
    document.body.style.overflow = '';
  }
}

function openLightbox(src) {
  lightboxSrc.value = src;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxSrc.value = null;
  if (!projectModalId.value) {
    document.body.style.overflow = '';
  }
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
  padding: var(--page-frame-inset);
  overflow-x: hidden;
}

.main-content {
  flex: 12;
  position: relative;
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  border: var(--frame-border);
}

.particles-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: var(--frame-inner-padding);
  z-index: 2;
}

.side-nav {
  width: 35%;
  backdrop-filter: blur(0px);
  border-radius: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--nav-block-to-links-gap);
  margin: 0;
}

.nav-header {
  margin-bottom: 0;
}

.nav-header h1 {
  display: flex;
  flex-direction: column;
  font-size: clamp(2rem, 5.5vw + 1rem, 3.35rem);
  margin: 0;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.role {
  color: #8b8f98;
  margin-top: var(--nav-title-sub-gap);
  font-size: 1.05rem;
  font-weight: 400;
  white-space: nowrap;
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--nav-link-spacing);
  margin: 0;
  padding: 0;
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

/* Use space from nav (35%) to frame edge — avoids a narrow 40% strip on the far right */
.about-me-content.projects-page-content {
  float: none;
  width: auto;
  left: calc(35% + clamp(1rem, 2.5vw, 2.25rem));
  right: clamp(0.5rem, 1.5vw, 2rem);
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.projects-page-content .about-me-wrapper {
  padding-right: clamp(1rem, 2.5vw, 2rem);
  padding-top: 7rem;
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

.main-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: flex-end;
}

.main-project-item {
  width: 100%;
  max-width: 100%;
}

.main-project-trigger {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.2rem 0;
  border: none;
  background: transparent;
  color: inherit;
  font-family: var(--font-primary);
  font-size: clamp(1.92rem, 5.35vw + 0.92rem, 3.15rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.18;
  text-align: right;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.25s ease;
}

.main-project-trigger:hover {
  opacity: 0.5;
}

.main-project-trigger:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.65);
  outline-offset: 4px;
  opacity: 1;
}

@media (min-width: 769px) {
  .main-project-trigger--single-line {
    white-space: nowrap;
  }
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
  bottom: var(--corner-content-inset);
  left: var(--corner-content-inset);
  color: #ffffff;
  font-size: 0.8rem;
  opacity: 0.45;
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

  /* Border via ::after so it sits above the global wave layer and below content (z=2) */
  .main-content::after {
    content: '';
    position: absolute;
    inset: 0;
    border: var(--frame-border);
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

}

@media (max-width: 768px) {
  .copyright {
    font-size: 0.72rem;
  }

  .side-nav {
    width: 100%;
    margin: 0;
  }

  .nav-header h1 {
    font-size: clamp(2rem, 9vw + 0.5rem, 2.85rem);
    white-space: normal;
    max-width: 100%;
  }

  .role {
    font-size: 0.95rem;
    white-space: normal;
  }

  .nav-link {
    font-size: 1rem;
  }

  /* Fixed page size: main does not scroll */
  .main-content {
    height: calc(100vh - 2 * var(--page-frame-inset));
    overflow: hidden;
  }

  /* Scroll lives here: nav (top) scrolls away when scrolling down, projects come into view */
  .particles-wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .about-me-content {
    float: none;
    position: relative;
    right: 0;
    width: 100%;
    margin-top: 2rem;
    max-height: none;
  }

  .about-me-content.projects-page-content {
    left: auto;
    right: auto;
    overflow-x: hidden;
  }

  .about-me-wrapper {
    padding-right: 0rem;
    padding-top: 1.5rem;
  }

  .about-me-wrapper h2 {
    font-size: clamp(1.75rem, 5vw + 0.5rem, 2.5rem);
  }

  .project-section {
    font-size: clamp(1.35rem, 3.5vw + 0.35rem, 1.85rem);
  }

  .project-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .project-img {
    max-width: 100%;
  }

  .main-project-trigger {
    font-size: clamp(1.88rem, 8.5vw + 0.48rem, 2.75rem);
    line-height: 1.16;
  }
}

@media (max-width: 480px) {
  .main-content {
    height: calc(100vh - 2 * var(--page-frame-inset));
  }

  .nav-header h1 {
    font-size: clamp(1.85rem, 8vw + 0.45rem, 2.55rem);
  }

  .role {
    font-size: 0.9rem;
  }

  .nav-link {
    font-size: 0.95rem;
  }

  .main-project-trigger {
    font-size: clamp(1.75rem, 7.5vw + 0.42rem, 2.45rem);
    line-height: 1.15;
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

/* Project detail modal */
.project-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.project-modal-panel {
  position: relative;
  width: min(720px, 100%);
  max-height: min(90vh, 900px);
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1.75rem 1.75rem 1.5rem;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}

.project-modal-panel::-webkit-scrollbar {
  width: 8px;
}

.project-modal-panel::-webkit-scrollbar-track {
  background: transparent;
}

.project-modal-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}

.project-modal-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.22);
}

.project-modal-panel {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
}

.project-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.2s ease;
  z-index: 5;
}

.project-modal-close:hover {
  opacity: 0.95;
}

.project-modal-body {
  text-align: right;
  padding-top: 0.35rem;
  padding-right: 2.5rem;
}

.project-modal-body .veltrix-gallery {
  display: block !important;
  width: 100%;
}

.project-modal-body .veltrix-img {
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
  object-fit: contain;
}

.project-modal-heading {
  font-family: var(--font-primary);
  font-size: 1.22rem;
  font-weight: 300;
  line-height: 1.45;
  margin: 0 0 1rem;
  opacity: 0.98;
}

.project-modal-body .project-description {
  text-align: right;
  margin-bottom: 1.25rem;
}

.project-modal-body .project-section {
  margin-top: 1.25rem;
}

.modal-gallery {
  margin-bottom: 0.75rem;
}

.project-modal-enter-active,
.project-modal-leave-active {
  transition: opacity 0.25s ease;
}

.project-modal-enter-active .project-modal-panel,
.project-modal-leave-active .project-modal-panel {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
}

.project-modal-enter-from .project-modal-panel,
.project-modal-leave-to .project-modal-panel {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.project-modal-enter-to,
.project-modal-leave-from {
  opacity: 1;
}

.project-modal-enter-to .project-modal-panel,
.project-modal-leave-from .project-modal-panel {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (max-width: 768px) {
  .project-modal-backdrop {
    padding: 0.75rem;
  }

  .project-modal-panel {
    width: 100%;
    max-height: 92vh;
    padding: 1.15rem 0.95rem 1rem;
    border-radius: 10px;
  }

  .project-modal-close {
    top: 0.45rem;
    right: 0.45rem;
    width: 2.35rem;
    height: 2.35rem;
    font-size: 1.9rem;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 999px;
    opacity: 0.82;
  }

  .project-modal-body {
    padding-top: 1.35rem;
    padding-right: 1.1rem;
  }
}

@media (max-width: 480px) {
  .project-modal-backdrop {
    padding: 0.4rem;
  }

  .project-modal-panel {
    padding: 0.95rem 0.75rem 0.9rem;
  }

  .project-modal-body {
    padding-top: 1.4rem;
    padding-right: 0.55rem;
  }
}
</style>