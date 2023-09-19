import { createRouter, createWebHistory } from 'vue-router';
import Timer from './views/Timer.vue';
import Players from './views/Players.vue';
import Top10 from './views/Top10.vue';
import Scrims from './views/Scrims.vue';
import TopTeams from './views/TopTeams.vue';
import Statistics from './views/Statistics.vue';
import PlayerStatistics from './views/PlayerStatistics.vue';
import FFWS from './views/FFWS.vue';

const routes = [
    {
        path: '/timer',
        component: Timer
    },
    {
        path: '/players',
        component: Players
    },
    {
        path: '/top10',
        component: Top10
    },
    {
        path: '/scrims',
        component: Scrims
    },
    {
        path: '/topteams',
        component: TopTeams
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/playerstatistics',
        component: PlayerStatistics
    },
    {
        path: '/ffws',
        component: FFWS
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router };