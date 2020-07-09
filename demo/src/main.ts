import Vue from 'vue';
import App from './App.vue';
import router from './router';

import {getFp, getFcp} from 'ofa-vites';

getFp().then(time => {
    console.log(time);
});
getFcp().then(time => {
    console.log(time, 'fcp');
});

// window.addEventListener(
//     'pagehide',
//     event => {
//         console.log('pagehide======', event);
//         console.log(document.visibilityState);
//     },
//     {once: false}
// );

// window.addEventListener('beforeunload', event => {
//     event = event || window.event;

//     // 兼容IE8和Firefox 4之前的版本
//     if (event) {
//         event.returnValue = '关闭提示';
//     }

//     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
//     return '关闭提示';
// });

Vue.config.productionTip = false;

import iscroll from 'ofa-iscroll-business';
import imgOnerror from 'ofa-img-onerror';

Vue.use(iscroll);
Vue.use(imgOnerror);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
