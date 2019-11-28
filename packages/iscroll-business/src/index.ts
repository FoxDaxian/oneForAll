import iscrollBusiness from './scroll.vue';

export default {
    install(Vue: any, opt: any): void {
        Vue.component(iscrollBusiness.name, iscrollBusiness);
    }
};
