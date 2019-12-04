import Vue from 'vue';
import Router from 'vue-router';

const scroll = () => import('../components/scroll.vue');
const imgOnerror = () => import('../components/imgOnerror.vue');

Vue.use(Router);

const routes = [
    {
        path: 'scroll',
        name: 'scroll',
        component: scroll
    },
    {
        path: 'imgOnerror',
        name: 'imgOnerror',
        component: imgOnerror
    }
];

export default new Router({
    mode: 'hash',
    routes
});
