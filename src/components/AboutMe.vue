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
            <li><router-link to="/about" class="nav-link active">About me</router-link></li> 
            <li><router-link to="/projects" class="nav-link">Projects</router-link></li>
            <li><router-link to="/skills" class="nav-link">Skills & Tech Stack</router-link></li>
            <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
          </ul>
        </nav>
        <Transition name="fade" appear>
          <div v-show="showContent" class="about-me-content">
            <div class="about-me-wrapper">
              
              I’m an IT diploma graduate from Lethbridge Polytechnic with a background in Electronics Engineering and a passion for technology, design, and problem-solving. I moved to Canada as an international student to study Computer Information Technology (CIT), where I balanced academics, work, and personal growth.
              <br><br>
              I am currently employed at SFT as a Software Developer, focusing on frontend development and user experience. I enjoy creating interactive and visually engaging applications using Vue.js, React.js, HTML, CSS, and design tools like Figma and Adobe Creative Suite.
              <br><br>
              I’m also expanding my skills in Autodesk Fusion 360 and 3D design for IoT applications as part of my current project work. Outside of technology, I enjoy photography, videography, gaming, and car culture.
              <br>

            </div>
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
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

.about-me-wrapper {
  padding-right: 3.5rem;
  padding-top: 7rem;
  
}

.about-me-wrapper h2 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0rem;
  text-align: right;
}

.about-me-wrapper p {
  margin: 0rem 0;
  font-size: 0.95rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
  text-align: right;
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

@media (max-width: 768px) {
  .particles-wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .main-content {
    height: calc(100vh - 2 * var(--page-frame-inset));
    overflow: hidden;
  }

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

  .about-me-content {
    float: none;
    position: relative;
    right: 0;
    width: 100%;
    margin-top: 2rem;
    max-height: none;
    overflow-y: visible;
    text-align: right;
  }

  .about-me-wrapper {
    padding-right: 0rem;
    padding-top: 1.5rem;
  }

  .about-me-wrapper h2 {
    font-size: clamp(1.35rem, 4vw + 0.5rem, 1.85rem);
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
</style>