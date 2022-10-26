import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueShowdown from 'vue-showdown';
import VueBrowserUpdate from '@sum.cumo/vue-browserupdate';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueShowdown, {
    options: {
        emoji: true
    }
})

Vue.use(VueBrowserUpdate, {
    options: {
        // I'm doing my part for a clean and friendly environment!
        text: "Your browser ({brow_name}) is crazy outdated, <a{up_but}>update</a> it please!"
    },
    test: false,
});


Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
