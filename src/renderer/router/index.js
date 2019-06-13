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
      name: 'main',
      component: require('@/view/view').default,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/egg',
      name:'egg',
      component:require('@/view/egg').default,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
