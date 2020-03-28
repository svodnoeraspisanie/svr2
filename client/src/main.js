import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

import { firestorePlugin } from 'vuefire';

import App from './App.vue';
import router from './router';

import vuetify from './plugins/vuetify';

import {config} from './apis.js'



firebase.initializeApp(config);

Vue.prototype.$firebase = firebase.firestore();
Vue.prototype.$store = firebase.storage();

firebase.analytics();
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

const serialize = (snapshot) => {return Object.defineProperty(snapshot.data(), 'id', { value: snapshot.id })
}

Vue.use(firestorePlugin, { serialize });

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
