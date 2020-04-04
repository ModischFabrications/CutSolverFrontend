import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueBrowserUpdate from '@sum.cumo/vue-browserupdate';

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueBrowserUpdate, {
    options: {
        // I'm doing my part for a clean and friendly environment without toxic waste everywhere
        text: "Your browser ({brow_name}) is outdated and old enough to make me cry about it on the internet, <a{up_but}>update</a> it please!"
    },
    test: false,
});

new Vue({
    render: h => h(App),
}).$mount('#app');
