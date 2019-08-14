/* eslint-disable linebreak-style */
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import ru from 'vuetify/es5/locale/ru';



Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },

  lang: {
    locales: { ru},
    current: 'ru',
  },
});
