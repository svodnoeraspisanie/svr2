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
      meta:{title:"Свора - русское предпринимательство и благотворительность"},
      
      
    },
    {
      path: '/spravka',
      name: 'spravka',
      props: true,
      component: () => import('./views/spravka.vue'),
      meta:{title:"Свора - русское предпринимательство и благотворительность"},
    },
    {
      path: '/statii',
      name: 'statii',
      props: true,
      component: () => import('./views/statii.vue'),
      meta:{title:"Свора - русское предпринимательство и благотворительность"},
    },
    {
      path: '/sobitiya',
      name: 'sobitiya',
      props: true,
      meta:{title:"Расписание событий русской культуры, истории и политики | Свора"},
      component: () => import('./views/sobitiya.vue'),
    },
    {
      path: '/sobitiya/:id',
      props: true,
      meta:{title:"Расписание событий русской культуры, истории и политики | Свора"},
      component: () => import('./views/sobitiya.vue'),
    },
    {
      path: '/predpriyatiya',
      name: 'predpriyatiya',
      props: true,
      meta:{title:"Русские национальные предприятия | Свора"},
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
      meta:{title:"Сборы средств для начинаний | Свора"},
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
      meta:{title:"Присоединиться | Свора"},
      component: () => import('./views/prisoedinitsya.vue'),
    },
  ],
});
