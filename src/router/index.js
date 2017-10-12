import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Toplist from '@/components/toplist/toplist';
import TopDetail from '@/components/top-detail/top-detail';
import Singer from '@/components/singer/singer';
import Search from '@/components/search/search';
import SingerDetail from '@/components/singer-detail/singer-detail';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/toplist',
      name: 'toplist',
      component: Toplist,
    },
    {
      path: '/toplist/:id',
      component: TopDetail,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
    },
    {
      path: '/singer/:id',
      component: SingerDetail,
    },
  ],
});
