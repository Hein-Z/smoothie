import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothies from '@/components/AddSmoothies'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothies',
      name: 'AddSmoothies',
      component: AddSmoothies
    },
    {
      path: '/edit/:slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
