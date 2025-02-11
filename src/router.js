import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import TierList from './components/TierList.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/tierlist/:id', component: TierList }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;