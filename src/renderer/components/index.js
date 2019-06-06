//组件全局注册
import Vue from 'vue'
import header from './layout-header.vue'
import container from './layout-container.vue'
import footer from './layout-footer.vue'

Vue.component(header.name, header);
Vue.component(container.name, container);
Vue.component(footer.name, footer);