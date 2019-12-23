import Vue from 'vue';
import Router from 'vue-router';
import glavnaya from './views/glavnaya.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
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
      path: '/statii',
      name: 'statii',
    
      component: () => import('./views/statii.vue'),
    },
    {
      path: '/raspisanie',
      name: 'raspisanie',

      component: () => import('./views/raspisanie.vue'),
    },
    {
      path: '/predpriyatiya',
      name: 'predpriyatiya',

      component: () => import('./views/predpriyatiya.vue'),
    },
    {
      path: '/predpriyatiya/:id',
      

      component: () => import('./views/predpriyatie.vue'),
    },
    {
      path: '/sbori',
      name: 'sbori',

      component: () => import('./views/sbori.vue'),
    },
    {
      path: '/dob',
      name: 'dob',

      component: () => import('./views/dobavlenie.vue'),
    },
    {
      path: '/prisoedinitsya',
      name: 'prisoedinitsya',

      component: () => import('./views/prisoedinitsya.vue'),
    },

    
  ],

});
