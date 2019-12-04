import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import iscroll from 'ofa-iscroll-business';
import imgOnerror from 'ofa-img-onerror';

Vue.use(iscroll);
Vue.use(imgOnerror);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
