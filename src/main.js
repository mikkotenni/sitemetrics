import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as DesignSystem from '../public/system.min.js'

Vue.config.productionTip = false
/**
 * Injecting Design System (https://github.com/Nosto/front-end-assignment#injecting-design-system-to-your-vue-2x-app) 
 * didn't work in my environment. Skipping the assignment overhead with the following
 * global component registration routine.
 */
Object.keys(DesignSystem.components).forEach(cmp =>
  Vue.component(DesignSystem.components[cmp].name, DesignSystem.components[cmp]));

new Vue({
  store,
  mounted() {
    console.log(DesignSystem);
  },
  render: h => h(App)
}).$mount('#app')