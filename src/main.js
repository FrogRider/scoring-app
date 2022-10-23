import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import firebase from 'firebase/app';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

createApp({
  created() {
    const config = {
      apiKey: "AIzaSyDcljchEoPvQY17GatYUSo0QxkTX-vJ_a8",
      authDomain: "scoring-app-5bee6.firebaseapp.com",
      projectId: "scoring-app-5bee6",
      storageBucket: "scoring-app-5bee6.appspot.com",
      messagingSenderId: "1023325722401",
      appId: "1:1023325722401:web:bcaf01c6df06096eec1060",
      measurementId: "G-VN1G2LX4TM",
      databaseURL: "https://scoring-app-5bee6-default-rtdb.europe-west1.firebasedatabase.app/",
    };
    firebase.initializeApp(config);
    
  },
  render: () => h(App),
})
.use(router)
.use(createPinia())
.use(autoAnimatePlugin)
.mount('#app')


