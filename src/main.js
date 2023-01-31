import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import firebase from 'firebase/app';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import Notifications from '@kyvg/vue3-notification';

createApp({
  created() {
    const config = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG)
    firebase.initializeApp(config);
    const appCheck = firebase.appCheck();
    appCheck.activate('6Lc7LUAkAAAAAPzYcVfLq30yoO7tHD9ARmSyUkto', true);
    
  },
  render: () => h(App),
})
.use(router)
.use(Notifications)
.use(createPinia())
.use(autoAnimatePlugin)
.mount('#app')


