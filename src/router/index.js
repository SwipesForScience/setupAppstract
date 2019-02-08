import Vue from 'vue';
import Router from 'vue-router';
import MainWizard from '@/components/MainWizard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainWizard',
      component: MainWizard,
    },
  ],
});
