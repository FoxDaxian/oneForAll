import smoothScroll from './scroll.vue';

export default {
    install(Vue: any, opt: any): void {
        Vue.component(smoothScroll.name, smoothScroll);
    }
};
