import { createRouter, createWebHistory } from 'vue-router';
import Timer from './views/Timer.vue';
import Players from './views/Players.vue';

const routes = [
    {
        path: '/timer',
        component: Timer
    },
    {
        path: '/players',
        component: Players
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router };