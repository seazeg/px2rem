import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   component: require('@/components/Main').default
    // },
    {
      path: '/',
      name: 'px2rem',
      component: require('@/view/view').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
