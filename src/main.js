import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
// import router from './router'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
