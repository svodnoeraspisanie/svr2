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
      props: true,
    },
    {
      path: '/spravka',
      name: 'spravka',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/spravka.vue'),

    },
    {
      path: '/statii',
      name: 'statii',
      props: true,
      component: () => import('./views/statii.vue'),

    },
    {
      path: '/raspisanie',
      name: 'raspisanie',
      props: true,

      component: () => import('./views/raspisanie.vue'),
    },
    {
      path: '/predpriyatiya',
      name: 'predpriyatiya',
      props: true,
      component: () => import('./views/predpriyatiya.vue'),
    },
    {
      path: '/predpriyatiya/:id',
      props: true,

      component: () => import('./views/predpriyatie.vue'),
    },
    {
      path: '/sbori',
      name: 'sbori',
      props: true,
      component: () => import('./views/sbori.vue'),
    },
    {
      path: '/dob',
      name: 'dob',
      props: true,
      component: () => import('./views/dobavlenie.vue'),
    },
    {
      path: '/prisoedinitsya',
      name: 'prisoedinitsya',
      props: true,
      component: () => import('./views/prisoedinitsya.vue'),
    },


  ],

});
