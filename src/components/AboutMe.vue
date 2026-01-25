<template>
  <div class="landing-container">
    <main class="main-content">
      <p class="copyright">&#169; 2025 Isaiah Macaraeg</p>
      <div class="particles-wrapper">
        <WaveParticles />
        <nav class="side-nav">
          <div class="nav-header">
            <h1>Isaiah Macaraeg</h1>
            <p class="role">Frontend Developer</p>
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
              <h2>About Me</h2>
              <p>
                Hey! I'm a fresh graduate IT student at Lethbridge Polytechnic with a background in Electronics Engineering and a passion 
                for building and understanding computers. I moved to Canada to study Computer Information Technology (CIT), 
                where I balance work, school, and life as an international student.
              </p>

              <h2>My Passion for Frontend Development</h2>
              <p>I love creating engaging, interactive experiences that blend design and functionality. 
                My focus is on UI/UX and interactive design, where I bring ideas to life with smooth transitions and eye-catching visuals. 
                One of my key projects is the 1st Choice Savings Client Booking App, where I helped improve the user 
                experience through thoughtful design and development.
              </p>

              <h2>Skills & Tools</h2>
              <p>Frontend Technologies: Vue.js, React.js, Three.js, HTML, CSS <br>
                Design Tools: Figma (UI/UX), Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Adobe Premiere Pro <br>
                Experience: Coursework, hands-on projects, and continuous learning
              </p>

              <h2>Beyond Coding</h2>
              <p>
                When I'm not coding, I'm capturing moments through photography and videography, or diving into car culture and music.
                I also love playing games and watching movies.
                
              </p>

              <h2>What's Next?</h2>
              <p>
                I see myself working as a junior web developer specializing in user interface and user experience design.
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

.particles-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
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
</style>
