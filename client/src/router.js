import Vue from 'vue';
import Router from 'vue-router';
import glavnaya from './views/glavnaya.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'glavnaya',
      component: glavnaya,
    },
    {
      path: '/spravka',
      name: 'spravka',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/spravka.vue'),
    },
    {
      path: '/raspisanie',
      name: 'raspisanie',

      component: () => import(/* webpackChunkName: "about" */ './views/raspisanie.vue'),
    },
    {
      path: '/predpriyatiya',
      name: 'predpriyatiya',

      component: () => import(/* webpackChunkName: "about" */ './views/predpriyatiya.vue'),
    },
    {
      path: '/predpriyatiya/:n',
      

      component: () => import(/* webpackChunkName: "about" */ './views/predpriyatie.vue'),
    },
    {
      path: '/sbori',
      name: 'sbori',

      component: () => import(/* webpackChunkName: "about" */ './views/sbori.vue'),
    },
  ],
});
