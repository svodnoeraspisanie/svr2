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
      meta:{title:"Ракитов Куст - русское предпринимательство и благотворительность"},
      
      
    },
    {
      path: '/spravka',
      name: 'spravka',
      props: true,
      component: () => import('./views/spravka.vue'),
      meta:{title:"Ракитов Куст - русское предпринимательство и благотворительность"},
    },
    {
      path: '/statii',
      name: 'statii',
      props: true,
      component: () => import('./views/statii.vue'),
      meta:{title:"Ракитов Куст - русское предпринимательство и благотворительность"},
    },
    {
      path: '/statii/:id',
      props: true,

      component: () => import('./views/statiya.vue'),
    },
    {
      path: '/sobitiya',
      name: 'sobitiya',
      props: true,
      meta:{title:"Расписание событий русской культуры, истории и политики | Ракитов Куст"},
      component: () => import('./views/sobitiya.vue'),
    },
    {
      path: '/sobitiya/:id',
      props: true,
      meta:{title:"Расписание событий русской культуры, истории и политики | Ракитов Куст"},
      component: () => import('./views/sobitiya.vue'),
    },
    {
      path: '/predpriyatiya',
      name: 'predpriyatiya',
      props: true,
      meta:{title:"Русские национальные предприятия | Ракитов Куст"},
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
      meta:{title:"Сборы средств для начинаний | Ракитов Куст"},
      component: () => import('./views/sbori.vue'),
    },
    {
      path: '/gnezdo',
      name: 'gnezdo',
      props: true,
      meta:{title:"Гнездо | Ракитов Куст"},
      component: () => import('./views/gnezdo.vue'),
    },
    {
      path: '/podpisi',
      name: 'podpisi',
      props: true,
      meta:{title:"Подписные кампании | Ракитов Куст"},
      component: () => import('./views/podpisi.vue'),
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
      meta:{title:"Присоединиться | Ракитов Куст"},
      component: () => import('./views/prisoedinitsya.vue'),
    },
    {
      path: '/praviykurs',
      name: 'praviykurs',
      props: true,
      meta:{title:"Правый курс | Ракитов Куст"},
      component: () => import('./views/praviykurs.vue'),
    },
  ],
});
