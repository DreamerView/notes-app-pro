import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SelectedNotes from '../views/SelectedNotes.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/:uuid',
    name: 'Notes',
    component: SelectedNotes,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
