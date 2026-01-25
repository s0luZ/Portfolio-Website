import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import LandingPage from './components/LandingPage.vue'
import AboutMe from './components/AboutMe.vue'
import Projects from './components/Projects.vue'
import Skills from './components/Skills.vue'
import Contacts from './components/Contacts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutMe
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/skills',
      name: 'Skills',
      component: Skills
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
