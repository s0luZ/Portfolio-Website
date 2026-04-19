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
            <li><router-link to="/" class="nav-link active">Home</router-link></li>
            <li><router-link to="/about" class="nav-link">About me</router-link></li> 
            <li><router-link to="/projects" class="nav-link">Projects</router-link></li>
            <li><router-link to="/skills" class="nav-link">Skills & Tech Stack</router-link></li>
            <li><router-link to="/contacts" class="nav-link">Contacts</router-link></li>
          </ul>
        </nav>
        <Transition name="fade" appear>
          <div v-show="showContent" class="personal-info">
            <p>
              Born in 2000 <br>
              in Manila, <br>
              Philippines <br>
              From fear to finesse— <br>
              every developer <br>
              starts somewhere.
            </p>
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
  gap
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

.personal-info {
  position: absolute;
  bottom: var(--corner-content-inset);
  right: var(--corner-content-inset);
  text-align: right;
  backdrop-filter: blur(0px);
  border-radius: 0;
}

.personal-info p {
  margin: 0;
  font-size: clamp(0.8rem, 2.1vw, 0.95rem);
  line-height: 1.45;
  opacity: 0.68;
  font-weight: 400;
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

@media (max-width: 768px) {
  .copyright {
    font-size: 0.72rem;
  }

  .side-nav {
    width: 100%;
    margin: 0 0 0.5rem;
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

  .personal-info {
    max-width: calc(100% - 2 * var(--corner-content-inset));
  }
}

@media (max-width: 480px) {
  .nav-header h1 {
    font-size: clamp(1.85rem, 8vw + 0.45rem, 2.55rem);
  }

  .role {
    font-size: 0.9rem;
  }

  .nav-link {
    font-size: 0.95rem;
  }

  .personal-info {
    max-width: calc(100% - 2 * var(--corner-content-inset));
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
}
</style>